import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Carburant} from "../../controller/carburant"

var carb;

let listener=null;




export default class Allcarb extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      refreshing:true,
      dataOfMonth:[],
      allcarb:[],
      dataOfMonth:[],
      total:0
    }
    H.setModel("current",this);
    carb=new Carburant({model:this,container:"allcarb"});

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

    carb.index(...[(carbs)=>{
          var dataForMonth=H.getForThisMonth(carbs);
          this.setState({dataOfMonth:dataForMonth});
    },,true]);
  }

  delcarb(carbind){
      carb.destroyEl(carbind.id,()=>{this.init()});
  }

  Listcarb(isForMonth=true){
      var state=this.state;
      var carbindanos=isForMonth?state.dataOfMonth:state.allcarb;
      var total=H.getTotal(carbindanos,"quantite");
      return (
      <View>
        <Card>
           <CardItem header style={{height: 50}}>
              <Text>Total quantite carburant: {total}</Text>
           </CardItem>
         </Card>


        <List style={{marginLeft:-3}}>
           {carbindanos.map((item,index) => {
               var opNumb=carbindanos.length-(index);

              return <Card key={index}>
                             <CardItem header style={{backgroundColor: '#ccc',height: 50}}>
                               <Text>N° {opNumb}</Text>
                               <Button onPress={()=>{this.delcarb(item)}} style={{position: 'absolute',right: 5,top:10}} danger small>
                                 <Icon name="trash" />
                               </Button>
                             </CardItem>

                              <View style={{padding:10,marginBottom:10}} >


                               <Text style={{fontSize: 13,marginBottom:5}}>Quantité :{item.quantite}</Text>
                               <Text style={{fontSize: 13,marginBottom:5}}>Km parcouru : {item.kmp} km</Text>
                                <Text onPress={()=>{H.goTo(this,H.path.show_mission,{id:item.mission_id})}} style={{fontSize: 13,paddingTop:10,paddingBottom:10}}>Sur mission n°: {H.round(item.mission_id)} </Text>
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
                       <Title style={H.style.title}>Carburants</Title>
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
                              {this.Listcarb(true)}
                         </Tab>

                         <Tab heading={
                                   <TabHeading style={{backgroundColor: 'white'}}>
                                     <Text style={H.style.green_color}>ALL</Text>
                                   </TabHeading>
                                }
                              >
                              {this.Listcarb(false)}
                         </Tab>

                     </Tabs>


                  </Content>

            </AppLayout>


    );
  }
}
