import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView,BackHandler,Platform } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Entretien} from "../../controller/entretien"
import {Mechanician} from "../../controller/mechanician"

var entr;
var mec;

let listener=null;


export default class DriverIO extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        montant:"",
        motif:"",
        mechanician_id:"",
        car_id:"",
        montantValid:"",
        motifValid:"",
        mechanician_idValid:"",
        car_idValid:"",
        allMecs:[],
        car:"",

     }

    entr=new Entretien({model:this});
    mec=new Mechanician({model:this,container:'allMecs'});
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
           //we take all mechanicial
           mec.index();
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
                        <Label style={H.style.label}>Select the mechanician :</Label>
                          <Item style={H.style.inputField} picker>

                            <Picker
                              mode="dropdown"
                              iosIcon={<Icon name="arrow-down" />}
                              style={{ width: undefined,color:H.globalStyle.app_color }}
                              placeholder="Mark out of 5"
                              placeholderStyle={H.style.app_color}
                              placeholderIconColor={{color:"red"}}
                              selectedValue={this.state.mechanician_id}
                              onValueChange={(sex)=>{H.fieldChange(this,sex,"mechanician_id","mechanician_idValid")}}
                             >
                             <Picker.Item label="Click to select" value="" />
                             
                             { 
                              state.allMecs.map((mec,index)=>{
                                 return <Picker.Item key={'mec'+index} label={mec.name} value={mec.id} />
                               })
                              }

                              </Picker>
                            </Item>
                            {H.invalid(this,"mechanician_idValid")?<Text style={H.style.error_color}>{this.state.mechanician_idValid}</Text>:<Text></Text>}
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

