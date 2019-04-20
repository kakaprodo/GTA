import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView,BackHandler,Platform } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Entretien} from "../../controller/entretien"

var entr;

let listener=null;


export default class DriverIO extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        montant:"",
        motif:"",
        type:"",
        car_id:"",
        montantValid:"",
        motifValid:"",
        typeValid:"",
        car_idValid:"",
        car:"",

     }

    entr=new Entretien({model:this});
  }

  static navigationOptions=({navigation})=>{

     let headerTitle="Entretien";
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

           var car=H.getParam(this.props,"car");


           //io.destroyAll();
           this.setState({car_id:car.id,car:car});
  }

  register(){

     entr.create((io)=>{
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
                <Text style={[H.style.center,H.style.white_color]}>Car maintenance :{state.car.marque} </Text>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Motif de l'entretien :</Label>
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


                  <View style={{margin:10}}>
                        <Label style={H.style.label}>Select the techinician's type :</Label>
                          <Item style={H.style.inputField} picker>

                            <Picker
                              mode="dropdown"
                              iosIcon={<Icon name="arrow-down" />}
                              style={{ width: undefined,color:H.globalStyle.app_color }}
                              placeholder="Mark out of 5"
                              placeholderStyle={H.style.app_color}
                              placeholderIconColor={{color:"red"}}
                              selectedValue={this.state.type}
                              onValueChange={(sex)=>{H.fieldChange(this,sex,"type","typeValid")}}
                             >
                             <Picker.Item label="Click to select" value="" />
                             <Picker.Item label="Mechanicien" value={'Mechanicien'} />
                             <Picker.Item label="Electricien" value={'Electricien'} />
                             <Picker.Item label="Electronicien" value={'Electronicien'} />
                             <Picker.Item label="Frigogiste" value={'Frigogiste'} />
                             <Picker.Item label="Derborceleur" value={'Derborceleur'} />
                             <Picker.Item label="Maintenancier" value={'Maintenancier'} />
                             <Picker.Item label="Garnisseur" value={'Garnisseur'} />
                             <Picker.Item label="Quado" value={'Quado'} />
                             <Picker.Item label="Lavage" value={'Lavage'} />


                              </Picker>
                            </Item>
                            {H.invalid(this,"typeValid")?<Text style={H.style.error_color}>{this.state.typeValid}</Text>:<Text></Text>}
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
