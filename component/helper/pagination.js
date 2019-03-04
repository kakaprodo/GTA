/*This is to handle all pagination*/

import {CONF} from "./all"




export class Pagination{

    constructor(){

      //console.log(super());
        this.containerName="";//the name of array in model state that gona contain data
        this.total=0;//total number of data
        this.from=null;//pagination range start
        this.to=null;//pagination rande end
        this.next_page_url=null;
        this.prev_page_url=null;
        this.current_page=1;//the current page
        this.isSending=false;//to check if the request is in process
        this.dataLoaded=0;//number of data already loaded
        this.dataRemain=0;//number of remaining data
        this.model=null;
        this.dataContainer=[];


    }

    /*We are assigning info into local varaible and model state from where the class have been called*/
    initData(data,model,containerName){
         if (containerName!==undefined) {
           this.constructor();//we reinitialize all variables
         }
         this.dataContainer=this.dataContainer.concat(data.data);
         this.total=data.total;
         this.from=data.from;
         this.to=data.to;
         this.current_page=data.current_page;
         this.next_page_url=data.next_page_url;
         this.prev_page_url=data.next_page_url;
         this.dataLoaded=this.dataContainer.length;
         this.dataRemain=this.total-this.dataLoaded;


         //this is used for the first time when this is called
         if (containerName!==undefined) {//if he sent  the varaiable of array where the data will be
           model.setState({[containerName]:data.data});
           this.containerName=containerName;
           this.model=model;

         }

        return this;

      }

    canLoad(){//this function will be used in className of loadMore button's container to decide if it can be hidden or shown
       return this.dataRemain==0?"hide":"show";
    }

    loadMore(replace=false){//if replace=false then the received data will be appended to the "container" else it will be replaced

       if (this.next_page_url!==null && this.isSending==false) {
            this.isSending=true;
            this.callNextPage(replace);

       }

       if (this.next_page_url==null) {
          CONF.Toast("No other informations","error");
       }
      return this;
   }

   callNextPage(replace){//send request to server for getting the next page
      var url=this.next_page_url+"&token="+CONF.getToken();
      var appendTo=this.containerName;
      const rm=this.model;

      CONF.axios.get(url)
           .then(resp=>{
             var result=resp.data;

             this.isSending=false;
             this.initData(result);//we update local varaiables

             if (replace) {//we replace data in container variable
                rm.setState({[appendTo]:result.data});
             }
             else{//we append data to existing data in container variable
               rm.setState({[appendTo]:rm.state[appendTo].concat(result.data)});
             }




         });
    }

    infinitCall(){
       CONF.infiniteScroll(()=>{
           this.loadMore();
       });
    }







}
