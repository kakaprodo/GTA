import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2, Picker ,Textarea} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Mechanician} from "../../controller/mechanician"

var mec;


class Editmec extends Component {

  constructor(props){
      super(props);
      this.state={
        loading:true,
        name:"",
        nameValid:"",
        id:null,
        mec:[],
        

      }

     mec=new Mechanician({model:this});
  }

  static navigationOptions=({navigation})=>{
    
     let headerTitle="Edit Mechanician";
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
    mec.show(id,(mec)=>{
         this.setState({mec:mec});
    },()=>{H.goBack(this.props)});
   }

  editMec(){
    var id=this.state.id;
     mec.edit(id,(mec)=>{
         //H.goBack(this.props);
         H.Toast("successfully")
        H.resetModel(['2','3'],this);
        this.init();
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

           <KeyboardAvoidingView behavior='padding' style={{flex:1,padding: 10,justifyContent: 'center'}}>

               <View style={{flex:40}}>
                <Text style={[H.style.center,H.style.white_driver_id]}>Edition of {state.mec.name} : </Text>

                   <Form >
                      <View>

                           <Item style={H.style.inputField} floatingLabel>
                            <Label style={H.style.label}>name of Mechanician :</Label>
                            <Input
                               value={state.name || state.mec.name}
                              onChangeText={(name)=>{H.fieldChange(this,name,"name","nameValid")}}
                            />


                          </Item>
                          {H.invalid(this,"nameValid")?<Text style={H.style.error_color}>{this.state.nameValid}</Text>:<Text></Text>}
                         </View>



                        <Button onPress={()=>{this.editMec()}} success small full rounded iconRight>
                          <Text style={H.style.textBtn}>Edit now</Text>
                          <Icon style={{fontSize: 17,...H.style.textBtn}} name="save" />
                       </Button>

                    </Form>

                  </View>
              </KeyboardAvoidingView>


        </AppLayout>

    );
  }
}


const mapDispatchToProps=(dispatch)=>{
      return {
                setModel:function(){dispatch(H.setModel(...arguments))}
              }
}

export default H.con(...[,mapDispatchToProps])(Editmec)