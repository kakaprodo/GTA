import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView,BackHandler,Platform } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {FournMvm} from "../../controller/fss_mvm"

var mvm;

let listener=null;


export default class SaveFourn extends Component {

  constructor(props){
      super(props);

      this.state={
        loading:true,
        motif:"",
        montant:"",
        is_paid:"",
        fss_id:"",
        motifValid:"",
        montantValid:"",
        is_paidValid:"",
        fss_idValid:"",
        fourn:"",

     }

    mvm=new FournMvm({model:this});
  }

  static navigationOptions=({navigation})=>{

     let headerTitle="supply mouvement";
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

           var fourn=H.getParam(this.props,"fourn");
           var isPaid=H.getParam(this.props,"is_paid");
           
           //io.destroyAll();
           this.setState({fss_id:fourn.id,fourn:fourn,is_paid:isPaid?1:0});
  }

  register(){

     mvm.create((io)=>{
        // H.goTo(this,H.path.login);
          H.Toast("successfully")
          H.resetModel(['2','3','4','5'],this);
          H.refreshPage(this.props);

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
                <Text style={[H.style.center,H.style.white_color]}>Debt Registration in the firm :{state.fourn.maison} </Text>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Motif :</Label>
                            <Input
                              value={state.motif}
                              onChangeText={(name)=>{H.fieldChange(this,name,"motif","motifValid")}}
                            />

                          </Item>
                          {H.invalid(this,"motifValid")?<Text style={H.style.error_color}>{this.state.motifValid}</Text>:<Text></Text>}
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
            </ScrollView>


        </AppLayout>

    );
  }
}
