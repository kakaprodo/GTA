import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Mashindano} from "../../controller/machindano"

var mash;

let listener=null;




export default class Allmashindanos extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      refreshing:true,
      dataOfMonth:[],
      allMash:[],
      total:0
    }
    H.setModel("current",this);
    mash=new Mashindano({model:this,container:"allMash"});

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

    mash.index(...[(mashs)=>{
          var dataForMonth=H.getForThisMonth(mashs);
          this.setState({dataOfMonth:dataForMonth});
    },,true]);
  }

  delmashindano(mashind){
      mash.destroyEl(mashind.id,()=>{this.init()});
  }

  ListMash(isForMonth=true){
      var state=this.state;
      var mashindanos=isForMonth?state.dataOfMonth:state.allMash;
      var total=H.getTotal(mashindanos);
      return (
      <View>
        <Card>
           <CardItem header style={{height: 50}}>
              <Text>Total mashindano: {total} Um</Text>
           </CardItem>
         </Card>


        <List style={{marginLeft:-3}}>
           {mashindanos.map((item,index) => {
               var opNumb=mashindanos.length-(index);

              return <Card key={index}>
                             <CardItem header style={{backgroundColor: '#ccc',height: 50}}>
                               <Text>Operation {opNumb}</Text>
                               <Button onPress={()=>{this.delmashindano(item)}} style={{position: 'absolute',right: 5,top:10}} danger small>
                                 <Icon name="trash" />
                               </Button>
                             </CardItem>

                              <View style={{padding:10,marginBottom:10}} >


                               <Text style={{fontSize: 13,marginBottom:5}}>Bénéficiaire :{item.beneficiaire}</Text>
                               <Text style={{fontSize: 13,marginBottom:5}}>Montant : {item.montant} UM</Text>
                               <Text style={{fontSize: 13,marginBottom:5}}>Maison : {item.maison}</Text>
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
     var mashindanos=state.mashindanos;





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
                       <Title style={H.style.title}>All mashindano</Title>
                     </Body>
                     <Right>
                       <Button transparent>
                         <Icon name='search' />
                       </Button>

                       <Button onPress={()=>{H.goTo(this,H.path.create_mashindano,{init:()=>{this.init()}})}} transparent>
                         <Text>New</Text>

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
                              {this.ListMash(true)}
                         </Tab>

                         <Tab heading={
                                   <TabHeading style={{backgroundColor: 'white'}}>
                                     <Text style={H.style.green_color}>ALL</Text>
                                   </TabHeading>
                                }
                              >
                              {this.ListMash(false)}
                         </Tab>

                     </Tabs>


                  </Content>

            </AppLayout>


    );
  }
}
