import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Station} from "../../controller/station"


var station;


export default class Editstation extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        station_name:"",
        station_nameValid:"",
        station:null,
        id:null,

      }

    station=new Station({model:this,container:'station'});
  }

  static navigationOptions=({navigation})=>{
     let headerTitle="Editting station";
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
    station.show(id,(stationF)=>{
         this.setState({station_name:stationF.station_name,station:stationF});
    },()=>{H.goBack(this.props)});
   }

  editstation(){
    var id=this.state.id;
     station.edit(id,(station)=>{
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
    var station=state.station;
    if (state.loading || station==null) {
      return <AppLoading />
    }


    return (

       <AppLayout>

           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10,justifyContent: 'center'}}>

               <View style={{flex:40}}>
                <Text style={[H.style.center,H.style.white_color]}>Update information of station :{station.station_name} </Text>

                  <Form >
                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>Station name :</Label>
                           <Input
                             value={state.station_name}

                             onChangeText={(name)=>{H.fieldChange(this,name,"station_name","station_nameValid")}}
                           />

                         </Item>
                         {H.invalid(this,"station_nameValid")?<Text style={H.style.error_color}>{this.state.station_nameValid}</Text>:<Text></Text>}
                    </View>

                    <Button onPress={()=>{this.editstation()}} success small full rounded iconRight>
                         <Text style={H.style.textBtn}>Save</Text>
                         <Icon style={{fontSize: 17,...H.style.textBtn}} name="save" />
                      </Button>

                   </Form>

                  </View>
              </KeyboardAvoidingView>


        </AppLayout>

    );
  }
}
