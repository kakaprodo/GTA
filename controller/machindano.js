
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
var val=new Valid();

export class Mashindano extends Query{
    constructor(BindView=[],keyName='id'){
      super(keyName);//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="beneficiaire,organisation,montant,created_at";
      this.colSearch="beneficiaire,organisation,montant";
      this.colAlias={beneficiaire:"Beneficiaire",organisation:"Org",montant:"Montant"};
      this.modelName="mashindano";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null,beneficiaire text,organisation text,"+
                       "montant text,created_at text";

      this.conf();



    }

    conf(){
      //Higuration for SQL request

     super.tab("machindano",this.colCreation).newTable(()=>{
                       super.fields(this.colQuery)
                   },()=>{super.fields(this.colQuery)});

    }

   index(onSucc,onNodata,isDesc=false){
      super.all((ios)=>{
          ios=isDesc?H.descOrder(ios):ios;

          if (onSucc) {
             onSucc.call(this,ios)
          }

          if (this.content!=undefined) {
             this.model.setState({[this.content]:ios});
          }
        },(ios)=>{
          if (onNodata) {
             onNodata.call(this,[])
          }
          if (this.content!=undefined) {
             this.model.setState({[this.content]:ios});
          }
      });
    }


  create(onSucc,onErr){

            var model=this.model;
            val.reset().setModel(model)
            .addRule(...[,'beneficiaire'])
            .addRule(...[,'organisation'])
            .addRule(...[,'montant']);


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
               console.log(val.result);
               if (onErr) {
                   onErr.call(this,"Input error");
               }

             }

        }

        show(id,onSucc,onErr){
           return super.keyValue(id).getByKey((station)=>{

                if (this.content!=undefined) {
                  this.model.setState({[this.content]:station});
                }

                if (onSucc) {
                    onSucc.call(this,station);
                }

           },()=>{
             if (this.content!=undefined) {
               this.model.setState({[this.content]:null})
             }

             if (onErr) {
                 onErr.call(this,"station not found");
             }
              H.Toast("no station is registered",'danger');
           });
        }

        edit(id,onSucc,onErr){
                    var model=this.model;

                    val.reset().setModel(model)
                    .addRule(...[,'beneficiaire'])
                    .addRule(...[,'organisation'])
                    .addRule(...[,'montant']);


                    if (val.validate()) {
                        var station=model.state;
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
