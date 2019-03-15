import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView,BackHandler,Platform } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {StationMvm} from "../../controller/station_mvm"

var mvm;

let listener=null;


export default class SaveSt extends Component {

  constructor(props){
      super(props);

      this.state={
        loading:true,
        beneficaire:"",
        quantite:"",
        is_paid:"",
        station_id:"",
        car_id:"",
        beneficaireValid:"",
        quantiteValid:"",
        is_paidValid:"",
        station_idValid:"",
        car_idValid:"",
        station:"",

     }

    mvm=new StationMvm({model:this});
  }

  static navigationOptions=({navigation})=>{

     let headerTitle="Station mouvement";
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

           var station=H.getParam(this.props,"station");
           var isPaid=H.getParam(this.props,"is_paid");

           //io.destroyAll();
           this.setState({station_id:station.id,station:station,is_paid:isPaid?1:0});
  }

  register(){

     mvm.create((io)=>{
        // H.goTo(this,H.path.login);
          H.Toast("successfully")
          H.resetModel(['2','3','6'],this);
          H.refreshPage(...[this.props,,true]);

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
                <Text style={[H.style.center,H.style.white_color]}>Station mouvements :{state.station.station_name} </Text>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Beneficaire :</Label>
                            <Input
                              value={state.beneficaire}
                              onChangeText={(name)=>{H.fieldChange(this,name,"beneficaire","beneficaireValid")}}
                            />

                          </Item>
                          {H.invalid(this,"beneficaireValid")?<Text style={H.style.error_color}>{this.state.beneficaireValid}</Text>:<Text></Text>}
                     </View>

                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>Quantity :</Label>
                           <Input
                             value={state.quantite}
                             keyboardType="numeric"
                             onChangeText={(name)=>{H.fieldChange(this,name,"quantite","quantiteValid")}}
                           />

                         </Item>
                         {H.invalid(this,"quantiteValid")?<Text style={H.style.error_color}>{this.state.quantiteValid}</Text>:<Text></Text>}
                    </View>

                    <View>

                         <Item style={H.style.inputField} floatingLabel>
                          <Label style={H.style.label}>Code du véhicule :</Label>
                          <Input
                            value={state.car_id}
                            keyboardType="numeric"
                            onChangeText={(name)=>{H.fieldChange(this,name,"car_id","car_idValid")}}
                          />

                        </Item>
                        {H.invalid(this,"car_idValid")?<Text style={H.style.error_color}>{this.state.car_idValid}</Text>:<Text></Text>}
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
