import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

// import {Driver} from "../../controller/driver"
import {StationMvm} from "../../controller/station_mvm"

var mvm;
let listener=null;






export default class ShowStM extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      car:null,
      refreshing:true,
      mvms:[],
      total:0,
      station:null,
      is_paid:false,


    }


    mvm=new StationMvm({model:this});

  }



  componentDidMount() {
     //H.initIcon(this);
      this.init();
     //  if (Platform.OS == "android" && listener == null) {
     //    listener = BackHandler.addEventListener("hardwareBackPress", () => {
     //       this.init();
     //    })
     // }

  }

  init(isChange){
    var props=this.props;
    var station=props.station;
    var isPaid=props.paid;

   if (isChange!=undefined) {
     if (isChange && isPaid) {
       return;
     }
   }



    this.setState({station:station});
    mvm.station_mvm(...[station.id,,(mvms)=>{


        mvms= mvms.filter((oper) => {
                    return oper.is_paid==isPaid;
        })
        var descOrder=H.descOrder(mvms);
         var total=H.getTotal(descOrder,'quantite');

        this.setState({mvms:descOrder,total:total,is_paid:isPaid});
    },()=>{}]);

  }

  delmvm(id){
    mvm.destroyEl(id,()=>{this.init()});
  }

  paiement(mvmS,index){

      mvm.remboursement(mvmS.id,{is_paid:1},()=>{
             this.init();

      });
  }

  render() {

    var state=this.state;






    return (
                             <View>
                                     <ListItem style={{marginBottom: 10}}>
                                       <Body>
                                          <Text>Total : {state.total} quantity</Text>
                                       </Body>

                                       {!state.is_paid?
                                         <Right>

                                             <Button onPress={()=>{H.goTo(this,H.path.save_station_mvm,{station:state.station,is_paid:state.is_paid?1:0,init:()=>{this.init()}})}} success small rounded>
                                                <Text>New</Text>
                                             </Button>
                                           </Right>:
                                           <Text></Text>


                                       }


                                     </ListItem>


                                     <View>


                                         {state.mvms.map((item,index) => {
                                                var opNumb=state.mvms.length-(index);
                                                 return <Card key={index}>
                                                           <CardItem header style={{backgroundColor: '#ccc',height: 50}}>
                                                             <Text>Operation {opNumb}</Text>
                                                               {!state.is_paid?
                                                                 <Button onPress={()=>{this.paiement(item,index)}} style={{position: 'absolute',right:60,top:10}} success small>
                                                                  <Text>Payer</Text>
                                                               </Button>:
                                                               <Text></Text>
                                                             }
                                                             <Button onPress={()=>{this.delmvm(item.id)}} style={{position: 'absolute',right: 5,top:10}} danger small>
                                                               <Icon name="trash" />
                                                             </Button>
                                                           </CardItem>

                                                            <View style={{padding:10,marginBottom:10}} >


                                                             <Text style={{fontSize: 13,marginBottom:5}}>beneficaire : {item.beneficaire}</Text>
                                                             <Text style={{fontSize: 13,marginBottom:5}}>Quantity : {item.quantite}</Text>
                                                             <Text onPress={()=>{H.goTo(this,H.path.show_car,{id:item.car_id})}} style={{fontSize: 13,marginBottom:5}}>Code car :{item.car_id}</Text>
                                                             <Text style={{fontSize: 13,marginBottom:5}}>Date : {item.created_at}</Text>
                                                           </View>
                                                          </Card>

                                             })
                                             }


                                     </View>

                </View>



         );
  }
}
