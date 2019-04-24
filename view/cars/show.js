import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Cars} from "../../controller/cars"
import ShowEntr from "./show_entretien"

var car;

let listener=null;



class Showcar extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      id:null,
      refreshing:true,
      montant_maison:"",
      prix_loc:"",


      car:null,
    }
    
    car=new Cars({model:this,container:"car"});

  }

  static navigationOptions=({navigation})=>{
    let header=null;
     return {header};
  }

  componentWillMount() {
     H.initIcon(this);
     this.init();
    this.props.setModel("current",this);
  }

  init(){
    var id=H.getParam(this.props,"id")
    car.show(id,()=>{
        car.resetteCar(id,(recet)=>{

            this.setState(recet)
        },(recet)=>{

            this.setState(recet)
        });
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
                         <H.DivImg size={40} name={car.marque}/>
                        
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

                          <ListItem icon 
                                    button
                                    onPress={()=>{H.goTo(this,"show_driver",{id:car.driver_id})}}
                                 >
                                <Left>
                                  <Button style={H.style.headers}>
                                    <Icon active name="radio-button-off" />
                                  </Button>
                                </Left>
                                <Body>

                                  <Text style={H.style.green_color}>{car.driver_id}</Text>
                                  <Text note>Driver's code</Text>
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

                          <List>

                          <CardItem header>
                             <Text> Recette du véhicule</Text>
                          </CardItem>

                            <ListItem icon>
                                  <Left>
                                    <Button style={H.style.headers}>
                                      <Icon active name="logo-euro" />
                                    </Button>
                                  </Left>
                                  <Body>

                                    <Text>{state.montant_maison} Um</Text>
                                    <Text note>Recette du mois</Text>
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

const mapDispatchToProps=(dispatch)=>{
      return {
                setModel:function(){dispatch(H.setModel(...arguments))}
              }
}

export default H.con(...[,mapDispatchToProps])(Showcar)