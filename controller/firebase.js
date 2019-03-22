import Fbase from './FbaseConn'

export class Fb{
    constructor(){

      this.db=Fbase.database();
      this.table=null;
    }

    newTable(tableName){
        this.table=this.db.child(tableName);
        return this;
    }

    ready(tableName){
        var table=this.db.ref('/'+tableName);
              table.push({name:"deborah"});
              table.on('value',values=>{
                    values=values.val();
                    for (var key in values) {
                       console.log(values[key]);

                    }

              })
        //console.log(this.db);
      return this;
    }
}
