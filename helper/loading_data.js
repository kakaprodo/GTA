


import React, { Component } from 'react';
import { Content,Text, Icon,Spinner} from 'native-base';
import {View,StyleSheet} from 'react-native'


export default class LoadingData extends Component{
	 
	 constructor(props) {
	   super(props);
	 
	   this.state = {};
	   
	 }

  render(){
     	  var {data}=this.props;
       
         if (data==undefined) {
           return <View></View>
         }

         if (data.length===0) {
           return <View style={H.style.center}><Spinner color={H.globalStyle.green_color} /></View>
         }
         return <View></View>
          
     }

}




