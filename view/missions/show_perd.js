import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

// import {Driver} from "../../controller/driver"
import {Perdieme as Perd} from "../../controller/perdieme"

var perd;
let listener=null;






export default class Showperd extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      mission_id:null,
      mission:[],
      perds:[],
      total:0,
    }


    perd=new Perd({model:this,container:"perds"});

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

    perd.mission(mission.id,(perdiemes)=>{
       var total=H.getTotal(perdiemes,'montant');
       var descOrder=H.descOrder(perdiemes);

        this.setState({perds:descOrder,total:total});
    },()=>{});

  }

  delperd(id){
    perd.destroyEl(id,()=>{this.init()});
  }

  render() {

    var state=this.state;






    return (
                        <View>
                                     <ListItem style={{marginBottom: 10}}>
                                       <Body>
                                          <Text>Total amount : {state.total} Um</Text>
                                       </Body>
                                       <Right>
                                         <Button onPress={()=>{H.goTo(this,H.path.save_perd,{mission:state.mission,init:()=>{this.init()}})}} success small rounded>
                                            <Text>New</Text>
                                         </Button>
                                       </Right>
                                     </ListItem>


                                     <View>


                                         {state.perds.map((item,index) => {
                                                var opNumb=state.perds.length-(index);
                                                 return <Card key={index}>
                                                           <CardItem header style={{backgroundColor: '#ccc',height: 50}}>
                                                             <Text>Perdieme {opNumb}</Text>
                                                             <Button onPress={()=>{this.delperd(item.id)}} style={{position: 'absolute',right: 5,top:10}} danger small>
                                                               <Icon name="trash" />
                                                             </Button>
                                                           </CardItem>

                                                            <View style={{padding:10,marginBottom:10}} >



                                                             <Text style={{fontSize: 13,marginBottom:5}}>Montant:{item.montant} Um</Text>
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
