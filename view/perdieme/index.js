import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Perdieme} from "../../controller/perdieme"

var perd;

let listener=null;




export default class Allperd extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      refreshing:true,
      dataOfMonth:[],
      allperd:[],
      dataOfMonth:[],
      total:0
    }
    H.setModel("current",this);
    perd=new Perdieme({model:this,container:"allperd"});

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

    perd.index(...[(perds)=>{
          var dataForMonth=H.getForThisMonth(perds);
          this.setState({dataOfMonth:dataForMonth});
    },,true]);
  }

  delperd(perdind){
      perd.destroyEl(perdind.id,()=>{this.init()});
  }

  Listperd(isForMonth=true){
      var state=this.state;
      var perdindanos=isForMonth?state.dataOfMonth:state.allperd;
      var total=H.getTotal(perdindanos,"montant");
      return (
      <View>
        <Card>
           <CardItem header style={{height: 50}}>
              <Text>Total perdieme: {total} Um</Text>
           </CardItem>
         </Card>


        <List style={{marginLeft:-3}}>
           {perdindanos.map((item,index) => {
               var opNumb=perdindanos.length-(index);

              return <Card key={index}>
                             <CardItem header style={{backgroundColor: '#ccc',height: 50}}>
                               <Text>N° {opNumb}</Text>
                               <Button onPress={()=>{this.delperd(item)}} style={{position: 'absolute',right: 5,top:10}} danger small>
                                 <Icon name="trash" />
                               </Button>
                             </CardItem>

                              <View style={{padding:10,marginBottom:10}} >


                               <Text style={{fontSize: 13,marginBottom:5}}>Montant :{item.montant} Um</Text>

                                <Text onPress={()=>{H.goTo(this,H.path.show_mission,{id:item.mission_id})}} style={{fontSize: 13,paddingBottom:5,paddingTop:5,...H.style.green_color}}>Sur mission n°: {H.round(item.mission_id)} </Text>
                                <Text onPress={()=>{H.goTo(this,H.path.show_driver,{id:item.driver_id})}} style={{fontSize: 13,paddingBottom:5,paddingTop:5,...H.style.green_color}}>Driver code : {H.round(item.driver_id)} </Text>
                             <Text style={{fontSize: 13,marginBottom:5}}>Date : {item.created_at}</Text>
                             </View>
                      </Card>
           })}


       </List>
      </View>


      );
  }



  render() {

    var state=this.state;

    if (state.loading ) {
      return <AppLoading />
    }





    return (




          <AppLayout noBack={true}>

                  <Header style={H.style.base_headers}>
                     <Left>
                       <Button onPress={()=>{H.openDrawer()}} transparent>
                         <Icon name='menu' />
                       </Button>
                     </Left>
                     <Body>
                       <Title style={H.style.title}>Perdiemes</Title>
                     </Body>
                     <Right>
                       <Button onPress={()=>{this.init()}} transparent>
                         <Icon name='refresh' />
                       </Button>


                     </Right>
                   </Header>
                   <Content  padder style={H.style.content}>

                     <Tabs tabBarUnderlineStyle={H.style.headers}>
                         <Tab heading={
                                   <TabHeading style={{backgroundColor: 'white'}}>
                                     <Text style={H.style.green_color}>THIS MONTH</Text>
                                   </TabHeading>
                                }
                              >
                              {this.Listperd(true)}
                         </Tab>

                         <Tab heading={
                                   <TabHeading style={{backgroundColor: 'white'}}>
                                     <Text style={H.style.green_color}>ALL</Text>
                                   </TabHeading>
                                }
                              >
                              {this.Listperd(false)}
                         </Tab>

                     </Tabs>


                  </Content>

            </AppLayout>


    );
  }
}
