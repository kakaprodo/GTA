import React, { Component } from 'react';
import { Header,Container, Content, Form,ActionSheet, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title, Picker ,Textarea,Left,Right} from 'native-base';

import { StyleSheet, View,ScrollView,KeyboardAvoidingView } from 'react-native';

import {AppLayout,AppLoading} from "./app_layout"


import {Repport} from "../controller/repport"//

var repport=new Repport();//



class Dashboard extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      user:null,
    }

     this.drawer=null;
  }

  static navigationOptions=({navigation})=>{
    
     let header=null;
     return {header};
  }
  init(){
     var {user,isLoggedIn}=this.props;
    
     if (!isLoggedIn) {
        return  this.props.logOut(this);
      }
     this.setState({user:user})
  }

  componentWillMount() {

    this.init();

    H.initIcon(this);
    
    //we will be saving new repport if it doesnt exist automatically when user reach this table
    repport.repportHandler("save");

    


  }






  render() {

    var state=this.state;
    var user=state.user;
    if (state.loading || user==null) {
      return <AppLoading />
    }

   var optionBtn=[{text:"Change my account",icon: "person", iconColor: H.globalStyle.green_color},
                   {text:"Backup",icon:"cloud-upload",iconColor: H.globalStyle.green_color},
                   {text:"Logout",icon:"log-out",iconColor: H.globalStyle.green_color}];

    return (




          <AppLayout>

                  <Header style={H.style.base_headers}>
                     <Left>
                       <Button onPress={()=>{H.openDrawer()}} transparent>
                         <Icon name='menu' />
                       </Button>
                     </Left>
                     <Body>
                       <Title style={H.style.title}>Welcome</Title>
                     </Body>
                     <Right>

                       <Button
                           onPress={() =>{
                             
                               ActionSheet.show(
                                 {
                                   options: optionBtn,
                                   cancelButtonIndex: 3,
                                   destructiveButtonIndex: 2,
                                   title: "General setting"
                                 },
                                 buttonIndex => {

                                    switch (buttonIndex) {
                                      case 0:
                                            H.goTo(this,H.path.regit)
                                        break;
                                      case 1:
                                          H.goTo(this,H.path.backup,{source:true})

                                        break;
                                    case 2:
                                        this.props.logOut(this);
                                     break;
                                     default:return;

                                    }
                                 }
                               )

                             
                           }}

                           transparent>
                             <Icon name='more' />
                         </Button>
                     </Right>
                   </Header>
                   <Content padder style={H.style.content}>

                      <View style={{margin:10}}>

                        <H2 style={[H.style.center,H.style.app_color]}>{H.appLongName}</H2>

                      </View>
                      <View style={{marginTop:20}}>
                         <H3 style={[H.style.center,H.style.app_color]}>Welcome {user.names}</H3>
                          <Text style={[H.style.center,H.style.white_color,{fontSize: 13}]}>You can do now your activities by clicking on the list menu or </Text>
                          <Button
                            full
                           success
                           onPress={()=>{H.openDrawer()}}
                            small rounded>
                             <Text>Start now </Text>
                             <Icon style={{fontSize: 17,...H.style.textBtn}}  name="menu" />
                          </Button>
                        </View>

                  </Content>
            </AppLayout>

    );
  }
}

const mapStateToProps=(state)=>{
      return {
                user:state.user,
                isLoggedIn:state.isLoggedIn,
                info_page:state.info_page
              }
}



const mapDispatchToProps=(dispatch)=>{
      return {
                setModel:function(){dispatch(H.setModel(...arguments))},
                logOut:function(){dispatch(H.logOut(...arguments))}
              }
}

export default H.con(mapStateToProps,mapDispatchToProps)(Dashboard);