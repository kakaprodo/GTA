


import React, { Component } from 'react';
import { Content,Text, Icon,Spinner} from 'native-base';
import {View,StyleSheet} from 'react-native'


export default class LoadingData extends Component{
	 
	 constructor(props) {
	   super(props);
	 
	   this.state = {};
	   
	 }

  render(){
     	  var {data,msg}=this.props;
       
         if (data==undefined) {
           return <View></View>
         }

         if (data.length===0) {
           return <View style={H.style.center}>
                       {H.isEmpty(msg)?
                         <Spinner color={H.globalStyle.green_color} />:
                         <Text style={{...H.style.center,...H.style.red_color}}>{msg}</Text>
                       }
                        
                  </View>
         }
         return <View></View>
          
     }

}




