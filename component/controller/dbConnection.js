

/*A class to connect the app to sqlite */


import { Constants, SQLite } from 'expo';


export class Con{

   constructor(name="intervention"){
      this.db = SQLite.openDatabase(name+'.db');

   }

   getConnection(){
      return this.db;
   }
}
