import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Driver} from "../../controller/driver"

var driver;


export default class CreateDriver extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        name:"",
        sex:"",
        nameValid:"",
        sexValid:"",


      }

    driver=new Driver({model:this});
  }

  static navigationOptions=({navigation})=>{
     let headerTitle="New driver";
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

     driver.create((driver)=>{
        // H.goTo(this,H.path.login);
        H.resetModel(['2','3'],this);
        H.refreshPage(this.props);
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

           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10,justifyContent: 'center'}}>
               <View style={{flex:20,justifyContent: 'center'}}>

                  <H2 style={[H.style.center,H.style.app_color]}>{H.appLongName}</H2>

               </View>
               <View style={{flex:40}}>
                <Text style={[H.style.center,H.style.white_color,{fontSize: 13}]}>Registration of a new driver : </Text>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Driver names :</Label>
                            <Input
                              value={state.name}
                              onChangeText={(name)=>{H.fieldChange(this,name,"name","nameValid")}}
                            />

                          </Item>
                          {H.invalid(this,"nameValid")?<Text style={H.style.error_color}>{this.state.nameValid}</Text>:<Text></Text>}
                     </View>



                      <View style={{margin:10}}>
                        <Label style={H.style.label}>Select his sex :</Label>
                          <Item style={H.style.inputField} picker>

                            <Picker
                              mode="dropdown"
                              iosIcon={<Icon name="arrow-down" />}
                              style={{ width: undefined,color:H.globalStyle.app_color }}
                              placeholder="Mark out of 5"
                              placeholderStyle={H.style.app_color}
                              placeholderIconColor={{color:"red"}}
                              selectedValue={this.state.sex}
                              onValueChange={(sex)=>{H.fieldChange(this,sex,"sex","sexValid")}}
                             >
                             <Picker.Item label="Click to select sex" value="" />
                             <Picker.Item label="M" value="M" />
                             <Picker.Item label="F" value="F" />

                              </Picker>
                            </Item>
                            {H.invalid(this,"sexValid")?<Text style={H.style.error_color}>{this.state.sexValid}</Text>:<Text></Text>}
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
