import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Cars} from "../../controller/cars"

var car;


export default class EditCar extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        plaque:"",
        marque:"",
        color:"",
        plaqueValid:"",
        marqueValid:"",
        colorValid:"",
        car:null,
        id:null,

      }

    car=new Cars({model:this,container:'car'});
  }

  static navigationOptions=({navigation})=>{
     let headerTitle="Editting car";
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
    car.show(id,(carF)=>{
         this.setState({plaque:carF.plaque,marque:carF.marque,color:carF.color});
    },()=>{H.goBack(this.props)});
   }

  editCar(){
    var id=this.state.id;
     car.edit(id,(car)=>{
         //H.goBack(this.props);
        H.resetModel(['2','3','4'],this);
        this.init();
        H.Toast("successfully")
     },(msg="error occured")=>{
        H.Toast(msg,'danger')

     });
  }




  render() {

    var state=this.state;
    var car=state.car;
    if (state.loading || car==null) {
      return <AppLoading />
    }


    return (

       <AppLayout>

           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10,justifyContent: 'center'}}>

               <View style={{flex:40}}>
                <Text style={[H.style.center,H.style.white_color]}>Update information of car :{car.marque} </Text>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Marque of car :</Label>
                            <Input
                             value={state.marque}
                              onChangeText={(marque)=>{H.fieldChange(this,marque,"marque","marqueValid")}}
                            />


                          </Item>
                          {H.invalid(this,"marqueValid")?<Text style={H.style.error_color}>{this.state.marqueValid}</Text>:<Text></Text>}
                     </View>


                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>Plaque of car :</Label>
                           <Input
                            value={state.plaque}
                             onChangeText={(plaque)=>{H.fieldChange(this,plaque,"plaque","plaqueValid")}}
                           />


                         </Item>
                         {H.invalid(this,"plaqueValid")?<Text style={H.style.error_color}>{this.state.plaqueValid}</Text>:<Text></Text>}
                     </View>

                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>Color of car :</Label>
                           <Input
                             value={state.color}
                             onChangeText={(name)=>{H.fieldChange(this,name,"color","colorValid")}}
                           />


                         </Item>
                         {H.invalid(this,"colorValid")?<Text style={H.style.error_color}>{this.state.colorValid}</Text>:<Text></Text>}
                    </View>


                        <Button onPress={()=>{this.editCar()}} success small full rounded iconRight>
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
