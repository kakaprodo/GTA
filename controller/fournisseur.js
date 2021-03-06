
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
import {FournMvm} from "./fss_mvm"//fournisseur
var mvm;
var val=new Valid();

export class Fournisseur extends Query{
    constructor(BindView=[],keyName='id'){
      super(keyName);//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="maison,created_at";
      this.colSearch="maison";
      this.colAlias={maison:'Firm name'};
      this.modelName="fournisseur";
      this.contentImg="maison";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null,motif text,maison text,created_at text";
     mvm=new FournMvm(BindView,"fss_id");
      this.conf();



    }

    conf(){
      //Higuration for SQL request

     super.tab("fournisseur",this.colCreation).newTable(()=>{
                       super.fields(this.colQuery)
                   },()=>{super.fields(this.colQuery)});

    }



    index(onSucc,onNodata,isDesc=false){
           super.all((ios)=>{
               ios=isDesc?H.descOrder(ios):ios;

                mvm.with(ios,(finalDataJoined)=>{
                  //console.log(finalDataJoined);

                  if (this.content!=undefined) {
                     this.model.setState({[this.content]:finalDataJoined});
                  }
                  if (onSucc) {
                     onSucc.call(this,finalDataJoined)
                  }
                });


             },(ios)=>{
               if (onNodata) {
                  onNodata.call(this,[])
               }
               if (this.content!=undefined) {
                  this.model.setState({[this.content]:ios});
               }
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

        create(onSucc,onErr){

                  var model=this.model;
                  val.reset().setModel(model)
                  .addRule(...[,'maison']);



                   if (val.validate()) {

                       var data=super.getData(this.model);

                         //we insert new info of the agent
                         super.insert(data,()=>{
                             if (onSucc) {
                               onSucc.call(this,data);
                             }
                         },()=>{
                           if (onErr) {
                               onErr.call(this,"Input error");
                           }
                         });
                   }
                   else{
                     //console.log(val.result);
                     if (onErr) {
                         onErr.call(this,"Input error");
                     }

                   }

              }


        edit(id,onSucc,onErr){
                    var model=this.model;
                    val.reset().setModel(model)
                    .addRule(["required"],'maison');


                    if (val.validate()) {
                        var fournisseur=model.state;
                        var data=super.getData(this.model,false);

                           //we insert new info of the agent
                           super.keyValue(id).update(data,()=>{
                               if (onSucc) {
                                 onSucc.call(this,data);
                               }
                           },()=>{
                             if (onErr) {
                                 onErr.call(this);
                             }
                           });

                     }
                     else{
                       if (onErr) {
                           onErr.call(this,"Input error");
                       }

                  }
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
