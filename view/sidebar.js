import React, { Component } from 'react';
import { Container,Title,Subtitle,Header, Content, Card, CardItem ,Image,Thumbnail,List,
         ListItem, Text, Icon, Left, Body, Right, Switch,Button} from 'native-base';
import {View,ScrollView} from "react-native"

class SideBar extends Component {
  constructor(props){

    super(props)
    this.state={
      loading:true,
      user:[],
      routes:[],
      menus:[{name:"Home",icon:"home",onPress:()=>{H.goTo(this,H.path.dashboard,null,true)}},
            {name:"Drivers",icon:"person",onPress:()=>{H.goTo(this,H.path.drivers,null,true)}},
            {name:"Cars setting",icon:"car",onPress:()=>{H.goTo(this,H.path.cars,null,true)}},
            {name:"Missions",icon:"send",onPress:()=>{H.goTo(this,H.path.missions,null,true)}},
            {name:"Carburants",icon:"train",onPress:()=>{H.goTo(this,H.path.carburants,null,true)}},
            {name:"Entretiens",icon:"shuffle",onPress:()=>{H.goTo(this,H.path.entretiens,null,true)}},
            {name:"Mashindano",icon:"nutrition",onPress:()=>{H.goTo(this,H.path.mashindanos,null,true)}},
            {name:"Perdiemes",icon:"cog",onPress:()=>{H.goTo(this,H.path.perdiemes,null,true)}},
            {name:"Fournisseurs",icon:"logo-tux",onPress:()=>{H.goTo(this,H.path.fournisseurs,null,true)}},
            {name:"Station",icon:"pint",onPress:()=>{H.goTo(this,H.path.stations,null,true)}},
            {name:"Mechanician",icon:"hammer",onPress:()=>{H.goTo(this,H.path.mechanicians,null,true)}},
            {name:"Repport",icon:"logo-wordpress",onPress:()=>{H.goTo(this,H.path.repports,null,true)}},
            {name:"Logout",icon:"log-out",onPress:()=>{this.props.logOut(this)}},


           ]
    }

    H.setModel("sidebar",this);
  }
  componentWillMount() {
     H.initIcon(this,false);

     

  }
 


  render() {

  
    var {user,isLoggedIn}=this.props;
    var menus=this.state.menus;
    if (this.state.loading || !isLoggedIn) {
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
                 <Thumbnail   source={H.img.zootopya.zoo3} />
                 <Title style={H.style.app_color}>{user.names}</Title>
                 <Subtitle style={H.style.green_color}>{user.email}</Subtitle>
              </View>

              <Thumbnail  square style={{height: 200,width:"100%",flex:1,padding:0}}
                source={H.img.back.coverSideBar} />
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

const mapStateToProps=(state)=>{
      return {
                user:state.user,
                isLoggedIn:state.isLoggedIn,
                
              }
}



const mapDispatchToProps=(dispatch)=>{
      return {
               logOut:function(){dispatch(H.logOut(...arguments))}
              }
}

export default H.con(mapStateToProps,mapDispatchToProps)(SideBar);