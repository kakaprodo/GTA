import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Driver} from "../../controller/driver"
import ShowIO from "./show_io"


var driver;

let listener=null;




class ShowDriver extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      id:null,
      refreshing:true,
      picNum:0,
      driver:null,
      montant_perdieme:0,
    }
    H.setModel("current",this);
    driver=new Driver({model:this,container:"driver"});


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
    var id=H.getParam(this.props,"id")
    var picNum=H.getParam(this.props,"pic")

    driver.show(id,()=>{
        //getting the perdieme of the driver
        driver.driver_perdieme(id,(perdF)=>{
              this.setState({montant_perdieme:perdF.montant})
        });

        //getting the cars driven by this driver
        driver.car(id,(list_car)=>{

             this.state.driver.cars=list_car;
              this.setState({driver:this.state.driver})
        })

    },()=>{H.goBack(this.props)});

    this.setState({id:id});
    if (picNum!=undefined) {
        this.setState({picNum:picNum});
    }
  }

 // componentWillReceiveProps(nextProps){
 //      this.props=nextProps;
 //      this.setState({id:H.getParam(nextProps,"id")});
 //      this.init();
 // }

  render() {

    var state=this.state;
     var driver=state.driver;






    if (state.loading || driver==null ) {
      return <AppLoading />
    }

   var {cars}=driver;
   cars=cars===undefined?[]:cars;



    return (




          <AppLayout noBack={true}>

                  <Header style={H.style.base_headers}>
                    <Left>
                        <H.DivImg size={40} name={driver.names}/>
                    </Left>
                     <Body>
                       <Title style={H.style.title}>{driver.names}</Title>

                     </Body>
                      <Right>

                        <Button transparent onPress={()=>{H.goTo(this,H.path.edit_driver,{id:driver.id,init:()=>{this.init()}})}}>
                           <Text>Edit</Text>
                        </Button>
                      </Right>
                   </Header>
                   <Content padder style={H.style.content}>
                     <ScrollView>
                       <CardItem header>
                          <Text> Driver informations</Text>
                       </CardItem>
                       <List>
                         <ListItem icon>
                               <Left>
                                 <Button style={H.style.headers}>
                                   <Icon active name="person" />
                                 </Button>
                               </Left>
                               <Body>

                                 <Text>{driver.names}</Text>
                                 <Text note>Name</Text>
                               </Body>
                               <Right></Right>
                          </ListItem>
                         <ListItem icon>
                               <Left>
                                 <Button style={H.style.headers}>
                                   <Icon active name="person" />
                                 </Button>
                               </Left>
                               <Body>

                                 <Text>{driver.sex}</Text>
                                 <Text note>Sex</Text>
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

                                  <Text>Code :{driver.id}</Text>
                                  <Text note>Identification of driver</Text>
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

                                   <Text>{driver.created_at}</Text>
                                   <Text note>Creation date of the driver</Text>
                                 </Body>
                                 <Right></Right>
                            </ListItem>
                          </List>

                          <List>

                          <CardItem header>
                             <Text> List of cars driven by this driver : {cars.length}</Text>
                          </CardItem>

                            {
                              cars.map((car,index)=>{
                                return <ListItem button  key={index+'car'} icon
                                        onPress={()=>{H.goTo(this,"show_car",{id:car.id})}}
                                        >
                                          <Left>
                                            <Button style={H.style.headers}>
                                              <Icon active name="car" />
                                            </Button>
                                          </Left>
                                          <Body>

                                           <Text>{car.marque}</Text>
                                           <Text note>Plaque : {car.plaque}</Text>
                                          </Body>
                                          <Right></Right>
                                     </ListItem>
                              })
                            }
                          </List>

                          <List>

                          <CardItem header>
                             <Text> Perdiemes</Text>
                          </CardItem>

                            <ListItem icon>
                                  <Left>
                                    <Button style={H.style.headers}>
                                      <Icon active name="logo-euro" />
                                    </Button>
                                  </Left>
                                  <Body>

                                    <Text>{state.montant_perdieme} Um</Text>
                                    <Text note>Montant du mois</Text>
                                  </Body>
                                  <Right></Right>
                             </ListItem>
                          </List>

                          <CardItem header>
                             <Text> Input and Output operations</Text>
                          </CardItem>


                          <Tabs tabBarUnderlineStyle={H.style.headers}>
                                  <Tab  heading={
                                            <TabHeading style={{backgroundColor: 'white'}}>
                                              <Text style={H.style.green_color}>DEPOT</Text>
                                            </TabHeading>
                                         }
                                       >

                                       <ShowIO {...this.props} isdepot={true} driver={driver}/>
                                  </Tab>

                                    <Tab  heading={
                                              <TabHeading style={{backgroundColor: 'white'}}>
                                                <Text style={H.style.green_color}>RETRAIT</Text>
                                              </TabHeading>
                                           }
                                         >
                                         <ShowIO {...this.props} isdepot={false} driver={driver}/>
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

export default H.con(...[,mapDispatchToProps])(ShowDriver)