import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Switch} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Cars} from "../../controller/cars"

var car;

let listener=null;




class Showcar extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      id:null,
      refreshing:true,


      car:null,
    }
    H.setModel("current",this);
    car=new Cars({model:this,container:"car"});

  }

  static navigationOptions=({navigation})=>{
    //  let headerTitle="Welcome";
    //  let headerStyle=H.style.headers;
    //  let headerTitleStyle=H.style.title;
    //  headerRight=  <Button
    //     onPress={() => alert('This is a button!')}
    //     title="Info"
    //     color="#fff"
    //   />
    //
    //
    // return {headerTitle,headerStyle,headerTitleStyle,headerRight};
     let header=null;
     return {header};
  }

  componentWillMount() {
     H.initIcon(this);


     if (Platform.OS == "android" && listener == null) {
       listener = BackHandler.addEventListener("hardwareBackPress", () => {
          this.init();
       })
    }

    this.init();

  }

  init(){
    var id=H.getParam(this.props,"id")
    car.show(id,undefined,()=>{H.goBack(this.props)});
  }

 componentWillReceiveProps(nextProps){
      this.props=nextProps;
      this.setState({id:H.getParam(nextProps,"id")});
      this.init();
 }

  render() {

    var state=this.state;
     var car=state.car;





    if (state.loading || car==null ) {
      return <AppLoading />
    }





    return (




          <AppLayout noBack={true}>

                  <Header style={H.style.base_headers}>
                     <Left>
                         <Thumbnail small source={require('../../assets/img/car1.jpeg')} />
                     </Left>
                     <Body>
                       <Title style={H.style.title}>{car.marque}</Title>

                     </Body>
                     <Right>
                       <Button transparent onPress={()=>{H.goTo(this,H.path.edit_car,{id:car.id})}}>
                          <Text>Edit</Text>
                       </Button>
                     </Right>

                   </Header>
                   <Content padder style={H.style.content}>



                  </Content>

            </AppLayout>


    );
  }
}


const mapDispatchToProps=(dispatch)=>{
      return {
                setModel:function(){dispatch(H.setModel(...arguments))}
              }
}

export default H.con(...[,mapDispatchToProps])(Showcar)