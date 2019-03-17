
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
var val=new Valid();

export class Perdieme extends Query{
    constructor(BindView=[],keyName='id'){
      super(keyName);//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="montant,mission_id,created_at";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null, montant text,mission_id text,created_at text";

      this.conf();



    }

    conf(){
      //Higuration for SQL request

     super.tab("perdieme",this.colCreation).newTable(()=>{
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
      super.all((Perdiemes)=>{
            if (onSucc) {
               onSucc.call(this,Perdiemes)
            }
            if (this.content!=undefined) {
               this.model.setState({[this.content]:Perdiemes});
            }
        },(Perdiemes)=>{
          if (onNodata) {
             onNodata.call(this,[])
          }
          if (this.content!=undefined) {
             this.model.setState({[this.content]:Perdiemes});
          }
      });
    }


    create(onSucc,onErr){

        var model=this.model;
         val.reset();
         val.add(["number"],model.state.montant,"mValid");
         val.add(["required"],model.state.mission_id,"miValid");


         if (val.validate(this.model)) {
             //var Perdieme=model.state;
             //var date=new Date();

             var data=super.getData(this.model);

               //we insert new info of the agent
               super.insert(data,()=>{
                   if (onSucc) {
                     onSucc.call(this,data);
                   }
               });
         }
         else{
           if (onErr) {
               onErr.call(this,"Input error");
           }

         }

    }

    show(id,onSucc,onErr){
       return super.keyValue(id).getByKey((Perdieme)=>{

            if (this.content!=undefined) {
              this.model.setState({[this.content]:Perdieme});
            }

            if (onSucc) {

                onSucc.call(this,Perdieme);
            }

       },()=>{
         if (this.content!=undefined) {
           this.model.setState({[this.content]:null})
         }

         if (onErr) {
             onErr.call(this,"Perdieme not found");
         }
          H.Toast("no Perdieme is registered",'danger');
       });
    }

    edit(id,onSucc,onErr){
                var model=this.model;
                 val.reset();

                 val.add(["number"],model.state.montant,"montantValid");
                 val.add(["required"],model.state.mission_id,"mValid");

                 if (val.validate(this.model)) {
                     //var Perdieme=model.state;
                     var data=super.getData(this.model);

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
