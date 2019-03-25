import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView,BackHandler,Platform } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Perdieme as Perd} from "../../controller/perdieme"
import {Driver} from "../../controller/driver"

var perd;
var driver;

let listener=null;


export default class SavePerd extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        montant:"",
        mValid:"",
        diValid:"",
        mission_id:"",
        driver_id:"",
        driver:[]



     }

    perd=new Perd({model:this});
    driver=new Driver({model:this,container:'driver'});
  }

  static navigationOptions=({navigation})=>{

     let headerTitle="Save perdieme";
     let headerStyle=H.style.headers;
     let headerTitleStyle=H.style.title;
     return {headerTitle,headerStyle,headerTitleStyle};
     // let header=null;
     // return {header};
  }





  componentDidMount(){
    H.initIcon(this);
     this.init();

  }

  init(){

           var mission=H.getParam(this.props,"mission");
           var driver_id=H.getParam(this.props,"driver_id");
           this.setState({mission:mission,mission_id:mission.id,driver_id:driver_id});
           driver.show(driver_id);
  }

  register(){

     perd.create((perd)=>{
        // H.goTo(this,H.path.login);
           H.Toast("successfully")
           H.resetModel(['2'],this);
          H.initModel()

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
                  <Text style={[H.style.center,H.style.white_color]}>Registration of driver's perdieme :{state.driver.names} </Text>
                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Montant :</Label>
                            <Input
                              value={state.montant}
                              keyboardType="numeric"
                              onChangeText={(name)=>{H.fieldChange(this,name,"montant","mValid")}}
                            />

                          </Item>
                          {H.invalid(this,"mValid")?<Text style={H.style.error_color}>{this.state.mValid}</Text>:<Text></Text>}
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
