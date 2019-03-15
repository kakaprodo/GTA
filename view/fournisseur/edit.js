import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Fournisseur} from "../../controller/fournisseur"


var fourn;


export default class Editfourn extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        maison:"",
        maisonValid:"",
        fourn:null,
        id:null,

      }

    fourn=new Fournisseur({model:this,container:'fourn'});
  }

  static navigationOptions=({navigation})=>{
     let headerTitle="Editting supply";
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
   this.init();
  }

  init(){
    var id=H.getParam(this.props,"id");
    this.setState({id:id});
    fourn.show(id,(fournF)=>{
         this.setState({maison:fournF.maison,fourn:fournF});
    },()=>{H.goBack(this.props)});
   }

  editfourn(){
    var id=this.state.id;
     fourn.edit(id,(fourn)=>{
         //H.goBack(this.props);
         H.Toast("successfully")
        H.resetModel(['2'],this);
        H.refreshPage(this.props,'init');
        this.init();

     },(msg="error occured")=>{
        H.Toast(msg,'danger')

     });
  }




  render() {

    var state=this.state;
    var fourn=state.fourn;
    if (state.loading || fourn==null) {
      return <AppLoading />
    }


    return (

       <AppLayout>

           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10,justifyContent: 'center'}}>

               <View style={{flex:40}}>
                <Text style={[H.style.center,H.style.white_color]}>Update information of the firm :{fourn.maison} </Text>

                  <Form >
                    <View>

                         <Item style={H.style.inputField} floatingLabel>
                          <Label style={H.style.label}>Nom de la maison(firm) :</Label>
                          <Input
                            value={state.maison}

                            onChangeText={(name)=>{H.fieldChange(this,name,"maison","maisonValid")}}
                          />

                        </Item>
                        {H.invalid(this,"maisonValid")?<Text style={H.style.error_color}>{this.state.maisonValid}</Text>:<Text></Text>}
                   </View>
                    <Button onPress={()=>{this.editfourn()}} success small full rounded iconRight>
                         <Text style={H.style.textBtn}>Save change</Text>
                         <Icon style={{fontSize: 17,...H.style.textBtn}} name="save" />
                      </Button>

                   </Form>

                  </View>
              </KeyboardAvoidingView>


        </AppLayout>

    );
  }
}
