import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {User} from "../../controller/user"

var user;


export default class Regit extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        name:"",
        email:"",
        password:"",
        nameValid:"",
        emailValid:"",
        passValid:"",

      }

    user=new User({model:this});
  }

  static navigationOptions=({navigation})=>{
     let headerTitle="Update user";
     let headerStyle=H.style.headers;
     let headerTitleStyle=H.style.title;
     return {headerTitle,headerStyle,headerTitleStyle};
     // let header=null;
     // return {header};
  }



  componentWillMount() {
     H.initIcon(this);
  }

  componentDidMount(){

  }

  register(){

     user.create((user)=>{
        H.Toast("successfully")
        H.resetModel(['2','3','4'],this);
        H.goTo(this,H.path.login);

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
           <KeyboardAvoidingView behavior='padding' style={{padding: 10}} >
                 <View >
                   <H2 style={[H.style.center,H.style.app_color]}>{H.appLongName}</H2>
                  <Text style={[H.style.center,H.style.white_color,{fontSize: 13}]}>Register your identity then access to the system with freedom</Text>
                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Names :</Label>
                            <Input

                              onChangeText={(name)=>{H.fieldChange(this,name,"name","nameValid")}}
                            />

                          </Item>
                          {H.invalid(this,"nameValid")?<Text style={H.style.error_color}>{this.state.nameValid}</Text>:<Text></Text>}
                     </View>




                      <View>

                          <Item style={H.style.inputField}  floatingLabel>
                            <Label style={H.style.label}>Email :</Label>
                            <Input

                              keyboardType="email-address"
                              onChangeText={(email) => H.fieldChange(this,email,"email","emailValid")}
                             />

                          </Item>
                          {H.invalid(this,"emailValid")?<Text style={H.style.error_color}>{this.state.emailValid}</Text>:<Text></Text>}
                      </View>



                      <View>

                        <Item style={H.style.inputField} floatingLabel>
                          <Label style={H.style.label}>Password :</Label>
                          <Input
                            autoComplete={false}
                            onChangeText={(password) =>  H.fieldChange(this,password,"password","passValid")}
                           />

                        </Item>
                      {H.invalid(this,"passValid")?<Text style={H.style.error_color}>{this.state.passValid}</Text>:<Text></Text>}
                      </View>



                       <Button onPress={()=>{this.register()}} success small full rounded iconRight>
                          <Text style={H.style.textBtn}>Save</Text>
                          <Icon style={{fontSize: 17,...H.style.textBtn}} name="save" />
                       </Button>

                    </Form>
                    <View style={{height: 300}}></View>

                  </View>

              </KeyboardAvoidingView>
            </ScrollView>

        </AppLayout>

    );
  }
}
