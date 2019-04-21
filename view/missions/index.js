import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Switch,Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Mission} from "../../controller/mission"

var mission;

let listener=null;




export default class Allmissions extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      missions:[],
      dataOfMonth:[],
      total:0,


    }
    H.setModel("current",this);
    mission=new Mission({model:this,container:"missions"});

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

    mission.index(...[(missions)=>{
      var dataForMonth=H.getForThisMonth(missions);
      this.setState({dataOfMonth:dataForMonth});
    },,true]);
  }

  Listentr(isForMonth=true){
    var state=this.state;
    var entries=isForMonth?state.dataOfMonth:state.missions;
    entries=entries.reverse();
    var total=H.getTotal(entries,"total_maison");

    return <View>
         <List style={{marginLeft:-3}}>
           <CardItem header>
              <Text>Montant maison total : {total}</Text>
           </CardItem>
           {entries.map((item,index) => {

             return <ListItem button
                       onPress={()=>{H.goTo(this,"show_mission",{id:item.id})}}
                       avatar key={index}>
                       <Left>
                          <H.DivImg  name={"n "+item.id}/>
                       </Left>
                       <Body  >
                     <Text >Mission n° : {item.id}</Text>
                     <Text note>Total montant: {item.total_maison} Um</Text>
                     <Text note>Organisation : {item.organisation}</Text>

                   </Body>
                   <Right>
                     <Button onPress={()=>{this.delmission(item,isForMonth)}} transparent>
                         <Icon style={{fontSize: 30,color:"#b71c1c"}}  name="trash" />
                     </Button>

                   </Right>
                 </ListItem>
           })}


         </List>
      </View>
  }



  delmission(missionDel,isForMonth){
    var state=this.state;
 
      mission.destroyEl(missionDel.id,()=>{
          H.handleOnDelete(missionDel,isForMonth,'dataOfMonth','missions',this);
          
      });
  }



  render() {

    var state=this.state;
     var missions=state.missions;





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
                       <Title style={H.style.title}>All missions</Title>
                     </Body>
                     <Right>
                       <Button onPress={()=>{H.goTo(this,H.path.search,{model:mission})}} transparent>
                         <Icon name='search' />
                       </Button>
                       <Button onPress={()=>{this.init()}} transparent>
                         <Icon name='refresh' />
                       </Button>



                       <Button onPress={()=>{H.goTo(this,H.path.create_mission,{init:()=>{this.init()}})}} transparent>
                         <Text>New</Text>

                       </Button>
                     </Right>
                   </Header>
                   <Content padder style={H.style.content}>
                      <H.LoadingData data={state.missions}/>
                     <Tabs tabBarUnderlineStyle={H.style.headers}>
                         <Tab heading={
                                   <TabHeading style={{backgroundColor: 'white'}}>
                                     <Text style={H.style.green_color}>THIS MONTH</Text>
                                   </TabHeading>
                                }
                              >
                              {this.Listentr(true)}
                         </Tab>

                         <Tab heading={
                                   <TabHeading style={{backgroundColor: 'white'}}>
                                     <Text style={H.style.green_color}>ALL</Text>
                                   </TabHeading>
                                }
                              >
                              {this.Listentr(false)}
                         </Tab>

                     </Tabs>





                  </Content>

            </AppLayout>


    );
  }




}
