import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  mecd, mecdItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Mechanician} from "../../controller/mechanician"

var mec;



export default class Showmec extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      id:null,
      refreshing:true,
      montant_maison:"",
      prix_loc:"",


      mec:null,
    }
    H.setModel("current",this);
    mec=new Mechanician({model:this,container:"mec"});

  }

  static navigationOptions=({navigation})=>{
     let header=null;
     return {header};
  }

  componentWillMount() {
     H.initIcon(this);
     this.init();

  }

  init(){
    var id=H.getParam(this.props,"id")
    mec.show(id,()=>{},()=>{H.goBack(this.props)});
  }



  render() {

    var state=this.state;
     var mec=state.mec;





    if (state.loading || mec==null ) {
      return <AppLoading />
    }





    return (




          <AppLayout noBack={true}>

                  <Header style={H.style.base_headers}>
                     <Left>
                         <H.DivImg size={40} name={mec.name}/>
                        
                     </Left>
                     <Body>
                       <Title style={H.style.title}>{mec.name}</Title>

                     </Body>
                     <Right>
                       <Button transparent onPress={()=>{H.goTo(this,H.path.edit_mechanician,{id:mec.id,init:()=>{this.init()}})}}>
                          <Text>Edit</Text>
                       </Button>
                     </Right>

                   </Header>
                   <Content padder style={H.style.content}>

                     <ScrollView>
                       <mecdItem header>
                          <Text> mechanician's informations</Text>
                       </mecdItem>
                       <List>
                         <ListItem icon>
                               <Left>
                                 <Button style={H.style.headers}>
                                   <Icon active name="hammer" />
                                 </Button>
                               </Left>
                               <Body>

                                 <Text>{mec.name}</Text>
                                 <Text note>Name</Text>
                               </Body>
                               <Right></Right>
                          </ListItem>
                         <ListItem icon>
                               <Left>
                                 <Button style={H.style.headers}>
                                   <Icon active name="key" />
                                 </Button>
                               </Left>
                               <Body>

                                 <Text>{0}</Text>
                                 <Text note>Monthly maintenance amount</Text>
                               </Body>
                               <Right></Right>
                          </ListItem>

                          <ListItem icon 
                                   
                                 >
                                <Left>
                                  <Button style={H.style.headers}>
                                    <Icon active name="radio-button-off" />
                                  </Button>
                                </Left>
                                <Body>

                                  <Text>{0}</Text>
                                  <Text note>Total maintenance amount</Text>
                                </Body>
                                <Right></Right>
                           </ListItem>

                           <ListItem icon 
                                    
                                 >
                                <Left>
                                  <Button style={H.style.headers}>
                                    <Icon active name="radio-button-off" />
                                  </Button>
                                </Left>
                                <Body>

                                  <Text >{mec.created_at}</Text>
                                  <Text note>He exist since</Text>
                                </Body>
                                <Right></Right>
                           </ListItem>

                          </List>
                      </ScrollView>

                  </Content>

            </AppLayout>


    );
  }
}
