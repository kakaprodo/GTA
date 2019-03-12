import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Switch,Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Mission} from "../../controller/mission"

import ShowCarb from "./show_carb"
import ShowPerd from "./show_perd"

var mission;

let listener=null;




export default class Showmission extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      id:null,
      refreshing:true,


      mission:null,
    }
    H.setModel("current",this);
    mission=new Mission({model:this,container:"mission"});

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
    var id=H.getParam(this.props,"id")
    mission.show(id,undefined,()=>{H.goBack(this.props)});
  }

 // componentWillReceiveProps(nextProps){
 //      this.props=nextProps;
 //      this.setState({id:H.getParam(nextProps,"id")});
 //      this.init();
 // }

  render() {

    var state=this.state;
     var mission=state.mission;





    if (state.loading || mission==null ) {
      return <AppLoading />
    }





    return (




          <AppLayout noBack={true}>

                  <Header style={H.style.base_headers}>
                    <Left>
                      <Button transparent>
                        <Icon style={{color:"white"}} name='navigate' />
                      </Button>
                    </Left>
                     <Body>
                       <Title style={H.style.title}>Mission n°:{mission.id}</Title>

                     </Body>
                      <Right>
                        <Button transparent onPress={()=>{H.goTo(this,H.path.edit_mission,{id:mission.id,init:()=>{this.init()}})}}>
                           <Text>Edit</Text>
                        </Button>
                      </Right>
                   </Header>
                   <Content padder style={H.style.content}>
                     <ScrollView>

                            <CardItem header>
                               <Text>Mission information</Text>
                            </CardItem>
                            <List>
                              <ListItem icon>
                                    <Left>
                                      <Button style={H.style.headers}>
                                        <Icon active name="person" />
                                      </Button>
                                    </Left>
                                    <Body>

                                      <Text>{mission.chef_mission}</Text>
                                      <Text note>Chef de la mission</Text>
                                    </Body>
                                    <Right></Right>
                               </ListItem>

                               <ListItem icon>
                                     <Left>
                                       <Button style={H.style.headers}>
                                         <Icon active name="briefcase" />
                                       </Button>
                                     </Left>
                                     <Body>

                                       <Text>{mission.organisation}</Text>
                                       <Text note>Organisation</Text>
                                     </Body>
                                     <Right></Right>
                                </ListItem>

                                <ListItem icon>
                                      <Left>
                                        <Button style={H.style.headers}>
                                          <Icon active name="trending-up" />
                                        </Button>
                                      </Left>
                                      <Body>

                                        <Text>{mission.duree} days </Text>
                                        <Text note>Durée partant du {mission.created_at.split(" ")[0]}</Text>
                                      </Body>
                                      <Right></Right>
                                 </ListItem>



                                 <ListItem onPress={()=>{H.goTo(this,H.path.show_driver,{id:mission.driver_id})}} icon>
                                       <Left>
                                         <Button style={H.style.headers}>
                                           <Icon active name="aperture" />
                                         </Button>
                                       </Left>
                                       <Body>
                                         <Text>Driver code :{mission.driver_id}</Text>
                                         <Text note>Click to see about driver</Text>

                                         </Body>
                                       <Right>
                                           <Icon style={H.style.green_color} name="arrow-forward" />

                                       </Right>
                                  </ListItem>



                                  <ListItem onPress={()=>{H.goTo(this,H.path.show_car,{id:mission.car_id})}} icon>
                                        <Left>
                                          <Button style={H.style.headers}>
                                            <Icon active name="aperture" />
                                          </Button>
                                        </Left>
                                        <Body>
                                          <Text >Code of car :{mission.driver_id}</Text>
                                          <Text note>Click to see about car</Text>

                                          </Body>
                                          <Right>
                                              <Icon style={H.style.green_color} name="arrow-forward" />

                                          </Right>
                                   </ListItem>

                                 <ListItem icon>
                                       <Left>
                                         <Button style={H.style.headers}>
                                           <Icon active name="analytics" />
                                         </Button>
                                       </Left>
                                       <Body>

                                         <Text >{mission.terrain_visite}</Text>
                                         <Text note>Terrain visité</Text>

                                       </Body>
                                       <Right></Right>
                                  </ListItem>


                                  <ListItem icon>
                                        <Left>
                                          <Button style={H.style.headers}>
                                            <Icon active name="logo-euro" />
                                          </Button>
                                        </Left>
                                        <Body>

                                          <Text >{mission.prix_loc} UM</Text>
                                          <Text note>Prix de location</Text>

                                        </Body>
                                        <Right></Right>
                                   </ListItem>

                                   <ListItem icon>
                                         <Left>
                                           <Button style={H.style.headers}>
                                             <Icon active name="logo-euro" />
                                           </Button>
                                         </Left>
                                         <Body>

                                           <Text >{mission.montant_maison} UM</Text>
                                           <Text note>Montant maison</Text>

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

                                            <Text >{mission.created_at}</Text>
                                            <Text note>Created on </Text>

                                          </Body>
                                          <Right></Right>
                                     </ListItem>
                            </List>






                            <CardItem header>
                               <Text>Other operations of mission</Text>
                            </CardItem>

                            <Tabs tabBarUnderlineStyle={H.style.headers}>
                                    <Tab  heading={
                                              <TabHeading style={{backgroundColor: 'white'}}>
                                                <Text style={H.style.green_color}>PERDIEME</Text>
                                              </TabHeading>
                                           }
                                         >
                                         <ShowPerd {...this.props} mission={state.mission} />


                                    </Tab>

                                      <Tab  heading={
                                                <TabHeading style={{backgroundColor: 'white'}}>
                                                  <Text style={H.style.green_color}>CARBURANT</Text>
                                                </TabHeading>
                                             }
                                           >
                                           <ShowCarb {...this.props} mission={state.mission}/>

                                      </Tab>
                                  </Tabs>
                             </ScrollView>


                  </Content>

            </AppLayout>


    );
  }
}
