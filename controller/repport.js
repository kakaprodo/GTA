
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"

import {Mission} from "./mission"
import {IO} from "./driver_io"
import {Entretien} from "./entretien"
import {Mashindano} from "./machindano"
import {Perdiememe} from "./perdieme"
import {FournMvm} from "./fss_mvm"

var val=new Valid();
var ConcernedTable=[{model:"Mission",field:"montant_maison",totalField:"montant_maison"},
                    {model:"IO",field:"chauffeur",totalField:"montant",fieldCheck:{is_input:0}},
                    {model:"Entretien",field:"entretien",totalField:"montant"},
                    {model:"Mashindano",field:"mashindano",totalField:"montant"},
                    {model:"Perdieme",field:"perdieme",totalField:"montant"},
                    {model:"FournMvm",field:"fournisseur",totalField:"montant",fieldCheck:{is_paid:1}}];
var RepportToSave=[];//[{field:value}]

export class Repport extends Query{
    constructor(BindView=[],keyName='id'){
      super(keyName);//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="montant_maison,chauffeur,entretien,mashindano,perdiememe,"+
                    "fournisseur,rb,dime,rn,mois_annee";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null,montant_maison text,"+
                        "chauffeur text,entretien text,mashindano text,perdiememe text,"+
                        "fournisseur text,rb text,dime text,rn text ,mois_annee text";

      this.conf();




    }

    conf(){
      //Higuration for SQL request

     super.tab("repport",this.colCreation).newTable(()=>{
                       super.fields(this.colQuery)
                   },()=>{super.fields(this.colQuery)});

    }




    repportHandler(operation="save",resp){//save or update
       var md=this;
       if (operation=="save") {
           RepportToSave={montant_maison:0,
                          chauffeur:0,
                          entretien:0,
                          mashindano:0,
                          perdiememe:0,
                         fournisseur:0,
                         rb:0,
                         dime:0,
                         rn:0,
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
       else{//update existing one
          var counter=0;
          var nbRow=ConcernedTable.length;

            var repportPreparation=function(){
               var promise=new Promise((resolve,reject)=>{
                      var table=ConcernedTable[counter];
                      var model=new [table.model]();
                         model.index((data)=>{
                                var forThisMonth=H.getForThisMonth(data);
                                var total=H.getTotal(forThisMonth,table.totalField,table.fieldCheck)
                                RepportToSave[table.field]=tatal;
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
                                          allData.mashindano+allData.perdiememe+
                                          allData.fournisseur;
                            var result_brut=allData.montant_maison-expenses;
                            var dime=result_brut/10;
                            var result_net=result_brut-dime;
                            allData.rb=result_brut;
                            allData.dime=dime;
                            allData.rn=result_net;
                            md.edit(allData,resp);


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

    edit(data,resp){
      super.updateFast(allData,()=>{
         resp.call(md,allData)
      },()=>{
          console.log("Refuse to update repport ,repport.js:118 ");
          H.Toast("Refuse to update repport ,repport.js:119 ",'danger','20');
      })
    }



    index(onSucc,onNodata,isDesc=false){
           super.all((ios)=>{
               ios=isDesc?H.descOrder(ios):ios;
               this.model.setState({[this.content]:ios});
               if (onSucc) {
                  onSucc.call(this,ios)
               }

             },(ios)=>{
               if (onNodata) {
                  onNodata.call(this,[])
               }
                this.model.setState({[this.content]:ios});
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
