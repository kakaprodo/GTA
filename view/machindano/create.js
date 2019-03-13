import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Mashindano} from "../../controller/machindano"

var mash;


export default class Createmashindano extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        beneficiaire:"",
        montant:"",
        organisation:"",
        beneficiaireValid:"",
        organisationValid:"",
        montantValid:"",

      }


    mash=new Mashindano({model:this});
  }

  static navigationOptions=({navigation})=>{
     let headerTitle="New mashindano";
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

     mash.create((mashindano)=>{
        // H.goTo(this,H.path.login);
        H.resetModel(['2','3','4'],this);

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
                <Text style={[H.style.center,H.style.white_color]}>Registration of a new mashindano : </Text>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Nom du Bénéficiaire :</Label>
                            <Input
                               value={state.beneficiaire}
                              onChangeText={(name)=>{H.fieldChange(this,name,"beneficiaire","beneficiaireValid")}}
                            />


                          </Item>
                          {H.invalid(this,"beneficiaireValid")?<Text style={H.style.error_color}>{this.state.beneficiaireValid}</Text>:<Text></Text>}
                     </View>


                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>organisation:</Label>
                           <Input
                            value={state.organisation}
                             onChangeText={(name)=>{H.fieldChange(this,name,"organisation","organisationValid")}}
                           />


                         </Item>
                         {H.invalid(this,"organisationValid")?<Text style={H.style.error_color}>{this.state.organisationValid}</Text>:<Text></Text>}
                     </View>

                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>Montant :</Label>
                           <Input
                            value={state.montant}
                            keyboardType="numeric"
                             onChangeText={(name)=>{H.fieldChange(this,name,"montant","montantValid")}}
                           />


                         </Item>
                         {H.invalid(this,"montantValid")?<Text style={H.style.error_color}>{this.state.montantValid}</Text>:<Text></Text>}
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
