
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
import {IO} from "./driver_io"
var io=new IO(undefined,'driver_id');
var val=new Valid();

export class Driver extends Query{
    constructor(BindView=[],creation=false){
      super("id");//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="names,sex,created_at";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null, names text,sex text,created_at text";
      this.colSearch="names,id";
      this.colAlias={id:'Code',names:'Names'};
      this.modelName="driver";
      this.conf();



    }

    conf(){
      //Higuration for SQL request

     super.tab("driver",this.colCreation).newTable(()=>{
                       super.fields(this.colQuery)
                   },()=>{super.fields(this.colQuery)});

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
         val.add(["required"],model.state.name,"nameValid");
         val.add(["required"],model.state.sex,"sexValid");


         if (val.validate(this.model)) {
             var driver=model.state;
             var date=new Date();

             var data=[driver.name,driver.sex,H.now(true)];

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
       return super.keyValue(id).getByKey((driver)=>{

            if (this.content!=undefined) {
              this.model.setState({[this.content]:driver});
            }

            if (onSucc) {

                onSucc.call(this,driver);
            }

       },()=>{
         if (this.content!=undefined) {
           this.model.setState({[this.content]:null})
         }

         if (onErr) {
             onErr.call(this,"driver not found");
         }
          H.Toast("no driver is registered",'danger');
       });
    }

    edit(id,onSucc,onErr){
                var model=this.model;
                 val.reset();

                 val.add(["required"],model.state.name,"nameValid");
                 val.add(["required"],model.state.sex,"sexValid");



                 if (val.validate(this.model)) {
                     var driver=model.state;
                     var date=new Date();

                     var data=[driver.name,driver.sex,driver.driver.created_at];

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

    destroyEl(id,onSucc,onErr){

        super.keyValue(id).destroy(()=>{
             io.destroyEl(id,undefined,undefined,true);
             if (onSucc) {
                onSucc.call(this);
             }
        },()=>{
          if (onErr) {
             onErr.call(this);
          }
        });
    }
}
