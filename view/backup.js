import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'
import {AppLayout,AppLoading} from "./app_layout"
import {Fb} from "../controller/firebase.js"


var fb;




export default class Buckup extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      value:"",
      modelName:"",
      model:"",//the model in which we are looking that data
      alldata:[],//all data fetched in the given model
      checkCol:[],
      dataFound:[],
      start:false,
      total:0//total result
      progress_parsent:0,
    }
    fb=new Fb();
    H.setModel("current",this);


  }

  static navigationOptions=({navigation})=>{

     let header=null;
     return {header};
  }



  componentDidMount() {
     H.initIcon(this);


  }

  sendData(){
     fb.sendToCloud(()=>{
          H.Toast(...["Your data is now secured on line",,20000])
     });
   }
  getData(){

  }


  render() {

    var state=this.state;

    if (state.loading ) {
      return <AppLoading />
    }





    return (




          <AppLayout noBack={true}>


                <Header style={H.style.base_headers}>
                   <Left>
                     <Button onPress={()=>{H.openDrawer()}} transparent>
                       <Icon name='menu' />
                     </Button>
                   </Left>
                   <Body>
                     <Title style={H.style.title}>Backup</Title>
                   </Body>

                 </Header>
                  <Content  padder style={H.style.content}>
                   <View style={{flex:1,paddingTop:20}}>
                        <View style={{justifyContent: 'center',alignItems: 'center',marginBottom:20}}>
                           <Thumbnail square style={{height: 200,width:"100%",padding:0}} source={H.img.other.cloud}/>
                        </View>
                        <View style={{alignItems: 'center',marginBottom:10}}>
                          <ProgressCircle
                                 percent={state.progress_parsent}
                                 radius={50}
                                 borderWidth={8}
                                 color="#3399FF"
                                 shadowColor="#999"
                                 bgColor="#fff"
                             >
                                 <Text style={{ fontSize: 18,...[H.style.green_color] }}>{state.progress_parsent}%</Text>
                             </ProgressCircle>
                        </View>

                        <View style={{alignItems: 'center',marginBottom:20}}>
                           <Button onPress={()=>{this.sendData()}} iconRight small success full rounded>
                                <Text>Send your data</Text>
                                <Icon name="cloud-upload"/>
                           </Button>
                        </View>

                        <View style={{alignItems: 'center',marginBottom:10}}>
                            <Button onPress={()=>{this.getData()}} iconRight small success full rounded>
                                 <Text>Find your data</Text>
                                 <Icon name="cloud-download"/>
                            </Button>
                        </View>
                      </View>



                 </Content>

            </AppLayout>


    );
  }
}
