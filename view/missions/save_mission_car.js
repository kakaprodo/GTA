import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView,BackHandler,Platform } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {MissionCar} from "../../controller/mission_car"

var mcar;

let listener=null;


export default class Savemcar extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        car_id:"",
        mission_id:"",
        driver_id:"",
        prix_loc:"",
        montant_maison:"",

        car_idValid:"",
        driver_idValid:"",
        prix_locValid:"",
        montant_maisonValid:"",
        mission:"",



     }

    mcar=new MissionCar({model:this});
  }

  static navigationOptions=({navigation})=>{

     let headerTitle="Add car on mission";
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

           var mission=H.getParam(this.props,"mission");

          this.setState({mission_id:mission.id,mission:mission});
  }

  register(){

     mcar.create((mcar)=>{
        H.Toast("successfully")
          H.resetModel(['2','3','4','5','6'],this);
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
         <ScrollView>
           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10,justifyContent: 'center'}}>

               <View style={{flex:40}}>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>The code of car :</Label>
                            <Input
                              value={state.car_id}
                              keyboardType="numeric"
                              onChangeText={(name)=>{H.fieldChange(this,name,"car_id","car_idValid")}}
                            />

                          </Item>
                          {H.invalid(this,"car_idValid")?<Text style={H.style.error_color}>{this.state.car_idValid}</Text>:<Text></Text>}
                     </View>

                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>The code of driver of the car:</Label>
                           <Input
                             value={state.driver_id}
                             keyboardType="numeric"
                             onChangeText={(name)=>{H.fieldChange(this,name,"driver_id","driver_idValid")}}
                           />

                         </Item>
                         {H.invalid(this,"driver_idValid")?<Text style={H.style.error_color}>{this.state.driver_idValid}</Text>:<Text></Text>}
                    </View>


                    <View>

                         <Item style={H.style.inputField} floatingLabel>
                          <Label style={H.style.label}>Prix de location:</Label>
                          <Input
                            value={state.prix_loc}
                            keyboardType="numeric"
                            onChangeText={(name)=>{H.fieldChange(this,name,"prix_loc","dprix_locValid")}}
                          />

                        </Item>
                        {H.invalid(this,"prix_locValid")?<Text style={H.style.error_color}>{this.state.prix_locValid}</Text>:<Text></Text>}
                   </View>

                   <View>

                        <Item style={H.style.inputField} floatingLabel>
                         <Label style={H.style.label}>Montant maison:</Label>
                         <Input
                           value={state.montant_maison}
                           keyboardType="numeric"
                           onChangeText={(name)=>{H.fieldChange(this,name,"montant_maison","montant_maisonValid")}}
                         />

                       </Item>
                       {H.invalid(this,"montant_maisonValid")?<Text style={H.style.error_color}>{this.state.montant_maisonValid}</Text>:<Text></Text>}
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
