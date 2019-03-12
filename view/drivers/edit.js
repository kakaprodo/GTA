import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Driver} from "../../controller/driver"

var driver;


export default class Editdriver extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        name:"",
        sex:"",
        nameValid:"",
        sexValid:"",
        driver:null,
        id:null,

      }

    driver=new Driver({model:this,container:'driver'});
  }

  static navigationOptions=({navigation})=>{
     let headerTitle="Editting driver";
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
    driver.show(id,(driverF)=>{
         this.setState({name:driverF.names,sex:driverF.sex});
    },()=>{H.goBack(this.props)});
   }

  editdriver(){
    var id=this.state.id;
     driver.edit(id,(driver)=>{
         //H.goBack(this.props);
        H.resetModel(['2','3'],this);
        H.refreshPage(this.props,'init');
        this.init();
        H.Toast("successfully")
     },(msg="error occured")=>{
        H.Toast(msg,'danger')

     });
  }




  render() {

    var state=this.state;
    var driver=state.driver;
    if (state.loading || driver==null) {
      return <AppLoading />
    }


    return (

       <AppLayout>

           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10,justifyContent: 'center'}}>

               <View style={{flex:40}}>
                <Text style={[H.style.center,H.style.white_color]}>Update information of driver :{driver.names} </Text>

                   <Form >
                     <View>

                          <Item style={H.style.inputField} floatingLabel>
                           <Label style={H.style.label}>Driver names :</Label>
                           <Input
                            value={state.name}
                             onChangeText={(name)=>{H.fieldChange(this,name,"name","nameValid")}}
                           />

                         </Item>
                         {H.invalid(this,"nameValid")?<Text style={H.style.error_color}>{this.state.nameValid}</Text>:<Text></Text>}
                    </View>



                     <View style={{margin:10}}>
                       <Label style={H.style.label}>Select his sex :</Label>
                         <Item style={H.style.inputField} picker>

                           <Picker
                             mode="dropdown"
                             iosIcon={<Icon name="arrow-down" />}
                             style={{ width: undefined,color:H.globalStyle.app_color }}
                             placeholder="Mark out of 5"
                             placeholderStyle={H.style.app_color}
                             placeholderIconColor={{color:"red"}}
                             selectedValue={this.state.sex}
                             onValueChange={(sex)=>{H.fieldChange(this,sex,"sex","sexValid")}}
                            >
                            <Picker.Item label="Click to select sex" value="" />
                            <Picker.Item label="M" value="M" />
                            <Picker.Item label="F" value="F" />

                             </Picker>
                           </Item>
                           {H.invalid(this,"sexValid")?<Text style={H.style.error_color}>{this.state.sexValid}</Text>:<Text></Text>}
                       </View>

                        <Button onPress={()=>{this.editdriver()}} success small full rounded iconRight>
                          <Text style={H.style.textBtn}>save change</Text>
                          <Icon style={{fontSize: 17,...H.style.textBtn}} name="save" />
                       </Button>

                    </Form>

                  </View>
              </KeyboardAvoidingView>


        </AppLayout>

    );
  }
}
