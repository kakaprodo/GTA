import React from 'react';
import { StyleSheet, Text, View,YellowBox } from 'react-native';


import AppScreens from "./view/index";
import {AppLoading} from "./view/app_layout"
import {CONF} from "./helper/all"


window.axios=require("axios");
window.H=CONF;



//we avoid yellow box for setting timer
YellowBox.ignoreWarnings(['Setting a timer']);


 // export default AllScreen;
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading:true
    };
  }



  componentWillMount(){
     H.initIcon(this,true)
  }




  render() {
    var state=this;
       if (state.loading) {
         return <AppLoading noBack={true}/>
       }

       return <AppScreens/>




  }
}
