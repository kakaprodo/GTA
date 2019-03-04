
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
var val=new Valid();

export class Agent extends Query{
    constructor(BindView=[],creation=false){
      super("id");//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="names,email,picture,token";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null, names text, email text,picture text,token text";

      this.conf();



    }

    conf(){
      //Higuration for SQL request
     super.tab("agents",this.colCreation).newTable().fields(this.colQuery);

    }

    login(success,err){
         var model=this.model;
          val.reset();
          val.add(["email","required"],model.state.email,"emailValid");
          val.add(["required"],model.state.password,"passValid");

          if (val.validate(this.model)) {

            var formData = new FormData();
            formData.append("email", model.state.email);
            formData.append("password", model.state.password);
            axios
              .post(H.DNS+"/user/login/", formData)
              .then(response => {
                var result=response.data;
                if (result.success) {
                  //H.Toast("Login Successful!","success");

                  let userData = result.data;
                  userData.time=new Date().getTime();



                    //we store user in global variables
                    if (userData.roles.length>0) {
                      if (!userData.stopped) {


                         this.create(userData,(agent)=>{
                             //after creating we take the returned agent
                             H.isLoggedIn=true;
                             H.Agent=agent;
                         });
                         success.call(this,userData);
                      }
                      else{
                        if (err) {
                            err.call(this,"You are in the system but you are stopped to execute your function.See the Top manager for this issue");
                        }

                      }

                    }
                    else{
                      if (err) {
                          err.call(this,"You are in the system but you don't have any permission to access in the system.See the Top manager for this issue");
                      }

                    }

                  } else {
                    var msg=result.msg;
                    if (msg.email!==undefined) {
                      model.setState({emailValid:msg.email});
                    }
                    else{

                      model.setState({passValid:msg.password});
                    }


                    if (err) {
                        err.call(this,"Login Failed!");
                    }

                  }
                }).catch((error) => {
                  if (err) {
                      err.call(this,error.message);
                  }
                })
          }
          else{
            if (err) {
                err.call(this,"Input error");
            }

          }
    }


    create(agent,toCall){
        var data=[agent.name+" "+agent.lastname,agent.email,agent.picture,agent.auth_token];

        //we delete the previous data
        this.destroy();
         //we insert new info of the agent
         super.insert(data,()=>{
             if (toCall) {
               toCall.call(this,data);
             }
         });

    }

    show(){
       return super.getModel((agent)=>{
            H.Agent=agent;
            H.isLoggedIn=true;
            this.model.setState({[this.content]:agent});
       },()=>{
          this.model.setState({[this.content]:null})
       });
    }

    destroy(){
        return super.clearTable();
    }
}
