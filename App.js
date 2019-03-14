import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AllScreen from "./view/container";
import {AppLoading} from "./view/app_layout"
import {CONF} from "./helper/all"


window.axios=require("axios");
window.H=CONF;




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

       return <AllScreen/>



  }
}
