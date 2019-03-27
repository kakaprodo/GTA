import React, { Component } from 'react';
import { Container, Content, Form,Header,Body,Title ,Left,Right, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,KeyboardAvoidingView ,ScrollView,BackHandler} from 'react-native';
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
     // let headerTitle="Login form";
     // let headerStyle=H.style.headers;
     // let headerTitleStyle=H.style.title;
     // return {headerTitle,headerStyle,headerTitleStyle};
     let header=null;
     return {header};
  }



  componentWillMount() {
     H.initIcon(this);
  }

  componentDidMount(){
     // BackHandler.addEventListener('hardwareBackPress',()=>{
     //      var init=H.getParam(this.props,"init");
     //      if (init!=undefined) {
     //        init();
     //      }
     //
     //        console.log('ok');
     // });
  }

  login(){

    user.login((user)=>{
       H.resetModel(['2','3'],this);
       H.isLoggedIn=true;
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
        <Header style={H.style.base_headers} noLeft>

           <Body>
             <Title style={H.style.title}>Login form</Title>
           </Body>
           <Right>

             <Button onPress={()=>{H.goTo(this,H.path.backup,{source:false})}} transparent>
                 <Icon name='cloud-upload' />
               </Button>
           </Right>
         </Header>

          <Content>
              <ScrollView>
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
                                value={state.email}
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
                                value={state.password}
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

                     <View style={{height: 200}}></View>
                    </View>
                </KeyboardAvoidingView>
                </ScrollView>
            </Content>
      </AppLayout>

    );
  }
}
