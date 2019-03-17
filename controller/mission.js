
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
import {Carburant as Carb} from "./carburant"
import {Perdieme as Perd} from "./perdieme"
var carb=new Carb(undefined,'mission_id');
var perd=new Perd(undefined,'mission_id');
var val=new Valid();

export class Mission extends Query{
    constructor(BindView=[],keyName="id"){
      super(keyName);//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="chef_mission,organisation,duree,driver_id,car_id,terrain_visite,"+
                    "prix_loc,montant_maison,created_at";
      this.colSearch="id,chef_mission,organisation";
      this.colAlias={id:"Mission n°",chef_mission:"Chef mission",organisation:"Organisation"};
      this.modelName="mission";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null,"+
                       "chef_mission text,organisation text,"+
                       "duree text,driver_id text,car_id text,"+
                       "terrain_visite text, prix_loc text,montant_maison text,"+
                       "created_at text";

      this.conf();



    }

    conf(){
      //Higuration for SQL request

     super.tab("mission",this.colCreation).newTable(()=>{
                       super.fields(this.colQuery)
                   },()=>{super.fields(this.colQuery)});

    }






    index(onSucc,onNodata,isDesc){
      super.all((missions)=>{
            missions=isDesc?missions.reverse():missions;
            missions=missions.map(mission => {
                    var total_maison=mission.montant_maison*mission.duree;
                    var total_location=mission.prix_loc*mission.duree;
                    mission.total_maison=total_maison;
                    mission.total_location=total_location;
                    return mission;
            });

            if (onSucc) {

               onSucc.call(this,missions)
            }

          if (this.content!=undefined) {
             this.model.setState({[this.content]:missions});
          }

        },(missions)=>{
          if (onNodata) {
             onNodata.call(this,[])
          }
          if (this.content!=undefined) {
             this.model.setState({[this.content]:missions});
          }
      });
    }


    create(onSucc,onErr){

        var model=this.model;
         val.reset();
         val.add(["required"],model.state.chef_mission,"cmValid");
         val.add(["required"],model.state.organisation,"orgValid");
         val.add(["number"],model.state.duree,"dureeValid");
         val.add(["required"],model.state.driver_id,"dValid");
         val.add(["required"],model.state.car_id,"cValid");
         val.add(["required"],model.state.terrain_visite,"tvValid");
         val.add(["required"],model.state.prix_loc,"plValid");
         val.add(["required"],model.state.montant_maison,"mmValid");


         if (val.validate(this.model)) {
             var mission=model.state;
             var data=super.getData(this.model);

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
         }
         else{
           if (onErr) {
               onErr.call(this,"Input error");
           }

         }

    }

    show(id,onSucc,onErr){
       return super.keyValue(id).getByKey((mission)=>{
             var total_maison=mission.montant_maison*mission.duree;
             var total_location=mission.prix_loc*mission.duree;
             mission.total_maison=total_maison;
             mission.total_location=total_location;

            if (this.content!=undefined) {
              this.model.setState({[this.content]:mission});
            }

            if (onSucc) {
                onSucc.call(this,mission);
            }

       },()=>{
         if (this.content!=undefined) {
           this.model.setState({[this.content]:null})
         }

         if (onErr) {
             onErr.call(this,"mission not found");
         }
          H.Toast("no mission is registered",'danger');
       });
    }

    edit(id,onSucc,onErr){
                var model=this.model;
                val.reset();
                val.add(["required"],model.state.chef_mission,"cmValid");
                val.add(["required"],model.state.organisation,"orgValid");
                val.add(["number"],model.state.duree,"dureeValid");
                val.add(["required"],model.state.driver_id,"dValid");
                val.add(["required"],model.state.car_id,"cValid");
                val.add(["required"],model.state.terrain_visite,"tvValid");
                val.add(["required"],model.state.prix_loc,"plValid");
                val.add(["required"],model.state.montant_maison,"mmValid");


                if (val.validate(this.model)) {
                    var mission=model.state;
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
            carb.destroyEl(id,undefined,undefined,true);
            perd.destroyEl(id,undefined,undefined,true);

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
