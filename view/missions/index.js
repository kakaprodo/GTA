import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Switch} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Mission} from "../../controller/mission"

var mission;

let listener=null;




export default class Allmissions extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      missions:[],


    }
    H.setModel("current",this);
    mission=new Mission({model:this,container:"missions"});

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

    mission.index();
  }

  delmission(chauffeur){
      mission.destroyEl(chauffeur.id,()=>{this.init()});
  }



  render() {

    var state=this.state;
     var missions=state.missions;





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
                       <Title style={H.style.title}>All missions</Title>
                     </Body>
                     <Right>
                       <Button transparent>
                         <Icon name='search' />
                       </Button>




                       <Button onPress={()=>{H.goTo(this,H.path.create_mission,{init:()=>{this.init()}})}} transparent>
                         <Text>New</Text>

                       </Button>
                     </Right>
                   </Header>
                   <Content padder style={H.style.content}>




                     <List style={{marginLeft:-3}}>
                        {missions.map((item,index) => {

                          return <ListItem button
                                    onPress={()=>{H.goTo(this,"show_mission",{id:item.id})}}
                                    avatar key={index}>
                                    <Left>
                                      <Button transparent>
                                        <Icon style={{color:H.randomColor()}} name='navigate' />
                                      </Button>
                                    </Left>
                                    <Body  >

                                      <Text>Chef : {item.chef_mission}</Text>
                                      <Text note>Organisation : {item.organisation}</Text>
                                      <Text note>Mission n° : {item.id}</Text>
                                    </Body>
                                    <Right>
                                      <Button onPress={()=>{this.delmission(item)}} transparent>
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
