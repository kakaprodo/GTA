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
      total:0,//total result
      progress_parsent:0,
      msg_onEnd:"",
      start_backup:false,//when user start to backup or retrieve data
      source:false,//or login: if from login ,the button send will not appear

    }
    fb=new Fb(this);
    H.setModel("current",this);


  }

  static navigationOptions=({navigation})=>{

     let header=null;
     return {header};
  }



  componentDidMount() {
     H.initIcon(this);
     var source=H.getParam(this.props,'source')
     this.setState({source:source})



  }

  doneBuckup(){
     this.setState({start_backup:false,msg_onEnd:"",progress_parsent:0});
     fb.closeConnection();
     H.Toast('Well confirmed')
  }

  sendData(){

    H.swal("Have you checked well the data you want to send? because this operation will change "+
           "all your online data depending on the local data that you want to send" ,()=>{
      this.setState({start_backup:true,msg_onEnd:"Sending data to cloud",progress_parsent:0});
      fb.sendToCloud(()=>{
          H.Toast('Operation well done')
          this.setState({msg_onEnd:"Your data is now secured on line, Click now on done button to confirm"})

      });
    })




   }

  getData(){

    H.swal("Do you really need to put your online data into the local storage? because this operation will change "+
           "all your local data depending on the online data that you want to retrieve" ,()=>{
      this.setState({start_backup:true,msg_onEnd:"Retrieving data from cloud",progress_parsent:0});
      fb.retrieveFromCloud(()=>{
           H.Toast('Operation well done')
         this.setState({msg_onEnd:"Your data is now available in your local device, Click now on done button to confirm"})
      })
    });
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
                   <Right>
                     <Button onPress={()=>{this.doneBuckup()}} transparent>
                       <Icon name='checkmark' />
                     </Button>
                   </Right>

                 </Header>
                  <Content  padder style={H.style.content}>
                   <View style={{flex:1,paddingTop:20}}>
                        <View style={{justifyContent: 'center',alignItems: 'center',marginBottom:20}}>
                           <Thumbnail square style={{height: 200,width:"100%",padding:0}} source={H.img.other.cloud}/>
                        </View>


                        {state.start_backup?
                            <View style={{alignItems: 'center',marginBottom:10}}>
                                <ProgressCircle
                                       percent={state.progress_parsent}
                                       radius={50}
                                       borderWidth={8}
                                       color={H.globalStyle.green_color /*"#3399FF"*/}
                                       shadowColor="#999"
                                       bgColor="#fff"
                                   >
                                       <Text style={{ fontSize: 18,...H.style.green_color}}>{state.progress_parsent}%</Text>
                                   </ProgressCircle>
                                   <Text note style={{padding: 5,...H.style.center}}>{state.msg_onEnd}</Text>
                          </View>:
                          <Text></Text>
                      }

                      {state.source?//is when user is connected that he can see this button
                        <View style={{alignItems: 'center',marginBottom:30}}>
                         <Button onPress={()=>{this.sendData()}} iconRight small success full rounded>
                              <Text>Send your data</Text>
                              <Icon name="cloud-upload"/>
                         </Button>
                      </View>:
                      <Text></Text>
                    }

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
