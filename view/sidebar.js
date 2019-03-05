import React, { Component } from 'react';
import { Container,Title,Subtitle,Header, Content, Card, CardItem ,Image,Thumbnail,List,
         ListItem, Text, Icon, Left, Body, Right, Switch,Button} from 'native-base';
import {View,ScrollView} from "react-native"

export default class SideBar extends Component {
  constructor(props){

    super(props)
    this.state={
      loading:true,
      user:[],
      routes:[],
      menus:[{name:"Drivers",icon:"person",onPress:()=>{H.goTo(H.currentM(),"drivers",null,true)}},
            {name:"Cars setting",icon:"car",onPress:()=>{H.goTo(H.currentM(),"regit",null,true)}},
            {name:"Missions",icon:"send",onPress:()=>{H.goTo(H.currentM(),"regit",null,true)}},
            {name:"Carburants",icon:"train",onPress:()=>{H.goTo(H.currentM(),"regit",null,true)}},
            {name:"Entretiens",icon:"shuffle",onPress:()=>{H.goTo(H.currentM(),"regit",null,true)}},
            {name:"Mashindano",icon:"nutrition",onPress:()=>{H.goTo(H.currentM(),"regit",null,true)}},
            {name:"Perdiemes",icon:"cog",onPress:()=>{H.goTo(H.currentM(),"regit",null,true)}},
            {name:"Fournisseurs",icon:"logo-tux",onPress:()=>{H.goTo(H.currentM(),"regit",null,true)}},
            {name:"Station",icon:"pint",onPress:()=>{H.goTo(H.currentM(),"regit",null,true)}}

           ]
    }

    H.setModel("sidebar",this);
  }
  componentWillMount() {
     H.initIcon(this,false);

  }
  render() {

    var user=this.state.user;
    var menus=this.state.menus;
    if (this.state.loading) {
      return <View></View>
    }
    return (
      <Container style={{padding: 0}}>

        <Content style={{padding:0,margin:-2,marginTop:-7}}>
          <Card style={{padding: 0}}>
            <CardItem style={{padding: 0}} cardBody>
              <View style={{position: "absolute",height:"100%",
                width:"100%",zIndex:4,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: H.globalStyle.transp_color5}}>
                 <Thumbnail   source={require('../assets/img/2.jpeg')} />
                 <Title style={H.style.app_color}>{user.names}</Title>
                 <Subtitle style={H.style.green_color}>{user.email}</Subtitle>
              </View>

              <Thumbnail  square style={{height: 200,width:"100%",flex:1,padding:0}}
                source={require('../assets/img/back/covor2.jpeg')} />
            </CardItem>

           </Card>
          <List style={{marginLeft:-3}}>
             {menus.map((item,index) => {

               return <ListItem button onPress={()=>{item.onPress()}} key={index}>
                  <Left>
                     {!H.isEmpty(item.icon)?<Icon style={H.style.sidebarIcon} name={item.icon}/>:<Text></Text>}
                    <Text>{item.name}</Text>
                  </Left>

                   <Right>
                     <Icon style={H.style.sidebarIcon} name="arrow-forward" />
                   </Right>
               </ListItem>
             })}


           </List>



        </Content>
      </Container>
    );
  }
}
