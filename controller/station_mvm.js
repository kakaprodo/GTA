
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
var val=new Valid();

export class StationMvm extends Query{
    constructor(BindView=[],keyName='id'){
      super(keyName);//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="beneficaire,quantite,is_paid,station_id,car_id,created_at";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null,beneficaire text,quantite text,is_paid integer,station_id text,car_id text,created_at text";

      this.conf();



    }

    conf(){
      //Higuration for SQL request

     super.tab("station_mvm",this.colCreation).newTable(()=>{
                       super.fields(this.colQuery)
                   },()=>{super.fields(this.colQuery)});

    }

    station_mvm(id,index=undefined,onSucc,onErr){
       super.keyValue(id).belongsTo("station","station_id",(allMvm)=>{

           if (index!=undefined) {
             (this.model[this.content][index]).push({[arguments.callee.name]:allMvm})
             this.model.setState({[this.content]:this.model[this.content]})
           }
           else{
             this.model.setState({[this.content]:allMvm})
           }



           if (onSucc) {
              onSucc.call(this,allMvm);
           }
       },()=>{

           if (this.content) {
              this.model.setState({[this.content]:[]})
           }


           if (onErr) {
              onErr.call(this);
           }
       });
    }



    remboursement(id,data=[],onSucc,onErr){
        var fieldDt=H.fieldsAndData(data);
      //  console.log(fieldDt);
        super.keyValue(id).fields(fieldDt.fields).update(fieldDt.data,()=>{
           this.conf();
          if (onSucc) {
             onSucc.call(this)
          }
        },()=>{
           this.conf();
          if (onErr) {
             onErr.call(this)
          }
        });
    }


 index(onSucc,onNodata,isDesc=false){
          super.all((ios)=>{
              ios=isDesc?H.descOrder(ios):ios;

              if (onSucc) {
                 onSucc.call(this,ios)
              }

              this.model.setState({[this.content]:ios});
            },(ios)=>{
              if (onNodata) {
                 onNodata.call(this,[])
              }
               this.model.setState({[this.content]:ios});
          });
        }

  create(onSucc,onErr){

            var model=this.model;
             val.reset().setModel(model)
             .addRule(...[,'beneficaire'])
             .addRule(...[,'quantite'])
             .addRule(...[,'is_paid'])
             .addRule(...[,'station_id'])
             .addRule(...[,'car_id']);




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

        edit(id,onSucc,onErr){
                    var model=this.model;
                    val.reset().setModel(model)
                    .addRule(...[,'beneficaire'])
                    .addRule(...[,'quantite'])
                    .addRule(...[,'is_paid'])
                    .addRule(...[,'station_id'])
                    .addRule(...[,'car_id']);


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
