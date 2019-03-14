import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

// import {Driver} from "../../controller/driver"
import {IO} from "../../controller/driver_io"

var io;
let listener=null;






export default class ShowIO extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      id:null,
      refreshing:true,
      input:[],
      output:[],
      is_input:false,
      driver:null,
      total:0,
    }


    io=new IO({model:this});

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

  init(isOperation){
    var props=this.props;
    var driver=props.driver;
    var is_input=props.isdepot;

   

    this.setState({driver:driver,is_input:is_input});
    io.driver(driver.id,(operation)=>{
       var total=0;
        var op= operation.filter((oper) => {
                      if(oper.is_input==is_input){
                          total=total+parseInt(oper.montant);
                      }

                      return oper.is_input==is_input;
                  })
        var descOrder=H.descOrder(op);
        var content=is_input?"input":"output";
        this.setState({[content]:descOrder,total:total});
    },()=>{});

  }

  delIO(id){
    io.destroyEl(id,()=>{this.init()});
  }

  render() {

    var state=this.state;






    return (
                        <View>
                                     <ListItem style={{marginBottom: 10}}>
                                       <Body>
                                          <Text>Total : {state.total} UM</Text>
                                       </Body>
                                       <Right>
                                         <Button onPress={()=>{H.goTo(this,H.path.driverin_out,{driver:state.driver,depot:state.is_input,init:()=>{this.init()}})}} success small rounded>
                                            <Text>New</Text>
                                         </Button>
                                       </Right>
                                     </ListItem>


                                     <View>


                                         {state[state.is_input?"input":"output"].map((item,index) => {
                                                var opNumb=state[state.is_input?"input":"output"].length-(index);
                                                 return <Card key={index}>
                                                           <CardItem header style={{backgroundColor: '#ccc',height: 50}}>
                                                             <Text>Operation {opNumb}</Text>
                                                             <Button onPress={()=>{this.delIO(item.id)}} style={{position: 'absolute',right: 5,top:10}} danger small>
                                                               <Icon name="trash" />
                                                             </Button>
                                                           </CardItem>

                                                            <View style={{padding:10,marginBottom:10}} >


                                                             <Text style={{fontSize: 13,marginBottom:5}}>Motif:{item.motif}</Text>
                                                             <Text style={{fontSize: 13,marginBottom:5}}>Montant:{item.montant} UM</Text>
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
