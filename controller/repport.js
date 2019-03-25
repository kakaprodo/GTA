
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"

import {Mission} from "./mission"
import {IO} from "./driver_io"
import {Entretien} from "./entretien"
import {Mashindano} from "./machindano"
import {Perdieme} from "./perdieme"
import {FournMvm} from "./fss_mvm"

var val=new Valid();
var ConcernedTable=[{model:new Mission(),field:"montant_maison",totalField:"total_maison"},
                    {model:new IO(),field:"chauffeur",totalField:"montant",fieldCheck:{is_input:0}},
                    {model:new Entretien(),field:"entretien",totalField:"montant"},
                    {model:new Mashindano(),field:"mashindano",totalField:"montant"},
                    {model:new Perdieme(),field:"perdieme",totalField:"montant"},
                    {model:new FournMvm(),field:"fournisseur",totalField:"montant",fieldCheck:{is_paid:1}}];
var RepportToSave=[];//[{field:value}]

export class Repport extends Query{
    constructor(BindView=[],keyName='id'){
      super(keyName);//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="montant_maison,chauffeur,entretien,mashindano,perdieme,"+
                    "fournisseur,resultat_brut,dime,resultat_net,mois_annee";

      this.colSearch="mois_annee";
      this.colAlias={mois_annee:'Mois et Année'};
      this.modelName="repport";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null,montant_maison text,"+
                        "chauffeur text,entretien text,mashindano text,perdieme text,"+
                        "fournisseur text,resultat_brut text,dime text,resultat_net text,mois_annee text";

      this.conf();




    }

    conf(){
      //Higuration for SQL request

     super.tab("repport",this.colCreation).newTable(()=>{
                       super.fields(this.colQuery)
                   },()=>{super.fields(this.colQuery)});

    }




    repportHandler(operation="save",resp,currentRepport){//operation=save or update,currentRepportId=id of the saved repport
       var md=this;


       if (operation=="save") {
           RepportToSave={montant_maison:0,
                          chauffeur:0,
                          entretien:0,
                          mashindano:0,
                          perdieme:0,
                         fournisseur:0,
                         resultat_brut:0,
                         dime:0,
                         resultat_net:0,
                         mois_annee:H.now(...[,'my'])};
                //we check if the mois_annee doesn't exist then we save()
                var dataToCheck={mois_annee:H.now(...[,'my'])};

              super.exist(...[dataToCheck,()=>{resp.call(md)},()=>{
                   super.save(RepportToSave,()=>{
                       if (resp) {
                           resp.call(md,RepportToSave);
                       }
                   },()=>{
                       console.log("Refuse to save new repport ,repport.js:75 ");
                       H.Toast("Refuse to save new repport ,repport.js:76 ",'danger','20');
                   })
              }])

       }
       else if (operation=="update"){//update existing one
         var id=currentRepport.id;

         //we check if the repport is for this month in order to update it other wise,it will not be updateDirec
          if (currentRepport.mois_annee!=H.now(...[,'my'])) {//it will not be updated
              resp.call(this,currentRepport);
              //H.Toast("Month expired");
              return;
          }



          var counter=0;
          RepportToSave=[];
          var nbRow=ConcernedTable.length;

            var repportPreparation=function(){
               var promise=new Promise((resolve,reject)=>{
                      var table=ConcernedTable[counter];
                         table.model.constructor({model:this.model},"id");
                         table.model.index((data)=>{
                                var forTargetMonth=H.forTargetMonth(data,currentRepport.mois_annee)

                                var total=H.getTotal(forTargetMonth,table.totalField,table.fieldCheck)
                                RepportToSave[table.field]=total;
                                resolve(counter);
                         },()=>{
                            RepportToSave[table.field]=0;
                            resolve(counter);
                         });
                    });
                    promise.then((nbCounter)=>{

                         if (nbCounter+1==nbRow) {

                            //cal repport the adding remaining cols then updateDirec

                            var allData=RepportToSave;
                            var expenses=allData.chauffeur+allData.entretien+
                                          allData.mashindano+allData.perdieme+
                                          allData.fournisseur;

                            var result_brut=allData.montant_maison-expenses;

                            var dime=result_brut/10;

                            var result_net=result_brut-dime;
                            allData.resultat_brut=result_brut;
                            allData.dime=H.round(dime,3);

                            allData.resultat_net=H.round(result_net,3);

                            md.edit(allData,resp,id);


                         }
                         else{
                            counter++;
                            repportPreparation();
                         }
                    });
            }
                repportPreparation();
       }

    }

    edit(data,resp,id){


      super.updateFast(id,data,(newData)=>{

         resp.call(this,newData)
      },()=>{
          console.log("Refuse to update repport ,repport.js:edit() ");
          H.Toast("Refuse to update repport ,repport.js:edit() ",'danger','20');
      })
    }



    index(onSucc,onNodata,isDesc=false){
           super.all((ios)=>{
               ios=isDesc?H.descOrder(ios):ios;

               if (this.content!=undefined) {
                  this.model.setState({[this.content]:ios});
               }
               if (onSucc) {
                  onSucc.call(this,ios)
               }

             },(ios)=>{
               if (onNodata) {
                  onNodata.call(this,[])
               }

               if (this.content!=undefined) {
                  this.model.setState({[this.content]:ios});
               }this.model.setState({[this.content]:ios});
           });
         }


        show(id,onSucc,onErr){
           return super.keyValue(id).getByKey((fournisseur)=>{

                if (this.content!=undefined) {
                  this.model.setState({[this.content]:fournisseur});
                }

                if (onSucc) {
                    onSucc.call(this,fournisseur);
                }

           },()=>{
             if (this.content!=undefined) {
               this.model.setState({[this.content]:null})
             }

             if (onErr) {
                 onErr.call(this,"fournisseur not found");
             }
              H.Toast("no fournisseur is registered",'danger');
           });
        }




    destroyAll(){
      return super.clearTable();
    }

    destroyEl(id,onSucc,onErr,noAlert=false){

        super.keyValue(id).destroy(()=>{
              mvm.destroyEl(...[id,,,true]);
             if (onSucc) {
                onSucc.call(this);
             }
        },()=>{
          if (onErr) {
             onErr.call(this);
          }
        },noAlert);
    }
}
