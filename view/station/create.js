import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView,BackHandler,Platform } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Station} from "../../controller/station"


var station;


let listener=null;


export default class CreateStation extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        station_name:"",
        station_nameValid:"",



     }

    station=new Station({model:this});

  }

  static navigationOptions=({navigation})=>{

     let headerTitle="New station";
     let headerStyle=H.style.headers;
     let headerTitleStyle=H.style.title;
     return {headerTitle,headerStyle,headerTitleStyle};
     // let header=null;
     // return {header};
  }





  componentDidMount(){
    H.initIcon(this);


  }

register(){

     station.create((station)=>{
        // H.goTo(this,H.path.login);
            H.Toast("successfully")
           H.resetModel(['2'],this);
          H.refreshPage(this.props)

       },(msg="error occured")=>{
        H.Toast(msg,'danger')

     });
  }




  render() {

    var state=this.state;
    if (state.loading) {
      return <AppLoading />
    }


    return (

       <AppLayout>
         <ScrollView>
           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10}}>

               <View style={{flex:40}}>
                  <Text style={[H.style.center,H.style.white_color]}>Registration of a new station </Text>
                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Station name :</Label>
                            <Input
                              value={state.station_name}
                              
                              onChangeText={(name)=>{H.fieldChange(this,name,"station_name","station_nameValid")}}
                            />

                          </Item>
                          {H.invalid(this,"station_nameValid")?<Text style={H.style.error_color}>{this.state.station_nameValid}</Text>:<Text></Text>}
                     </View>

                     <Button onPress={()=>{this.register()}} success small full rounded iconRight>
                          <Text style={H.style.textBtn}>Save</Text>
                          <Icon style={{fontSize: 17,...H.style.textBtn}} name="save" />
                       </Button>

                    </Form>

                  </View>
              </KeyboardAvoidingView>
            </ScrollView>


        </AppLayout>

    );
  }
}
