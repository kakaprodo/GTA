import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Switch} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {MissionCar} from "../../controller/mission_car"

var car;

let listener=null;




export default class AllMissCar extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      mission:null,
      refreshing:true,
      mission_id:"",
      total_maison:0,
      total_prix_loc:0,
      total_car_price:0,
      cars:[],
    }
    H.setModel("current",this);
    car=new MissionCar({model:this,container:"cars"});

  }


  componentDidMount() {
     H.initIcon(this);
     this.init();

  }

  init(){
    var props=this.props;
    var mission=props.mission;
    var modelMission=props.modelMission;

     this.setState({mission:mission})
    car.mission_car(mission.id,(carF)=>{
       var total_maison=H.getTotal(carF,'montant_maison');
       var total_prix_loc=H.getTotal(carF,'prix_loc');
       var carF=H.descOrder(carF);


       this.setState({cars:carF,
                      total_maison:total_maison*parseInt(mission.duree),
                      total_prix_loc:total_prix_loc*parseInt(mission.duree)});

     modelMission.setRepportFromCar(mission.id,{montant_maison:total_maison,prix_loc:total_prix_loc})

    },()=>{

      this.setState({total_maison:0,
                     total_prix_loc:0});
      //we save the montant_maison and prix location in mission table
      modelMission.setRepportFromCar(mission.id,{montant_maison:0,prix_loc:0})
    });
  }

  unAffectCar(veh){
      car.destroyEl(veh.id,()=>{this.init()});
  }



  render() {

    var state=this.state;
     var cars=state.cars;
     var {mission}=this.props;




      return <View>
                <CardItem header>
                  <Text>All cars of the mission :{cars.length}</Text>
                  <Button onPress={()=>{H.goTo(this,H.path.save_mission_car,{mission:state.mission,init:()=>{this.init()}})}} style={{position: 'absolute',right: 5,top:10}} success small>
                     <Text>New</Text>
                  </Button>
                </CardItem>
                <List style={{marginLeft:-3}}>
                   {cars.map((item,index) => {

                     return <ListItem button avatar key={index}>
                               <Left>
                                 <Icon style={H.style.green_color} name="car" />
                               </Left>
                               <Body  >
                                 <Text onPress={()=>{H.goTo(this,H.path.show_car,{id:item.car_id})}} style={{paddingTop:5,paddingBottom:5}}>Car code :{item.car_id}</Text>
                                 <Text note onPress={()=>{H.goTo(this,H.path.show_driver,{id:item.driver_id})}} style={{paddingTop:5,paddingBottom:5}}>Driver code :{item.car_id}</Text>
                                 <Text note>Prix location : {item.prix_loc} Um</Text>
                                 <Text note>Montant maison : {item.montant_maison} Um</Text>
                               </Body>
                               <Right>
                                 <Button onPress={()=>{this.unAffectCar(item)}} transparent>
                                     <Icon style={{fontSize: 30,color:"#b71c1c"}}  name="trash" />
                                 </Button>

                               </Right>
                             </ListItem>
                   })}






               </List>

                <List>
                     <CardItem header>
                       <Text>The price of the mission </Text>

                     </CardItem>
                     <ListItem icon>
                           <Left>
                             <Button style={H.style.headers}>
                               <Icon active name="logo-euro" />
                             </Button>
                           </Left>
                           <Body>

                             <Text style={H.style.green_color} >{state.total_prix_loc} UM</Text>
                             <Text note>Total prix location</Text>

                           </Body>
                           <Right></Right>
                      </ListItem>

                      <ListItem icon>
                            <Left>
                              <Button style={H.style.headers}>
                                <Icon active name="logo-euro" />
                              </Button>
                            </Left>
                            <Body>

                              <Text style={H.style.green_color}>{state.total_maison} UM</Text>
                              <Text note>Total montant maison</Text>

                            </Body>
                            <Right></Right>
                       </ListItem>

                      <ListItem icon>
                            <Left>
                              <Button style={H.style.headers}>
                                <Icon active name="calendar" />
                              </Button>
                            </Left>
                            <Body>

                              <Text >{mission.created_at}</Text>
                              <Text note>Registration date of mission </Text>

                            </Body>
                            <Right></Right>
                       </ListItem>
                   </List>





      </View>



  }
}
