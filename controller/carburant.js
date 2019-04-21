
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
var val=new Valid();

export class Carburant extends Query{
    constructor(BindView=[],keyName='id'){
      super(keyName);//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="quantite,kmp,mission_id,descr1,descr2,created_at";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null, quantite text,kmp text,mission_id text,descr1 text,descr2 text,created_at text";

      this.conf();



    }

    conf(){
      //Higuration for SQL request

     super.tab("carburant",this.colCreation)
               .newTable(()=>{
                       super.fields(this.colQuery)
                   },()=>{super.fields(this.colQuery)});

    }

    mission(id,onSucc,onErr){
       super.keyValue(id).belongsTo("mission","mission_id",(all_driverOperation)=>{

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






    index(onSucc,onNodata){
      super.all((ios)=>{
       
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
             val.reset();
             val.add(["required"],model.state.quantite,"qValid");
             val.add(["number"],model.state.kmp,"kmpValid");
             val.add(["required"],model.state.mission_id,"mValid");



             if (val.validate(this.model)) {
                 var mission=model.state;
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
           return super.keyValue(id).getByKey((mission)=>{

                if (this.content!=undefined) {
                  this.model.setState({[this.content]:mission});
                }

                if (onSucc) {
                    onSucc.call(this,mission);
                }

           },()=>{
             if (this.content!=undefined) {
               this.model.setState({[this.content]:null})
             }

             if (onErr) {
                 onErr.call(this,"mission not found");
             }
              H.Toast("no mission is registered",'danger');
           });
        }

        edit(id,onSucc,onErr){
                    var model=this.model;
                    val.reset();
                    val.add(["required"],model.state.quantite,"qValid");
                    val.add(["number"],model.state.kmp,"kmpValid");
                    val.add(["required"],model.state.mission_id,"mValid");


                    if (val.validate(this.model)) {
                        var mission=model.state;
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
