import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Root,Drawer} from "native-base"
import SideBar from './sidebar';
import Login from "./user/login"
import Regit from "./user/regit"
import Dashboard from "./dashboard"
import AllDrivers from "./drivers/"
import CreateDriver from "./drivers/create"


var AllScreen=createStackNavigator({
  // 'demo':{screen:Demo},
  'drivers':{screen:AllDrivers},
  'create_driver':{screen:CreateDriver },
  'login':{screen:Login },
  'dashboard':{screen:Dashboard },
  'regit':{screen:Regit },






});

const Scr=createAppContainer(AllScreen);

// export default App;


export default class All extends Component {
  constructor(props){
      super(props);
      this.state={
        loading:true
      }
  }

 render() {
    var state=this.state;
    return (
      <Root>
        <Drawer
         ref={(ref) => { H.drawer = ref; }}
         content={<SideBar navigator={this.navigator} />}
         onClose={() => H.closeDrawer()} >
            <Scr/>
        </Drawer>
      </Root>

  );


  }
}
