import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Switch} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Repport} from "../../controller/repport"

var repport;

let listener=null;




export default class Allrepports extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,

      refreshing:true,


      repports:[],
    }
    H.setModel("current",this);
    repport=new Repport({model:this,container:"repports"});

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

  componentDidMount() {
     H.initIcon(this);
     this.init();

   }

  init(){
    repport.repportHandler("save",(data)=>{
          console.log(data);
          repport.index();
    });

  }

  // delrepport(chauffeur){
  //     repport.destroyEl(chauffeur.id,()=>{this.init()});
  // }



  render() {

    var state=this.state;
     var repports=state.repports;





    if (state.loading ) {
      return <AppLoading />
    }





    return (




          <AppLayout noBack={true}>

                  <Header style={H.style.base_headers}>
                     <Left>
                       <Button onPress={()=>{H.openDrawer()}} transparent>
                         <Icon name='menu' />
                       </Button>
                     </Left>
                     <Body>
                       <Title style={H.style.title}>All repports</Title>
                     </Body>
                     <Right>
                       <Button transparent>
                         <Icon name='search' />
                       </Button>
                       <Button onPress={()=>{this.init()}} transparent>
                         <Icon name='refresh' />
                       </Button>


                     </Right>
                   </Header>
                   <Content padder style={H.style.content}>




                     <List style={{marginLeft:-3}}>
                        {repports.map((item,index) => {
                          let NumImg=H.getRandomInt(1,6);
                          return <ListItem button
                                    onPress={()=>{H.goTo(this,"show_repport",{id:item.id})}}
                                    avatar key={index}>
                                    <Left>
                                       <Icon style={{color:H.randomColor()}} name="logo-wordpress" />
                                    </Left>
                                    <Body  >
                                      <Text>Repport of :{item.mois_annee} </Text>
                                      <Text note>Resultat net : {item.rn}</Text>

                                    </Body>

                                  </ListItem>
                        })}







                      </List>
                  </Content>

            </AppLayout>


    );
  }
}
