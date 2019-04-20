import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

// import {Driver} from "../../controller/driver"
import {Carburant as Carb} from "../../controller/carburant"

var carb;
let listener=null;






export default class ShowCarb extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      mission_id:null,
      refreshing:true,
      mission:[],
      list:[],
      total:0,
    }


    carb=new Carb({model:this,container:"list"});

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

  init(){
    var props=this.props;
    var mission=props.mission;

    this.setState({mission_id:mission.id,mission:mission});

    carb.mission(mission.id,(mission)=>{
       var total=H.getTotal(mission,'quantite');
       var descOrder=H.descOrder(mission);

        this.setState({list:descOrder,total:total});
    },()=>{});

  }

  delCarb(id){
    carb.destroyEl(id,()=>{this.init()});
  }

  render() {

    var state=this.state;






    return (
                        <View>
                                     <ListItem style={{marginBottom: 10}}>
                                       <Body>
                                          <Text>Total quantity : {state.total} </Text>
                                       </Body>
                                       <Right>
                                         <Button onPress={()=>{H.goTo(this,H.path.save_carb,{mission:state.mission,init:()=>{this.init()}})}} success small rounded>
                                            <Text>New</Text>
                                         </Button>
                                       </Right>
                                     </ListItem>


                                     <View>


                                         {state.list.map((item,index) => {
                                                var opNumb=state.list.length-(index);
                                                 return <Card key={index}>
                                                           <CardItem header style={{backgroundColor: '#ccc',height: 50}}>
                                                             <Text>Consomation {opNumb}</Text>
                                                             <Button onPress={()=>{this.delCarb(item.id)}} style={{position: 'absolute',right: 5,top:10}} danger small>
                                                               <Icon name="trash" />
                                                             </Button>
                                                           </CardItem>

                                                            <View style={{padding:10,marginBottom:10}} >


                                                             <Text style={{fontSize: 13,marginBottom:5}}>Quantity:{item.quantite}</Text>
                                                             <Text style={{fontSize: 13,marginBottom:5}}>Km parcouru:{item.kmp} Km</Text>
                                                             <Text style={{fontSize: 13,marginBottom:5}}>Date :{item.created_at}</Text>
                                                           </View>
                                                          </Card>

                                             })
                                         }


                                     </View>

                </View>



         );
  }
}
