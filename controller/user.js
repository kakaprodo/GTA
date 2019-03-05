
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
var val=new Valid();

export class User extends Query{
    constructor(BindView=[],creation=false){
      super("id");//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="names,email,password,is_default";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null, names text, email text,password text,is_default boolean";

      this.conf();



    }

    conf(){
      //Higuration for SQL request
     super.tab("user",this.colCreation).newTable().fields(this.colQuery);

    }

    login(onSucc,onErr){
         var model=this.model;
          val.reset();
          val.add(["email","required"],model.state.email,"emailValid");
          val.add(["required"],model.state.password,"passValid");

          if (val.validate(this.model)) {
             var user=model.state;

             this.show((userStored)=>{

               if (userStored.email==user.email && userStored.password==user.password) {
                 onSucc.call(this,userStored);
               }
               else{
                 if (userStored.email!=user.email) {
                   model.setState({emailValid:"wrong email address"});
                   onErr.call(this);
                 }
                 else if (userStored.password!=user.password) {
                   model.setState({emailValid:"wrong password"});
                   onErr.call(this);
                 }
               }


             });

          }
          else{
            if (onErr) {
                onErr.call(this,"Input error");
            }

          }
    }


    create(onSucc,onErr){

        var model=this.model;
         val.reset();
         val.add(["required"],model.state.name,"nameValid");
         val.add(["email","required"],model.state.email,"emailValid");
         val.add(["required"],model.state.password,"passValid");

         if (val.validate(this.model)) {
             var user=model.state;
             var data=[user.name,user.email,user.password,user.is_default];
              //we delete the previous data
              this.destroy();
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

    show(onSucc,onErr){
       return super.getModel((user)=>{
            H.User=user;
            H.isLoggedIn=true;
            if (this.content!=undefined) {
              this.model.setState({[this.content]:user});
            }

            if (onSucc) {
                onSucc.call(this,user);
            }

       },()=>{
         if (this.content!=undefined) {
           this.model.setState({[this.content]:null})
         }

         if (onErr) {
             onErr.call(this,"User not found");
         }
          H.Toast("no user is registered",'danger');
       });
    }

    destroy(){
        return super.clearTable();
    }
}
