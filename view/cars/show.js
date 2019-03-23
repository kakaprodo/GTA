import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Cars} from "../../controller/cars"
import ShowEntr from "./show_entretien"

var car;

let listener=null;




export default class Showcar extends Component {
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
     this.init();

  }

  init(){
    var id=H.getParam(this.props,"id")
    car.show(id,()=>{
        car.resetteCar(id);
    },()=>{H.goBack(this.props)});
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
                       <Button transparent onPress={()=>{H.goTo(this,H.path.edit_car,{id:car.id,init:()=>{this.init()}})}}>
                          <Text>Edit</Text>
                       </Button>
                     </Right>

                   </Header>
                   <Content padder style={H.style.content}>

                     <ScrollView>
                       <CardItem header>
                          <Text> Car informations</Text>
                       </CardItem>
                       <List>
                         <ListItem icon>
                               <Left>
                                 <Button style={H.style.headers}>
                                   <Icon active name="car" />
                                 </Button>
                               </Left>
                               <Body>

                                 <Text>{car.marque}</Text>
                                 <Text note>Marque</Text>
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

                                 <Text>{car.plaque}</Text>
                                 <Text note>Plaque</Text>
                               </Body>
                               <Right></Right>
                          </ListItem>

                          <ListItem icon>
                                <Left>
                                  <Button style={H.style.headers}>
                                    <Icon active name="color-fill" />
                                  </Button>
                                </Left>
                                <Body>

                                  <Text>{car.color}</Text>
                                  <Text note>Color</Text>
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

                                   <Text>{car.created_at}</Text>
                                   <Text note>Creation date of the car</Text>
                                 </Body>
                                 <Right></Right>
                            </ListItem>
                          </List>

                          <CardItem header>
                             <Text> Entretiens du véhicule</Text>
                          </CardItem>


                          <Tabs tabBarUnderlineStyle={H.style.headers}>
                                  <Tab  heading={
                                            <TabHeading style={{backgroundColor: 'white'}}>
                                              <Text style={H.style.green_color}>THIS MONTH</Text>
                                            </TabHeading>
                                         }
                                       >
                                       <ShowEntr {...this.props} car={car} forMonth={true} />


                                  </Tab>

                                    <Tab  heading={
                                              <TabHeading style={{backgroundColor: 'white'}}>
                                                <Text style={H.style.green_color}>ALL</Text>
                                              </TabHeading>
                                           }
                                         >
                                         <ShowEntr {...this.props} car={car} forMonth={false} />

                                    </Tab>
                                </Tabs>
                      </ScrollView>

                  </Content>

            </AppLayout>


    );
  }
}
