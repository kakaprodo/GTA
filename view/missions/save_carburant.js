import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView,BackHandler,Platform } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Carburant as Carb} from "../../controller/carburant"

var carb;

let listener=null;


export default class SaveCarb extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        quantite:"",
        kmp:"",
        mission_id:"",
        qValid:"",
        kmpValid:"",



     }

    carb=new Carb({model:this});
  }

  static navigationOptions=({navigation})=>{

     let headerTitle="Carburant";
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

           var mission_id=H.getParam(this.props,"mission_id");

          this.setState({mission_id:mission_id});
  }

  register(){

     carb.create((carb)=>{
        // H.goTo(this,H.path.login);
          H.resetModel(['2','3'],this);
          H.refreshPage(this.props)
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
         <ScrollView>
           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10,justifyContent: 'center'}}>

               <View style={{flex:40}}>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Quantity :</Label>
                            <Input
                              value={state.quantite}
                              keyboardType="numeric"
                              onChangeText={(name)=>{H.fieldChange(this,name,"quantite","qValid")}}
                            />

                          </Item>
                          {H.invalid(this,"qValid")?<Text style={H.style.error_color}>{this.state.qValid}</Text>:<Text></Text>}
                     </View>

                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>Km parcouru :</Label>
                           <Input
                             value={state.kmp}
                             keyboardType="numeric"
                             onChangeText={(name)=>{H.fieldChange(this,name,"kmp","kmpValid")}}
                           />

                         </Item>
                         {H.invalid(this,"kmpValid")?<Text style={H.style.error_color}>{this.state.kmpValid}</Text>:<Text></Text>}
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
