
/*Controller for client*/
import {Query} from "./query"
import {Validation as Valid} from "../helper/validation"
import {MissionCar} from "./mission_car"
var val=new Valid();
var mcar=new MissionCar();

export class Cars extends Query{
    constructor(BindView=[],creation=false){
      super("id");//we set the primary key of the tab
      // this.db=this.super.db;
      this.model=BindView.model;
      this.content=BindView.container;//the state variable to contain the data
      this.agent=null;
      this.colQuery="marque,plaque,driver_id,created_at";
      this.colSearch="id,marque,plaque,driver_id";
      this.colAlias={id:'Code',marque:"Marque",plaque:"Plaque",driver_id:"Driver code"};
      this.modelName="car";
      this.contentImg="marque";
      /*col to send fro creating the table client for the first time*/
      this.colCreation="id integer primary key not null, marque text,plaque text,driver_id text,created_at text";

      this.conf();



    }

    conf(){
      //Higuration for SQL request

     super.tab("cars",this.colCreation).newTable(()=>{
                       super.fields(this.colQuery)
                   },()=>{super.fields(this.colQuery)});

    }

   driver(id,onSucc){

       super.keyValue(id).belongsTo("driver","driver_id",(all_car)=>{
           if (onSucc) {
              onSucc(all_car)
           }
       },()=>{

           if (onSucc) {
              onSucc([])
           }
       });
    }


    index(onSucc,onNodata){
      super.all((cars)=>{
        if (onSucc) {
           onSucc.call(this,cars)
        }
        if (this.content!==undefined) {
           this.model.setState({[this.content]:cars});
        }
          
        },(cars)=>{
          if (onNodata) {
             onNodata.call(this,[])
          }
          if (this.content!==undefined) {
           this.model.setState({[this.content]:[]});
        }
      });
    }

    resetteCar(carId,onSucc,onErr){//the amount the car gain per month
      var md=this;
      var recette={montant_maison:0,prix_loc:0};
        mcar.affected_car(carId,(recetteF)=>{
              recetteF=H.getForThisMonth(recetteF);
              for (var i = 0; i < recetteF.length; i++) {

                recette.montant_maison=recette.montant_maison+(recetteF[i].montant_maison*parseInt(recetteF[i].loc_duree));
                recette.prix_loc=recette.prix_loc+(recetteF[i].prix_loc*parseInt(recetteF[i].loc_duree));
              }

            if (onSucc) {
               onSucc.call(this,recette);
            }
        },()=>{
          if (onErr) {
             onErr.call(this,recette);
          }
        });

    }


    create(onSucc,onErr){

        var model=this.model;
         val.reset();

         val.add(["required"],model.state.marque,"marqueValid");
         val.add(["required"],model.state.plaque,"plaqueValid");
         val.add(["required"],model.state.driver_id,"driver_idValid");



         if (val.validate(this.model)) {
             var car=model.state;
             var date=new Date();

             var data=super.getData(this.model);//[car.marque,car.plaque,car.color,H.now()];

               //we insert new info of the agent
               super.insert(data,()=>{
                   if (onSucc) {
                     onSucc.call(this,data);
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
       return super.keyValue(id).getByKey((car)=>{

            if (this.content!=undefined) {
              this.model.setState({[this.content]:car});
            }

            if (onSucc) {
                onSucc.call(this,car);
            }

       },()=>{
         if (this.content!=undefined) {
           this.model.setState({[this.content]:null})
         }

         if (onErr) {
             onErr.call(this,"car not found");
         }
          H.Toast("no car is registered",'danger');
       });
    }


    edit(id,onSucc,onErr){
                var model=this.model;
                 val.reset();

                 val.add(["required"],model.state.marque,"marqueValid");
                 val.add(["required"],model.state.plaque,"plaqueValid");
                 val.add(["required"],model.state.driver_id,"driver_idValid");



                 if (val.validate(this.model)) {
                     var car=model.state;
                     var date=new Date();

                     var data=super.getData(this.model,false);//[car.marque,car.plaque,car.color,car.car.created_at];

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

    destroyEl(id,onSucc,onErr){

        super.keyValue(id).destroy(()=>{

             if (onSucc) {
                onSucc.call(this);
             }
        },()=>{
          if (onErr) {
             onErr.call(this);
          }
        });
    }
}
