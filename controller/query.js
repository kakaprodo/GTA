

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
      this.inAction=false;

   }

   dbase(){
     return this.db;
   }

   init(){
     this.constructor();
   }

   getData(model,isCreation=true){//data to insert according to the setting of available columns in model(table) from a state component
     var state=model.state;
     var colNames=this.col.split(",");
     var data=[];
     for (var i = 0; i < colNames.length; i++) {
         let colName=colNames[i];
       if (state[colName]!=undefined) {

             data[i]=state[colName];


       }
       if (colName=="created_at") {//we create new date if creation or we take the existing date in model table if is to update
          data[i]=isCreation?H.now(true):(state[this.table]!=undefined?state[this.table].created_at:H.now());
       }

       if (colName=="mois_annee") {
          var dateArr=H.now().split("/");
          var mois_annee=dateArr[1]+"/"+dateArr[2];
          data[i]=isCreation?mois_annee:(state[this.table]!=undefined?state[this.table].mois_annee:mois_annee);
       }

     }

     return data;
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

   dropTable(){

        this.db.transaction(tx => {
             tx.executeSql(
               `DROP TABLE ${this.table}`
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


   newTable(onSucc,onErr){
     var rm=this;
     this.db.transaction(tx => {

          tx.executeSql(
            `create table if not exists ${this.table}` +
          `  (${this.col});`
          );
          //the value of col=id integer primary key not null, names text, email text,picture text,key text
      },function(err){
          console.log("error",err);
          if (onErr) {
             onErr.call(rm)
          }
      },
      function(success){
        if (onSucc) {
           onSucc.call(rm)
        }
        // console.log("well created table");
      }
    );

      return this;
   }

   insert(data,toCall,onErr) {
       let md=this;

      if (this.inAction) {
        return console.log('wait for previous process...');;
      }
      this.inAction=true;
       this.db.transaction(
         tx => {
           //console.log(`insert into ${this.table} (${this.col}) values (${this.tagPrepare})`);
           var ins=tx.executeSql(`insert into ${this.table} (${this.col}) values (${this.tagPrepare})`,
                                data,
                                ()=>{
                                  this.response.msg="successfully done";
                                  this.response.error=false;
                                  if (toCall) {

                                     toCall.call(md);
                                     this.inAction=false;
                                  }
                                },(err)=>{
                                 this.inAction=false;
                                  if (onErr) {
                                     onErr.call(md);
                                  }
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




 update(data,onSucc,onErr){

     if (this.inAction) {
       return console.log('wait for previous process...');
     }
     this.inAction=true;

     var allCol=this.col.split(",");
     // console.log(this.col);
     var requeteCol="";
     var indexData=data.length;
     data[indexData]=this.keyValue;

     for (var i = 0; i < allCol.length; i++) {
            const remainerInLoop=allCol.length-1;
            requeteCol=requeteCol+(allCol[i]+((remainerInLoop==i)?"=?":"=?,"));
     }
     var rm=this;

     this.db.transaction(
              tx => {
                tx.executeSql(`update ${this.table} set ${requeteCol} where ${this.keyName}=?`, data);
               },
               (err)=>{
                 this.response.msg=err;
                 this.response.error=true;

                 if (onErr) {
                    onErr.call(rm);
                    this.inAction=false;
                 }
              },()=>{
                this.response.msg="successfully done";
                this.response.error=false;
                this.inAction=false;
                if (onSucc) {
                   onSucc.call(rm);
                }

              });

        return this;
 }

   destroy(onSucc,onErr,noAlert=false){
     var rm=this;

      if (noAlert) {//if we dont need user confirmation
        this.db.transaction(tx=>{
             tx.executeSql(`DELETE FROM ${this.table} where ${this.keyName}=? `, [this.keyValue],()=>{
               this.response.msg="successfully done";
               this.response.error=false;
               if (onSucc) {
                  onSucc.call(rm);
               }
             },(err)=>{

               this.response.msg=err;
               this.response.error=false;
               if (onErr) {
                  onErr.call(rm);
               }
             });
        });
        return this;
      }

      H.swal('Do you want to delete this item',()=>{
        this.db.transaction(tx=>{
             tx.executeSql(`DELETE FROM ${this.table} where ${this.keyName}=? `, [this.keyValue],()=>{
               this.response.msg="successfully done";
               this.response.error=false;
               H.Toast("successfully done");
               if (onSucc) {
                  onSucc.call(rm);
               }
             },(err)=>{

               this.response.msg=err;
               this.response.error=false;
               if (onErr) {
                  onErr.call(rm);
               }
             });
        });

      })

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

   belongsTo(table,foreinKey,onSucc,onErr){
     var md=this;
     this.db.transaction(tx=>{


       tx.executeSql(`select * from ${this.table} where ${foreinKey}=?`, [this.keyValue], (_, { rows:{_array} }) =>{
         this.item=_array;


           if (this.item.length!=0) {
             onSucc.call(md,this.item);
           }
           else{
             onErr.call(md);
           }

        }
       );
     });

     return this;
   }

   setKeyValue(value){
      this.keyValue=value;
      return this;
   }






   join(data,resp,table){
       var finalData=[];
       var dataLength=data.length;
       var counter=0;
       var md=this;
       // console.log(dataLength);

       var joinningData=function(){

         new Promise((resolve,reject)=>{
            var current =data[counter];


            md.setKeyValue(current.id).belongsTo(table,md.keyName,(allMvm)=>{

                 current.mvm=allMvm
                 finalData[counter]=current;

                 resolve(counter);



             },()=>{
               current.mvm=[];
               finalData[counter]=current;
               resolve(counter);
             });
         }).then((number)=>{//number est le compteur
             if ((number+1)==dataLength) {
                if (resp) {

                      resp.call(md,finalData);
                }
             }
             else{
               counter++;
               joinningData();
             }
         });
       }

       joinningData();


 }



 save(data,toCall,onErr,table) {
     let md=this;

    if (this.inAction) {
      return console.log('wait for previous process...');;
    }


    var getFields=H.getFields(data);
    var table=table!=undefined?table:this.table;
    this.inAction=true;
     this.db.transaction(
       tx => {
         //console.log(`insert into ${this.table} (${this.col}) values (${this.tagPrepare})`);
         var ins=tx.executeSql(`insert into ${table} (${getFields.fields}) values (${getFields.tagPrepare})`,
                              getFields.values,
                              ()=>{
                                this.response.msg="successfully done";
                                this.response.error=false;
                                if (toCall) {

                                   toCall.call(md);
                                   this.inAction=false;
                                }
                              },(err)=>{

                                if (onErr) {
                                   onErr.call(md);
                                }
                                this.response.msg=err;
                                this.response.error=true;
                                this.inAction=false;

                              }
                            );
       });
    return this;
  }


  exist(data,dataExist,noData,table){

      let md=this;
      var getFields=H.getFields(data);
      var table=table!=undefined?table:this.table;

      this.db.transaction(tx=>{
        tx.executeSql(`select * from ${table} where ${getFields.selectQuery} limit 1`,getFields.values, (_, { rows:{_array} }) =>{
          this.item=_array;
          //console.log(rows)

            if (this.item.length!=0) {
              dataExist.call(md,this.item[0]);
            }
            else{
               if (noData) {
                  noData.call(md);
               }

            }

         }
        );
      });
      return this;

  }

  updateFast(id,data,onSucc,onErr,table){

      if (this.inAction) {
        return console.log('wait for previous process...');
      }
      this.inAction=true;
      var getFields=H.getFields(data);
      var table=table!=undefined?table:this.table;

      var rm=this;
      getFields.values.push(id);//we insert the id of the concerned repport
      data.id=id;

      this.db.transaction(
               tx => {
                 tx.executeSql(`update ${table} set ${getFields.colUpdate} where ${this.keyName}=?`, getFields.values);
                },
                (err)=>{
                  this.response.msg=err;
                  this.response.error=true;

                  if (onErr) {
                     onErr.call(rm,data);
                     this.inAction=false;
                  }
               },()=>{
                 this.response.msg="successfully done";
                 this.response.error=false;
                  this.inAction=false;
                 if (onSucc) {
                    onSucc.call(rm,data);
                 }

               });

         return this;
  }

  allTable(onSucc,onErr){
    var md=this;
    this.db.transaction(tx=>{
      tx.executeSql(`SELECT name FROM sqlite_master WHERE type ='table' AND name NOT LIKE 'sqlite_%'`,[],
       (_, { rows:{_array} }) =>{
        this.item=_array;


          if (this.item.length!=0) {
            onSucc.call(md,this.item);
          }
          else{
             if (onErr) {
                onErr.call(md);
             }

          }

       },
       (err)=>{
           console.log(err.message);
           if (onErr) {
              onErr.call(md);
           }
       }
      );
    });
  }

  dataOfTable(tableName,onSucc){
    var md=this;
    this.db.transaction(tx=>{
      tx.executeSql(`SELECT * FROM ${tableName} `,[],
       (_, { rows:{_array} }) =>{
        this.item=_array;


           onSucc.call(md,this.item);


       }
      );
    });
  }


}
