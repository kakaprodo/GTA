import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Switch} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Driver} from "../../controller/driver"

var driver;
<<<<<<< HEAD
let listener=null;
=======

>>>>>>> 9e23d593c5c0ba7b29331619cf1b86919e0eeb8d

export default class AllDrivers extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
<<<<<<< HEAD
      refreshing:true,
=======
>>>>>>> 9e23d593c5c0ba7b29331619cf1b86919e0eeb8d
      drivers:[],
    }
    H.setModel("current",this);
    driver=new Driver({model:this,container:"drivers"});

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

  componentWillMount() {
     H.initIcon(this);
     this.init();

     if (Platform.OS == "android" && listener == null) {
       listener = BackHandler.addEventListener("hardwareBackPress", () => {
          this.init();
       })
    }


     driver.index();
  }

  init(){

    driver.index(()=>{this.setState({refreshing:false})},
                 ()=>{this.setState({refreshing:false})}
               );
  }



  render() {

    var state=this.state;
     var drivers=state.drivers;
<<<<<<< HEAD

=======
     
>>>>>>> 9e23d593c5c0ba7b29331619cf1b86919e0eeb8d
    if (state.loading || drivers.length==0 ) {
      return <AppLoading />
    }





    return (




          <AppLayout>

                  <Header style={H.style.base_headers}>
                     <Left>
                       <Button onPress={()=>{H.openDrawer()}} transparent>
                         <Icon name='menu' />
                       </Button>
                     </Left>
                     <Body>
                       <Title style={H.style.title}>All drivers</Title>
                     </Body>
                     <Right>
                       <Button transparent>
                         <Icon name='search' />
                       </Button>
<<<<<<< HEAD
                       <Button onPress={()=>{this.init()}} transparent>
                         <Icon name='refresh' />
                       </Button>
=======
>>>>>>> 9e23d593c5c0ba7b29331619cf1b86919e0eeb8d
                       <Button onPress={()=>{H.goTo(this,H.path.create_driver)}} transparent>
                         <Text>New</Text>

                       </Button>
                     </Right>
                   </Header>
                   <Content padder style={H.style.content}>

<<<<<<< HEAD

                     <List style={{marginLeft:-3}}>
                        {drivers.map((item,index) => {

                          return <ListItem button onPress={()=>{item.onPress()}} key={index}>
                             <Left>
=======
                     <List style={{marginLeft:-3}}>
                        {drivers.map((item,index) => {

                          return <ListItem button onPress={()=>{item.onPress()}} key={index}>
                             <Left>

                               <Text>{item.names}</Text>
                             </Left>

                              <Right>
                                <Icon style={H.style.sidebarIcon} name="arrow-forward" />
                              </Right>
                          </ListItem>
                        })}
>>>>>>> 9e23d593c5c0ba7b29331619cf1b86919e0eeb8d

                               <Text>{item.names}</Text>
                             </Left>

<<<<<<< HEAD
                              <Right>
                                <Icon style={H.style.sidebarIcon} name="arrow-forward" />
                              </Right>
                          </ListItem>
                        })}


=======
>>>>>>> 9e23d593c5c0ba7b29331619cf1b86919e0eeb8d
                      </List>
                  </Content>

            </AppLayout>


    );
  }
}
