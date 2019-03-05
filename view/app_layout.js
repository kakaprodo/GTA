/*This contains the layout of the app*/

import React from 'react';
import { StyleSheet, Text, View,ImageBackground,StatusBar  } from 'react-native';
import {Spinner} from "native-base"




export class AppLayout extends React.Component{
  constructor(props) {
    super(props);
    this.state={

    }
  }



  render(){

     return ( <ImageBackground
                   source={require('../assets/img/back/whatsap.jpeg')}
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
     return <AppLayout >
               <View style={H.style.spinner}><Spinner color={H.globalStyle.green_color} /></View>
           </AppLayout>
  }
}

export class KeyBoardHandler extends React.Component{

  render(){
     return <AppLayout >
               <View style={H.style.spinner}><Spinner color={H.globalStyle.green_color} /></View>
           </AppLayout>
  }
}
