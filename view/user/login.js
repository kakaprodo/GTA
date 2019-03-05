import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"
import {User} from "../../controller/user"

var user;

export default class Login extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,

        email:"",
        password:"",

        emailValid:"",
        passValid:"",

      }
    user=new User({model:this});

  }

  static navigationOptions=({navigation})=>{
     let headerTitle="Login form";
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

  login(){

    user.login((user)=>{
       H.goTo(this,H.path.dashboard,{user:user});
       H.Toast("successfully")
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
        <KeyboardAvoidingView  style={{flex:1,padding: 10}} behavior="padding">

            <View style={{flex:20,justifyContent: 'center'}}>

               <H2 style={[H.style.center,H.style.app_color]}>{H.appLongName}</H2>

            </View>
            <View style={{flex:40}}>
                 <Text style={[H.style.center,H.style.white_color,{fontSize: 13}]}>Identify your self then start working : </Text>

              <Form >
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

                      secureTextEntry={true}
                      onChangeText={(password) =>  H.fieldChange(this,password,"password","passValid")}
                     />

                  </Item>
                {H.invalid(this,"passValid")?<Text style={H.style.error_color}>{this.state.passValid}</Text>:<Text></Text>}
                </View>



                 <Button onPress={()=>{this.login()}} success small full rounded iconRight>
                    <Text style={H.style.textBtn}>Log in</Text>
                    <Icon style={{fontSize: 17,...H.style.textBtn}} name="send" />
                 </Button>

              </Form>


            </View>
        </KeyboardAvoidingView>
      </AppLayout>

    );
  }
}
