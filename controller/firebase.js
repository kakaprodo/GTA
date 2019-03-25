import Fbase from './FbaseConn'

import {Query} from "./query"

export class Fb extends Query{
    constructor(){
      super()
      this.dbFb=Fbase.database();
      this.table=null;
    }

    newTable(tableName){
        this.table=this.dbFb.child(tableName);
        return this;
    }

    sendToFirebase(tableName,data,onSucc){
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
                       console.log((nbItration+1)+'=='+allTable_size);
                        if ((nbItration+1)==allTable_size) {

                             if (onDone) {
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
        // var table=this.dbFb.ref('/'+tableName);
        //       table.push({name:"deborah"});
        //       table.on('value',values=>{
        //             values=values.val();
        //             for (var key in values) {
        //                console.log(values[key]);
        //
        //             }
        //
        //       })
        //console.log(this.dbFb);
      return this;
    }
}
