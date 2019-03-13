import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Station} from "../../controller/station"

var station;

let listener=null;




export default class Allstations extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      refreshing:true,
      allstation:[],
      total:0
    }
    H.setModel("current",this);
    station=new Station({model:this,container:"allstation"});

  }

  static navigationOptions=({navigation})=>{
    //  let headerTitle="Welcome";
    //  let headerStyle=H.style.headers;
    //  let headerTitleStyle=H.style.title;
    //  headerRight=  <Button
    //     onPress={() => alert('This is a button!')}
    //     title="Info"
    //     color="#fff"
    //   />
    //
    //
    // return {headerTitle,headerStyle,headerTitleStyle,headerRight};
     let header=null;
     return {header};
  }

  componentDidMount() {
     H.initIcon(this);
     this.init();


  }

  init(){

    station.index();
  }

  delstation(stationin){
      station.destroyEl(stationin.id,()=>{this.init()});
  }





  render() {

    var state=this.state;
     var stations=state.stations;





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
                       <Title style={H.style.title}>All stations</Title>
                     </Body>
                     <Right>
                       <Button transparent>
                         <Icon name='search' />
                       </Button>

                       <Button onPress={()=>{H.goTo(this,H.path.create_station,{init:()=>{this.init()}})}} transparent>
                         <Text>New</Text>

                       </Button>
                     </Right>
                   </Header>
                   <Content  padder style={H.style.content}>
                     <List style={{marginLeft:-3}}>
                        {state.allstation.map((item,index) => {

                          return <ListItem button
                                    onPress={()=>{H.goTo(this,"show_station",{id:item.id})}}
                                    avatar key={index}>
                                    <Left>
                                      <Button transparent>
                                        <Icon style={{color:H.randomColor()}} name='pint' />
                                      </Button>
                                    </Left>
                                    <Body  >

                                      <Text> {item.station_name}</Text>
                                      <Text note>Dette : 50 </Text>

                                    </Body>
                                    <Right>
                                      <Button onPress={()=>{this.delstation(item)}} transparent>
                                          <Icon style={{fontSize: 30,color:"#b71c1c"}}  name="trash" />
                                      </Button>

                                    </Right>
                                  </ListItem>
                        })}


                      </List>
                  </Content>

            </AppLayout>


    );
  }
}
