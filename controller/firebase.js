import Fbase from './FbaseConn'
import {allController} from './allController'

import {Query} from "./query"

export class Fb extends Query{
    constructor(model){
      super()
      this.dbFb=Fbase.database();
      this.table=null;
      this.model=model;
      this.inActionProcess=false;

    }

    userIsConnected(onYes,onNo){
      var connectedRef = this.dbFb.ref(".info/connected");
          connectedRef.on("value", (snap)=>{
                      if (snap.val() === true) {
                          onYes.call(this)
                      } else {
                        onNo.call(this)
                      }
          });
    }


    closeConnection(){
       //this.dbFb.goOffline();
    }

    openConnection(){
        this.dbFb.goOnline();
    }

    sendToFirebase(tableName,data,onSucc){


          //we check if data exist
          if (data.length>0) {
              if (onSucc) {
               onSucc.call(this)
             }
            return;
          }
         var table=this.dbFb.ref('/'+tableName);
         table.set(data);
         if (onSucc) {
           onSucc.call(this)
         }




    }

    dataToSend(tabName,onSucc){
      super.dataOfTable(tabName,(dataOfTable)=>{

             this.sendToFirebase(tabName,dataOfTable,()=>{
                 onSucc.call(this)
             });
      })
    }

    sendToCloud(onDone){
       var md=this;
       //we open firebase connection

       if (this.inActionProcess) {
         return;
       }
       this.inActionProcess=true;
        this.userIsConnected(()=>{
           H.Toast(...['Go...',,1000]);
           super.allTable((allTable)=>{
                var counter=0;
                var allTable_size=allTable.length;

                   var prepareToSend=function(){
                       var promise=new Promise((resolve,reject)=>{
                               var tabName=allTable[counter].name;
                               md.dataToSend(tabName,()=>{
                                 //once data has been send we increment the process
                                  resolve(counter);
                               });


                       });
                       promise.then((nbItration)=>{
                            var progress_parsent=(nbItration+1)*(100/allTable_size);
                            md.model.setState({progress_parsent:H.round(progress_parsent,2)});
                            if ((nbItration+1)==allTable_size) {

                                 if (onDone) {

                                    md.inActionProcess=false;
                                    onDone.call(md)
                                 }
                            }
                            else{

                               counter++;
                               prepareToSend();
                            }
                       })
                   }

                   prepareToSend();

           });

        },()=>{
            H.Toast('Check your conection','danger',5000);
        })

      return this;
    }

    saveFromCloud(tableName,dataOfTable,onDone){
       var md=this;

       //we delete data of the table in order To insert new data
       super.tab(tableName).clearTable(()=>{
           //we insert all data,the process can take a time
           super.save(dataOfTable,()=>{//if done
               if (onDone) {
                  onDone.call(md);
               }
           });
       })
    }

  retrieveFromCloud(onDone){
       var md=this;
         //we open firebase connection

         if (this.inActionProcess) {
           return;
         }
         this.inActionProcess=true;
         this.userIsConnected(()=>{

              H.Toast(...['Go...',,1000]);
              this.dbFb.ref().once('value', function(snapshot) {
                  if (snapshot.val() !== null) {
                      var allDataInCloud=snapshot.val();
                      var tableNames = Object.keys(allDataInCloud);

                      var counter=0;
                      var data_size=tableNames.length;


                     var prepareToRetrieve=function(){
                          var promise=new Promise((resolve,reject)=>{
                               var tableName=tableNames[counter];
                               var dataOfTable=allDataInCloud[tableName];
                              md.saveFromCloud(tableName,dataOfTable,()=>{
                                   //when data of the table has been insert in local database we take another table
                                   resolve(counter)
                              });


                             });
                             promise.then((nbItration)=>{
                                  var progress_parsent=(nbItration+1)*(100/data_size);
                                  md.model.setState({progress_parsent:H.round(progress_parsent,2)});
                                  if ((nbItration+1)==data_size) {

                                       if (onDone) {
                                          md.inActionProcess=false;

                                          onDone.call(md)
                                       }
                                  }
                                  else{

                                     counter++;
                                     prepareToRetrieve();
                                  }
                             })
                     }

                     prepareToRetrieve();

                  }
                });
        },()=>{
            H.Toast('Check your connection','danger',5000)
        })
    }
}
