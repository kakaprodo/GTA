import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Mechanician} from "../../controller/mechanician"

var mec;


export default class Createmec extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        name:"",
        nameValid:"",
        

      }

     mec=new Mechanician({model:this});
  }

  static navigationOptions=({navigation})=>{
     let headerTitle="New mechanician";
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

     mec.create((mec)=>{
        // H.goTo(this,H.path.login);
        H.resetModel(['2','3'],this);
        H.Toast("successfully")
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

           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10,justifyContent: 'center'}}>

               <View style={{flex:40}}>
                <Text style={[H.style.center,H.style.white_driver_id]}>Registration of a new mechanician : </Text>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>name of mechanician :</Label>
                            <Input
                               value={state.name}
                              onChangeText={(name)=>{H.fieldChange(this,name,"name","nameValid")}}
                            />


                          </Item>
                          {H.invalid(this,"nameValid")?<Text style={H.style.error_color}>{this.state.nameValid}</Text>:<Text></Text>}
                         </View>



                        <Button onPress={()=>{this.register()}} success small full rounded iconRight>
                          <Text style={H.style.textBtn}>Save</Text>
                          <Icon style={{fontSize: 17,...H.style.textBtn}} name="save" />
                       </Button>

                    </Form>

                  </View>
              </KeyboardAvoidingView>


        </AppLayout>

    );
  }
}
