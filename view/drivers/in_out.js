import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView,BackHandler,Platform } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {IO} from "../../controller/driver_io"

var io;

let listener=null;


export default class DriverIO extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        montant:"",
        motif:"",
        is_input:"",
        driver_id:"",
        montantValid:"",
        motifValid:"",
        isiValid:"",
        driver:[]

     }

    io=new IO({model:this});
  }

  static navigationOptions=({navigation})=>{

     let headerTitle="Dépot/Retrait";
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

           var driver=H.getParam(this.props,"driver");
           var is_input=H.getParam(this.props,"depot")?1:0;

           //io.destroyAll();
           this.setState({driver_id:driver.id,driver:driver,is_input:is_input});
  }

  register(){

     io.create((io)=>{
        // H.goTo(this,H.path.login);
         H.resetModel(['2','3','4','5'],this);
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
           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10,justifyContent: 'center'}}>

               <View style={{flex:40}}>
                <Text style={[H.style.center,H.style.white_color]}>Registration of {state.is_input?"input":"output"} operation of the driver :{state.driver.names} </Text>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Motif of operation :</Label>
                            <Input

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
                        <Label style={H.style.label}>Select the operation :</Label>
                          <Item style={H.style.inputField} picker>

                            <Picker
                              mode="dropdown"
                              iosIcon={<Icon name="arrow-down" />}
                              style={{ width: undefined,color:H.globalStyle.app_color }}
                              placeholder="Mark out of 5"
                              placeholderStyle={H.style.app_color}
                              placeholderIconColor={{color:"red"}}
                              selectedValue={this.state.is_input}
                              onValueChange={(sex)=>{H.fieldChange(this,sex,"is_input","isiValid")}}
                             >
                             <Picker.Item label="Click to select" value="" />
                             <Picker.Item label="Dépot" value={1} />
                             <Picker.Item label="Retrait" value={0} />

                              </Picker>
                            </Item>
                            {H.invalid(this,"isiValid")?<Text style={H.style.error_color}>{this.state.isiValid}</Text>:<Text></Text>}
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
