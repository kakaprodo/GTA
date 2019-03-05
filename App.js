import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AllScreen from "./view/container";
import {CONF} from "./helper/all"


window.axios=require("axios");
window.H=CONF;




 export default AllScreen;
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       loading:true
//     };
//   }
//
//
//
//   render() {
//     var state=this;
//
//        return <View><Text>Welcome</Text></View>
//
//
//
//   }
// }
