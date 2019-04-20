


import React, { Component } from 'react';
import { Content,Text, Icon,Button,H2,H3} from 'native-base';
import {View,StyleSheet} from 'react-native'


export default class DivImg extends Component{
	 
	 constructor(props) {
	   super(props);
	 
	   this.state = {};
	   this.bgColor=null;
	 }

     render(){
     	  var {name,size}=this.props;
          this.bgColor=H.randomColor();
          size=size===undefined?{}:{height:size,width:size};
          // bgColor(this.bgColor);
          return <View style={{backgroundColor:this.bgColor ,...style.div_image,...size}}>
                     <Text style={style.div_img_text}>{H.shortName(name)}</Text>
                  </View>
     }

}


var style=StyleSheet.create({
	  div_image:{
     height:50,
     width:50,
     borderTopRightRadius: 50,
     borderBottomRightRadius: 50,
     borderTopLeftRadius: 50,
     borderBottomLeftRadius: 50,
     alignItems: 'center',
     justifyContent: 'center'
	 },
	 div_img_text:{
	   color:'white',
	   fontSize:14,
	   
	 }
})


