/*This contains the layout of the app*/

import React from 'react';
import { StyleSheet, Text, View,ImageBackground,StatusBar  } from 'react-native';
import {Spinner} from "native-base"


// import { Platform } from "react-native";
// import Icons from "react-native-vector-icons/Ionicons";




export class AppLayout extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }



  render(){
    var props=this.props;
     if (props.noBack) {
       return <View style={H.style.noBack}>
          {this.props.children}
          <StatusBar hidden={this.props.statusbar!=undefined?this.props.statusbar:false}/>
       </View>
     }

     return ( <ImageBackground
                   source={H.img.back.app_layout}
                   imageStyle={{resizeMode: 'stretch'}}
                   style={{width: '100%', height: '100%'}}
                   >
                  <View style={H.style.app_layout}>
                     {this.props.children}
                  </View>

                  <StatusBar hidden={this.props.statusbar!=undefined?this.props.statusbar:false}/>
                 </ImageBackground>
              );
  }
}

export class AppLoading extends React.Component{

  render(){
     return <AppLayout {...this.props} >
               <View style={H.style.spinner}><Spinner color={H.globalStyle.green_color} /></View>
           </AppLayout>
  }
}
