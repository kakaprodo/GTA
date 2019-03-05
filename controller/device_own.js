/*This class will be checking the owner of the device if is an agent or client*/

import {Query} from "./query"


export class DeviceOwner extends Query{
    constructor(BindView=[],creation=false){
      super("id");//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="type";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null, type text";

      this.conf();



    }

    conf(){
      //Higuration for SQL request
     super.tab("device_owner",this.colCreation).newTable().fields(this.colQuery);

    }

    create(type,toCall){
        var data=[type];

        //we delete the previous data
        this.destroy();
         //we insert new info of the agent
         super.insert(data,()=>{
             if (toCall) {
               toCall.call(this,data);
             }
         });

    }

    ownerIs(isExist,noExist){
       super.getModel((owner)=>{
                     if (isExist) {
                        isExist.call(this,owner);
                     }

                    if (this.model!=undefined) {
                      this.model.setState({[this.content]:owner})
                    }
                },()=>{
                   if (noExist) {
                     noExist.call(this);
                   }

              if (this.model!=undefined) {
                this.model.setState({[this.content]:null})
              }

       });
    }

    destroy(){
        return super.clearTable();
    }


  }
