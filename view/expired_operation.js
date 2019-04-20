
import React, { Component } from 'react';
import { Content,Text, Icon,Button,H2,H3} from 'native-base';
import {View} from 'react-native'

export default class ExpireOP extends Component{
	  constructor(props) {
	    super(props);
	  
	    this.state = {};
	  }

     render(){
     	  const {force,date}=this.props;
          return <View style={{padding:10}}>

                      <View style={{margin:10}}>

                        <H2 style={[H.style.center,H.style.app_color]}>{H.appLongName}</H2>

                      </View>
                      <View style={{marginTop:20}}>
                        
                          <Text style={[H.style.center,H.style.white_color,{fontSize: 13}]}>
                           Normally this operation should be done on {H.formatMonthYear(date)}, now doing it , is a mistake because the month of doing it is expired, but if you want to force it, click on this button :
                           </Text>
                          <Button
                            onPress={()=>{force()}}
                            full
                           success
                           small rounded>
                             <Text>I want to force</Text>
                             <Icon style={{fontSize: 17,...H.style.textBtn}}  name="hammer" />
                          </Button>
                        </View>

                  </View>
     }

}


