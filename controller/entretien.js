
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
var val=new Valid();

export class Entretien extends Query{
    constructor(BindView=[],keyName='id'){
      super(keyName);//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="motif,montant,car_id,type,created_at";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null,motif text,montant text,car_id text,type text,created_at text";

      this.conf();



    }

    conf(){
      //Higuration for SQL request

     super.tab("entretien",this.colCreation).newTable(()=>{
                       super.fields(this.colQuery)
                   },()=>{super.fields(this.colQuery)});

    }

    car(id,onSucc,onErr){
       super.keyValue(id).belongsTo("car","car_id",(all_driverOperation)=>{

           this.model.setState({[this.content]:all_driverOperation})
           if (onSucc) {
              onSucc.call(this,all_driverOperation);
           }
       },()=>{

           this.model.setState({[this.content]:[]})
           if (onErr) {
              onErr.call(this);
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
             .addRule(["required"],'motif')
             .addRule(["number"],'montant')
             .addRule(["required"],'car_id')
             .addRule(["required"],'type');




             if (val.validate()) {
                 var entretien=model.state;
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
           return super.keyValue(id).getByKey((entretien)=>{

                if (this.content!=undefined) {
                  this.model.setState({[this.content]:entretien});
                }

                if (onSucc) {
                    onSucc.call(this,entretien);
                }

           },()=>{
             if (this.content!=undefined) {
               this.model.setState({[this.content]:null})
             }

             if (onErr) {
                 onErr.call(this,"entretien not found");
             }
              H.Toast("no entretien is registered",'danger');
           });
        }

        edit(id,onSucc,onErr){
                    var model=this.model;
                    val.reset().setModel(model)
                    .addRule(["required"],'motif')
                    .addRule(["number"],'montant')
                    .addRule(["required"],'car_id')
                    .addRule(["required"],'type');




                    if (val.validate()) {
                        var entretien=model.state;
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
