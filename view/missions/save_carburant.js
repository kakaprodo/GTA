import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView,BackHandler,Platform } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Carburant as Carb} from "../../controller/carburant"

var carb;

let listener=null;


export default class SaveCarb extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        quantite:"",
        kmp:"",
        mission_id:"",
        descr1:"",
        descr2:"",
        qValid:"",
        kmpValid:"",
        isExpired:false,
        mission:[],



     }

    carb=new Carb({model:this});
  }

  static navigationOptions=({navigation})=>{

     let headerTitle="Carburant";
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
          H.dateSameMonth(mission.created_at,H.now(...[,'my']),true,()=>{
                this.setState({isExpired:true})
           },false/* callback if false*/);
  }

  register(){

     carb.create((carb)=>{
        // H.goTo(this,H.path.login);
          H.resetModel(['2','3'],this);
          H.refreshPage(this.props)
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

    if (state.isExpired) {
       return <AppLayout><H.ExpiredOp date={H.format(state.mission.created_at,'my')} force={()=>{this.setState({isExpired:false})}}/></AppLayout>
    }


    return (

       <AppLayout>
         <ScrollView>
           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10,justifyContent: 'center'}}>

               <View style={{flex:40}}>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>Quantity :</Label>
                            <Input
                              value={state.quantite}
                              keyboardType="numeric"
                              onChangeText={(name)=>{H.fieldChange(this,name,"quantite","qValid")}}
                            />

                          </Item>
                          {H.invalid(this,"qValid")?<Text style={H.style.error_color}>{this.state.qValid}</Text>:<Text></Text>}
                     </View>

                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>Km parcouru :</Label>
                           <Input
                             value={state.kmp}
                             keyboardType="numeric"
                             onChangeText={(name)=>{H.fieldChange(this,name,"kmp","kmpValid")}}
                           />

                         </Item>
                         {H.invalid(this,"kmpValid")?<Text style={H.style.error_color}>{this.state.kmpValid}</Text>:<Text></Text>}
                    </View>


                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>Other descriptiion(1) :</Label>
                           <Input
                             value={state.descr1}
                             
                             onChangeText={(name)=>{H.fieldChange(this,name,"descr1")}}
                           />

                         </Item>
                        
                    </View>
                    <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>Other descriptiion(2) :</Label>
                           <Input
                             value={state.descr2}
                             
                             onChangeText={(name)=>{H.fieldChange(this,name,"descr2")}}
                           />

                         </Item>
                        
                    </View>





                        <Button style={{marginTop:10}} onPress={()=>{this.register()}} success small full rounded iconRight>
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
