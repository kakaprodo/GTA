import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Switch} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Driver} from "../../controller/driver"

var driver;


export default class AllDrivers extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
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

     driver.index();
  }




  render() {

    var state=this.state;
     var drivers=state.drivers;
     
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
                       <Button onPress={()=>{H.goTo(this,H.path.create_driver)}} transparent>
                         <Text>New</Text>

                       </Button>
                     </Right>
                   </Header>
                   <Content padder style={H.style.content}>

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


                      </List>
                  </Content>
            </AppLayout>

    );
  }
}
