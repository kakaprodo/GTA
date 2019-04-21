import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Switch} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Mechanician} from "../../controller/mechanician"

var mec;

let listener=null;




export default class AllMech extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      refreshing:true,
      mecs:[],
    }
    H.setModel("current",this);
    mec=new Mechanician({model:this,container:"mecs"});

  }

  static navigationOptions=({navigation})=>{
     let header=null;
     return {header};
  }

  componentDidMount() {
     H.initIcon(this);
     this.init();

  }

  init(){

    mec.index((all)=>{
      this.setState({mecs:all.reverse()})
    });
  }

  delmec(mecTodel){
      mec.destroyEl(mecTodel.id,()=>{this.init()});
  }



  render() {

    var state=this.state;
     var mecs=state.mecs;





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
                       <Title style={H.style.title}>All mechanicians</Title>
                     </Body>
                     <Right>
                       <Button onPress={()=>{H.goTo(this,H.path.search,{model:mec})}} transparent>
                         <Icon name='search' />
                       </Button>

                       


                       <Button onPress={()=>{H.goTo(this,H.path.create_mechanician,{init:()=>{this.init()}})}} transparent>
                         <Text>New</Text>

                       </Button>
                     </Right>
                   </Header>
                   <Content  style={H.style.content}>



                     <H.LoadingData data={state.mecs}/>
                     <List style={{marginLeft:-3}}>
                        {mecs.map((item,index) => {
                           
                           
                          return <ListItem button
                                    onPress={()=>{H.goTo(this,"show_mechanician",{id:item.id})}}
                                    avatar key={index}>
                                    <Left>
                                       <H.DivImg  name={item.name}/>
                                    </Left>
                                    <Body  >
                                    
                                      <Text>{item.name}</Text>
                                      <Text note>Created on: {item.created_at}</Text>
                                    </Body>
                                    <Right>
                                      <Button onPress={()=>{this.delmec(item)}} transparent>
                                          <Icon style={{fontSize: 30,color:"#b71c1c"}}  name="trash" />
                                      </Button>

                                    </Right>
                                  </ListItem>
                        })}


                    </List>
                  </Content>

            </AppLayout>


    );
  }
}
