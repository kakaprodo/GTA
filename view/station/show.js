import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Station} from "../../controller/station"
import ShowMvm from "./show_station_mvm"

var station;

let listener=null;




export default class ShowStation extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      id:null,
      refreshing:true,


      station:null,
    }
    H.setModel("current",this);
    station=new Station({model:this,container:"station"});

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
    station.show(id,undefined,()=>{H.goBack(this.props)});
  }



  render() {

    var state=this.state;
     var station=state.station;





    if (state.loading || station==null ) {
      return <AppLoading />
    }





    return (




          <AppLayout noBack={true}>

                  <Header style={H.style.base_headers}>
                     <Left>
                        <H.DivImg size={40}  name={station.station_name}/>
                     </Left>
                     <Body>
                       <Title style={H.style.title}>{station.station_name}</Title>

                     </Body>
                     <Right>
                       <Button transparent onPress={()=>{H.goTo(this,H.path.edit_fournisseur,{id:station.id,init:()=>{this.init()}})}}>
                          <Text>Edit</Text>
                       </Button>
                     </Right>

                   </Header>
                   <Content padder style={H.style.content}>

                     <ScrollView>
                       <CardItem header>
                          <Text> station informations</Text>
                       </CardItem>
                       <List>
                         <ListItem icon>
                               <Left>
                                 <Button style={H.style.headers}>
                                   <Icon active name="pint" />
                                 </Button>
                               </Left>
                               <Body>

                                 <Text>{station.station_name}</Text>
                                 <Text note>Statation name</Text>
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

                                   <Text>{station.created_at}</Text>
                                   <Text note>Creation date of the station</Text>
                                 </Body>
                                 <Right></Right>
                            </ListItem>
                          </List>

                          <CardItem header>
                             <Text> Station mouvements</Text>
                          </CardItem>


                          <Tabs tabBarUnderlineStyle={H.style.headers}>
                                  <Tab  heading={
                                            <TabHeading style={{backgroundColor: 'white'}}>
                                              <Text style={H.style.green_color}>CONSOMMATION</Text>
                                            </TabHeading>
                                         }
                                       >

                                      <ShowMvm station={station} paid={0} {...this.props} />

                                  </Tab>

                                    <Tab  heading={
                                              <TabHeading style={{backgroundColor: 'white'}}>
                                                <Text style={H.style.green_color}>REMBOURSEMENT</Text>
                                              </TabHeading>
                                           }
                                         >
                                         <ShowMvm station={station} paid={1} {...this.props} />


                                    </Tab>
                                </Tabs>
                      </ScrollView>

                  </Content>

            </AppLayout>


    );
  }
}
