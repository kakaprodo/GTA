import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title, Picker ,Textarea,Left,Right} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "./app_layout"

import {User} from "../controller/user"

var user;


export default class Dashboard extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      user:null,
    }
    H.setModel("current",this);
    user=new User({model:this,container:"user"});
    this.drawer=null;
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
     user.show();
  }




  render() {

    var state=this.state;
    var user=state.user;
    if (state.loading || user==null) {
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
                       <Title style={H.style.title}>Welcome</Title>
                     </Body>
                     <Right>
                       <Button transparent>
                         <Icon name='more' />
                       </Button>
                     </Right>
                   </Header>
                   <Content padder style={H.style.content}>

                      <View style={{margin:10}}>

                        <H2 style={[H.style.center,H.style.app_color]}>{H.appLongName}</H2>

                      </View>
                      <View style={{marginTop:20}}>
                         <H3 style={[H.style.center,H.style.app_color]}>Welcome {user.names}</H3>
                          <Text style={[H.style.center,H.style.white_color,{fontSize: 13}]}>You can do now your activities by clicking on the list menu or </Text>
                          <Button
                            full
                           success
                           onPress={()=>{H.openDrawer()}}
                            small rounded>
                             <Text>Start now </Text>
                             <Icon style={{fontSize: 17,...H.style.textBtn}}  name="menu" />
                          </Button>
                        </View>

                  </Content>
            </AppLayout>

    );
  }
}