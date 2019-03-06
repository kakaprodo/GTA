

/*A class to contains all function to save data sqlite db*/

import {Con} from "./dbConnection"


export class Query extends Con{

   constructor(keyName){
      super();

      this.db =super().getConnection();
      this.keyName=keyName;
      this.keyValue=null;
      this.item=null;
      this.all=[];
      this.oneResult=null;
      this.response=[];
      this.table=null;
      this.col=null;
      this.data=[];
      this.tagPrepare=null;//wil contain : ?,?,?

   }

   init(){
     this.constructor();
   }

   keyValue(value){
      this.keyValue=value;
      return this;
   }

   tab(table,fields){
      this.table=table;
      if (fields) {
        this.fields(fields);
      }

      return this;
   }

   fields(stringNames){
       this.col=stringNames;
       var ArrCol=stringNames.split(",");
       var nbRow=ArrCol.length;
       this.tagPrepare=nbRow>0?"?":null;

       for (var i = 1; i < nbRow; i++) {
           this.tagPrepare=this.tagPrepare+",?";
       }


       return this;
   }



   data(data){
      this.data=data;
      return this;
   }

   clearTable(){
       this.db.transaction(tx=>{
            tx.executeSql(`DELETE FROM ${this.table}`,[],()=>{
              this.response.msg="successfully done";
              this.response.error=false;
            },(err)=>{
              this.response.msg=err;
              this.response.error=false;
            });
       });
      return this;
   }

   newTable(){
     this.db.transaction(tx => {
          tx.executeSql(
            `create table if not exists ${this.table}` +
          `  (${this.col});`
          );
          //the value of col=id integer primary key not null, names text, email text,picture text,key text
      },function(err){
          console.log("error",err);
      },
      function(success){
        // console.log("well created table");
      }
    );

      return this;
   }

   insert(data,toCall) {
       let md=this;
       this.db.transaction(
         tx => {
           var ins=tx.executeSql(`insert into ${this.table} (${this.col}) values (${this.tagPrepare})`,
                                data,
                                ()=>{
                                  this.response.msg="successfully done";
                                  this.response.error=false;
                                  if (toCall) {
                                     toCall.call(md);
                                  }
                                },(err)=>{
                                  alert(err);
                                  this.response.msg=err;
                                  this.response.error=true;

                                }
                              );
         });
      return this;
  }

  all(onExist,onNull){

    const md=this;
    this.db.transaction((tx)=>{
         tx.executeSql(`select * from ${this.table}`, [], (_, { rows:{ _array } }) =>{
                  this.all=_array;

               if (_array.length>0) {
                 if (onExist) {
                    onExist.call(md,_array);
                 }
               }
               else{
                 if (onNull) {
                    onNull.call(md,[]);
                 }
               }


                  //console.log(rows)
                 }
              );

    });


    //return this;

  }

  getModel(dataExist,noData){
    let md=this;
    this.db.transaction(tx=>{
      tx.executeSql(`select * from ${this.table}  limit 1`, [], (_, { rows:{_array} }) =>{
        this.item=_array;
        //console.log(rows)

          if (this.item.length!=0) {
            dataExist.call(md,this.item[0]);
          }
          else{
            noData.call(md);
          }

       }
      );
    });
    return this.item;
  }


  getByKey(dataExist,noData){
    let md=this;
    this.db.transaction(tx=>{
      tx.executeSql(`select * from ${this.table} where ${this.keyName}=? limit 1`, [this.keyValue], (_, { rows:{_array} }) =>{
        this.item=_array;
        //console.log(rows)

          if (this.item.length!=0) {
            dataExist.call(md,this.item[0]);
          }
          else{
            noData.call(md);
          }

       }
      );
    });
    return this;
  }



 update(){
     db.transaction(
              tx => {
                tx.executeSql(`update ${this.table} set done = 1 where ${this.keyName}=?;`, [id]);
              },
              null,
              null
    );
 }


}
