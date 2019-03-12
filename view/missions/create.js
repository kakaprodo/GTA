import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Mission} from "../../controller/mission"

var mission;


export default class Createmission extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        chef_mission:"",
        organisation:"",
        duree:"",
        driver_id:"",
        car_id:"",
        terrain_visite:"",
        prix_loc:"",
        montant_maison:"",

        cmValid:"",
        orgValid:"",
        dureeValid:"",
        dValid:"",
        cValid:"",
        tvValid:"",
        plValid:"",
        mmValid:"",


      }

    mission=new Mission({model:this});
  }

  static navigationOptions=({navigation})=>{
     let headerTitle="New mission";
     let headerStyle=H.style.headers;
     let headerTitleStyle=H.style.title;
     return {headerTitle,headerStyle,headerTitleStyle};
     // let header=null;
     // return {header};
  }



  componentWillMount() {

  }

  componentDidMount(){
     H.initIcon(this);

  }

  register(){

     mission.create((mission)=>{
        // H.goTo(this,H.path.login);
        H.resetModel(['2','3','4','5','6','7','8','9'],this);
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
          <ScrollView>
           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10}}>

               <View style={{marginBottom:10}}>
                 <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Chef de la mission :</Label>
                            <Input
                              value={state.chef_mission}
                              onChangeText={(name)=>{H.fieldChange(this,name,"chef_mission","cfValid")}}
                            />

                          </Item>
                          {H.invalid(this,"cfValid")?<Text style={H.style.error_color}>{this.state.cfValid}</Text>:<Text></Text>}
                     </View>

                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>Organisation :</Label>
                           <Input

                             value={state.organisation}
                             onChangeText={(name)=>{H.fieldChange(this,name,"organisation","orgValid")}}
                           />

                         </Item>
                         {H.invalid(this,"orgValid")?<Text style={H.style.error_color}>{this.state.orgValid}</Text>:<Text></Text>}
                    </View>


                    <View>

                         <Item style={H.style.inputField} floatingLabel>
                          <Label style={H.style.label}>Duree de la mission :</Label>
                          <Input
                            keyboardType="numeric"
                            value={state.duree}
                            onChangeText={(name)=>{H.fieldChange(this,name,"duree","dureeValid")}}
                          />

                        </Item>
                        {H.invalid(this,"dureeValid")?<Text style={H.style.error_color}>{this.state.dureeValid}</Text>:<Text></Text>}
                   </View>

                   <View>

                        <Item style={H.style.inputField} floatingLabel>
                         <Label style={H.style.label}>Code du chauffeur de la mission :</Label>
                         <Input
                          keyboardType="numeric"
                           value={state.driver_id}
                           onChangeText={(name)=>{H.fieldChange(this,name,"driver_id","dValid")}}
                         />

                       </Item>
                       {H.invalid(this,"dValid")?<Text style={H.style.error_color}>{this.state.dValid}</Text>:<Text></Text>}
                  </View>

                  <View>

                       <Item style={H.style.inputField} floatingLabel>
                        <Label style={H.style.label}>Code du véhicule de la mission :</Label>
                        <Input
                          keyboardType="numeric"
                          value={state.car_id}
                          onChangeText={(name)=>{H.fieldChange(this,name,"car_id","cValid")}}
                        />

                      </Item>
                      {H.invalid(this,"cValid")?<Text style={H.style.error_color}>{this.state.cValid}</Text>:<Text></Text>}
                 </View>

                 <View>

                      <Item style={H.style.inputField} floatingLabel>
                       <Label style={H.style.label}>Terrain visité :</Label>
                       <Input
                         value={state.terrain_visite}
                         onChangeText={(name)=>{H.fieldChange(this,name,"terrain_visite","tvValid")}}
                       />

                     </Item>
                     {H.invalid(this,"plValid")?<Text style={H.style.error_color}>{this.state.plValid}</Text>:<Text></Text>}
                </View>

                 <View>

                      <Item style={H.style.inputField} floatingLabel>
                       <Label style={H.style.label}>Prix de location :</Label>
                       <Input
                         keyboardType="numeric"
                         value={state.prix_loc}
                         onChangeText={(name)=>{H.fieldChange(this,name,"prix_loc","plValid")}}
                       />

                     </Item>
                     {H.invalid(this,"plValid")?<Text style={H.style.error_color}>{this.state.plValid}</Text>:<Text></Text>}
                </View>

                <View>

                     <Item style={H.style.inputField} floatingLabel>
                      <Label style={H.style.label}>Montant maison :</Label>
                      <Input
                        keyboardType="numeric"
                        value={state.montant_maison}
                        onChangeText={(name)=>{H.fieldChange(this,name,"montant_maison","mmValid")}}
                      />

                    </Item>
                    {H.invalid(this,"mmValid")?<Text style={H.style.error_color}>{this.state.mmValid}</Text>:<Text></Text>}
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
