import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Driver} from "../../controller/driver"
import ShowIO from "./show_io"


var driver;

let listener=null;




export default class ShowDriver extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      id:null,
      refreshing:true,
      picNum:0,
      driver:null,
    }
    H.setModel("current",this);
    driver=new Driver({model:this,container:"driver"});


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
    var picNum=H.getParam(this.props,"pic")

    driver.show(id,()=>{},()=>{H.goBack(this.props)});

    this.setState({id:id,refreshing:!this.state.refreshing});
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





    return (




          <AppLayout noBack={true}>

                  <Header style={H.style.base_headers}>
                    <Left>
                        <Thumbnail small source={H.img.drivers['driver'+state.picNum]} />
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
