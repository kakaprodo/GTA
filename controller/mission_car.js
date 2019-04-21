
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
var val=new Valid();

export class MissionCar extends Query{

    constructor(BindView=[],keyName='id'){
      super(keyName);//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="car_id,mission_id,driver_id,prix_loc,montant_maison,loc_duree,created_at";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null,car_id text,mission_id text,driver_id text,prix_loc text,montant_maison text,loc_duree text,created_at text";

      this.conf();



    }

    conf(){
      //Higuration for SQL request
      super.tab("mission_car",this.colCreation).newTable(()=>{
                       super.fields(this.colQuery)
                   },()=>{super.fields(this.colQuery)});
   
    }

    with(data,resp){

        super.join(data,(finalData)=>{
            //this.model.setState({[this.content]:finalData});
            if (resp) {
               resp.call(this,finalData);
            }
        });
    }

    affected_car(id,onSucc,onErr){
       super.keyValue(id.toString()).belongsTo("cars","car_id",(allMvm)=>{

         if (this.model!=undefined) {
            this.model.setState({[this.content]:allMvm})
         }


           if (onSucc) {
              onSucc.call(this,allMvm);
           }
       },()=>{

           if (this.content) {
              this.model.setState({[this.content]:[]})
           }


           if (onErr) {
              onErr.call(this);
           }
       });
    }



    mission_car(id,onSucc,onErr){
       super.keyValue(id).belongsTo("mission","mission_id",(allMvm)=>{

         if (this.model!=undefined) {
            this.model.setState({[this.content]:allMvm})
         }


           if (onSucc) {
              onSucc.call(this,allMvm);
           }
       },()=>{

           if (this.content) {
              this.model.setState({[this.content]:[]})
           }


           if (onErr) {
              onErr.call(this);
           }
       });
    }




    index(onSucc,onNodata,isDesc=false){
          super.all((ios)=>{
           
              ios=isDesc?H.descOrder(ios):ios;

              if (onSucc) {
                 onSucc.call(this,ios)
              }

              if (this.content!=undefined) {
                 this.model.setState({[this.content]:ios});
              }
            },(ios)=>{
              if (onNodata) {
                 onNodata.call(this,[])
              }
              if (this.content!=undefined) {
                 this.model.setState({[this.content]:ios});
              }
          });
        }


  create(onSucc,onErr){

            var model=this.model;
             val.reset().setModel(model)
             .addRule(...[,'car_id'])
             .addRule(...[,'mission_id'])
             .addRule(...[,'driver_id'])
             .addRule(...[,'montant_maison'])
            .addRule(...[,'loc_duree'])
             .addRule(...[,'prix_loc']);

            if (val.validate()) {

                 var data=super.getData(this.model);
                 var {mission_id,car_id}=model.state;

                 //we check if the code car on this mission doesnt exists
                 super.exist({mission_id:mission_id,car_id:car_id},()=>{
                             if (onErr) {
                                 onErr.call(this,"Input error");
                             }
                           model.setState({car_idValid:`The car with code: '${car_id}' is already affected on the mission`})
                      },
                    ()=>{
                           //we insert new info of the agent
                           super.insert(data,()=>{
                               if (onSucc) {
                                 onSucc.call(this,data);
                               }
                           },()=>{
                             if (onErr) {
                                 onErr.call(this,"Input error");
                             }
                           });
                 });

             }
             else{
               //console.log(val.result);
               if (onErr) {
                   onErr.call(this,"Input error");
               }

             }

        }

        show(id,onSucc,onErr){
           return super.keyValue(id).getByKey((fournisseur)=>{

                if (this.content!=undefined) {
                  this.model.setState({[this.content]:fournisseur});
                }

                if (onSucc) {
                    onSucc.call(this,fournisseur);
                }

           },()=>{
             if (this.content!=undefined) {
               this.model.setState({[this.content]:null})
             }

             if (onErr) {
                 onErr.call(this,"mission car not found");
             }
              H.Toast("no mission car is registered",'danger');
           });
        }

        edit(id,onSucc,onErr){
                    var model=this.model;
                    val.reset().setModel(model)
                    .addRule(...[,'car_id'])
                    .addRule(...[,'mission_id'])
                    .addRule(...[,'driver_id'])
                    .addRule(...[,'montant_maison'])
                    .addRule(...[,'prix_loc']);


                    if (val.validate()) {
                        var fournisseur=model.state;
                        var data=super.getData(this.model,false);

                           //we insert new info of the agent
                           super.keyValue(id).update(data,()=>{
                               if (onSucc) {
                                 onSucc.call(this,data);
                               }
                           },()=>{
                             if (onErr) {
                                 onErr.call(this);
                             }
                           });

                     }
                     else{
                       if (onErr) {
                           onErr.call(this,"Input error");
                       }

                  }
    }

    destroyAll(){
      return super.clearTable();
    }

    destroyEl(id,onSucc,onErr,noAlert=false){

        super.keyValue(id).destroy(()=>{

             if (onSucc) {
                onSucc.call(this);
             }
        },()=>{
          if (onErr) {
             onErr.call(this);
          }
        },noAlert);
    }
}
