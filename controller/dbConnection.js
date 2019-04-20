

/*A class to connect the app to sqlite */


import { Constants, SQLite } from 'expo';


export class Con{

   constructor(name="gta"){
      this.db = SQLite.openDatabase(name+'.db');
      this.dbName=name;

   }

   getConnection(){
      return this.db;
   }

   getdbName(){
       return this.dbName;
   }
}
