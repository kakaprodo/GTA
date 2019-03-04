
/*Controller for client*/
import {Query} from "./query"
import {DeviceOwner as Owner} from "./device_own"

export class Client extends Query{
    constructor(BindView=[]){
      super("key");//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.client=null;
      this.colQuery="names,email,picture,key";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null, names text, email text,picture text,key text";
      this.conf();

    }
    conf(){
      //configuration for SQL request
     super.tab("clients",this.colCreation).newTable().fields(this.colQuery);

    }
    index(){
        return super.all((data)=>{
            //alert(data[0].email)
            console.log(data);
        });
    }
    create(client,toCall){
        var data=[client.names,client.email,client.picture,client.key];
         //we check if another client with key already exists
         super.keyValue(client.key).getByKey((client)=>{
             H.Toast("The client "+client.names+" have been scanned already");
             if (toCall) {
               toCall.call(this,{error:true,msg:"The client "+client.names+" have been scanned already"});
             }
         },()=>{
             super.insert(data,()=>{
                 if (toCall) {
                   toCall.call(this,{error:false});
                 }
             });
         });

    }

    scanClient(qrValue,success,err){
      var model=this.model;
      const key=H.strReplace(qrValue,"/","prodo");
    // console.log(H.DNS+"/getClientKey/"+key+"/?token="+H.Agent.token);

      axios.get(H.DNS+"/getClientKey/"+key+"/?token="+H.Agent.token).
           then((resp)=>{
               let result=resp.data;

               if (result.success) {
                  model.setState({clientReady:true,client:result.client});
                  //we insert the client in local DB
                  this.create(result.client,(resp)=>{
                     if (!resp.error) {//if client is not in local Db
                       //then we set the owner of the device as client
                       var owner=new Owner();
                       owner.create("client");
                       success.call(this,result.client);
                     }
                     else{//if client is in local Db
                       model.setState({clientExist:true});
                     }

                  });

               }
               else{
                 err.call(this,result.msg);
               }

           }).catch((error)=>{

              err.call(this,error.message);
           });
    }


    sendAlert(alertType,success,err){
      var model=this.model;
      var formData = new FormData();
      const key=H.strReplace(model.state.client.key,"/","prodo");
      formData.append("type", alertType);
      formData.append("client_key", key);


      axios.post(H.DNS+"/client_alert",formData).
            then((resp)=>{
                var result=resp.data;
                if (result.success) {
                   success.call(this,result);
                }
                else{
                   err.call(this,result.msg);
                }
            }).catch((error) => {
                err.call(this,error.message);
            });
    }

    show(success,error){
       return super.getModel((client)=>{
                     if (success) {
                        success.call(this,client);
                     }

                    H.Client=client;
                    this.model.setState({[this.content]:client});
                },()=>{
                   if (error) {
                     success.call(this);
                   }

                this.model.setState({[this.content]:null})
       });
    }

    destroy(){
        return super.clearTable();
    }
}
