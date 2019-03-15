import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Fournisseur} from "../../controller/fournisseur"
import ShowMvm from "./show_fss_mvm"

var fourn;

let listener=null;




export default class Showfourn extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      id:null,
      refreshing:true,


      fourn:null,
    }
    H.setModel("current",this);
    fourn=new Fournisseur({model:this,container:"fourn"});

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

     this.init();

  }

  init(){
    var id=H.getParam(this.props,"id")
    fourn.show(...[id,,()=>{H.goBack(this.props)}]);
  }



  render() {

    var state=this.state;
     var fourn=state.fourn;





    if (state.loading || fourn==null ) {
      return <AppLoading />
    }





    return (




          <AppLayout noBack={true}>

                  <Header style={H.style.base_headers}>
                     <Left>
                         <Icon style={{color:'white'}} name="pint" />
                     </Left>
                     <Body>
                       <Title style={H.style.title}>{fourn.maison}</Title>

                     </Body>
                     <Right>
                       <Button transparent onPress={()=>{H.goTo(this,H.path.edit_fournisseur,{id:fourn.id,init:()=>{this.init()}})}}>
                          <Text>Edit</Text>
                       </Button>
                     </Right>

                   </Header>
                   <Content padder style={H.style.content}>

                     <ScrollView>
                       <CardItem header>
                          <Text> Supply informations</Text>
                       </CardItem>
                       <List>
                         <ListItem icon>
                               <Left>
                                 <Button style={H.style.headers}>
                                   <Icon active name="home" />
                                 </Button>
                               </Left>
                               <Body>

                                 <Text>{fourn.maison}</Text>
                                 <Text note>Firm name(nom de la maison)</Text>
                               </Body>
                               <Right></Right>
                          </ListItem>

                           <ListItem icon>
                                 <Left>
                                   <Button style={H.style.headers}>
                                     <Icon active name="calendar" />
                                   </Button>
                                 </Left>
                                 <Body>

                                   <Text>{fourn.created_at}</Text>
                                   <Text note>Creation date of the supply</Text>
                                 </Body>
                                 <Right></Right>
                            </ListItem>
                          </List>

                          <CardItem header>
                             <Text> Supply mouvements</Text>
                          </CardItem>


                          <Tabs tabBarUnderlineStyle={H.style.headers}>
                                  <Tab  heading={
                                            <TabHeading style={{backgroundColor: 'white'}}>
                                              <Text style={H.style.green_color}>DETTES</Text>
                                            </TabHeading>
                                         }
                                       >

                                      <ShowMvm fourn={fourn} paid={false} {...this.props} />

                                  </Tab>

                                    <Tab  heading={
                                              <TabHeading style={{backgroundColor: 'white'}}>
                                                <Text style={H.style.green_color}>PAIEMENT</Text>
                                              </TabHeading>
                                           }
                                         >
                                         <ShowMvm fourn={fourn} paid={true} {...this.props} />


                                    </Tab>
                                </Tabs>
                      </ScrollView>

                  </Content>

            </AppLayout>


    );
  }
}
