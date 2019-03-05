import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title, Picker ,Textarea,Left,Right} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"




export default class AllDrivers extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      user:null,
    }
    H.setModel("current",this);

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

  }




  render() {

    var state=this.state;

    if (state.loading ) {
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
                       <Button transparent>
                         <Icon name='pluscircleo' />

                       </Button>
                     </Right>
                   </Header>
                   <Content padder style={H.style.content}>

                      <View style={{margin:10}}>

                         <Text>List of drivers</Text>
                      </View>


                  </Content>
            </AppLayout>

    );
  }
}
