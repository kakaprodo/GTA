import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Fournisseur} from "../../controller/fournisseur"

var fourn;

let listener=null;




export default class Allfourns extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      refreshing:true,
      allfourn:[],
      total:0
    }
    H.setModel("current",this);
    fourn=new Fournisseur({model:this,container:"allfourn"});

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

    fourn.index((data)=>{
            var total=0;
           for (var i = 0; i < data.length; i++) {
                  total=total+H.getTotal(data[i].mvm,"montant",{is_paid:0})
           }
           this.setState({total:total,allfourn:data.reverse()});
    },()=>{
        this.setState({total:0});
    });
  }

  delfourn(fournin){
      fourn.destroyEl(fournin.id,()=>{this.init()});
  }





  render() {

    var state=this.state;
     var fourns=state.fourns;





    if (state.loading ) {
      return <AppLoading />
    }



    var total=0;
    return (




          <AppLayout noBack={true}>

                  <Header style={H.style.base_headers}>
                     <Left>
                       <Button onPress={()=>{H.openDrawer()}} transparent>
                         <Icon name='menu' />
                       </Button>
                     </Left>
                     <Body>
                       <Title onPress={()=>{H.openDrawer()}} style={H.style.title}>All supplies</Title>
                     </Body>
                     <Right>
                       <Button onPress={()=>{H.goTo(this,H.path.search,{model:fourn})}} transparent>
                         <Icon name='search' />
                       </Button>

                       <Button onPress={()=>{this.init()}} transparent>
                         <Icon name='refresh' />
                       </Button>

                       <Button onPress={()=>{H.goTo(this,H.path.create_fournisseur,{init:()=>{this.init()}})}} transparent>
                         <Text>New</Text>

                       </Button>
                     </Right>
                   </Header>
                   <Content  padder style={H.style.content}>
                      <H.LoadingData data={state.allfourn}/>
                     <List style={{marginLeft:-3}}>
                          <CardItem header>
                             <Text>Total dettes :          <Text style={H.style.green_color}>{state.total} Um</Text></Text>
                          </CardItem>
                        {state.allfourn.map((item,index) => {

                          var dette=H.getTotal(item.mvm,'montant',{is_paid:0});
                          var colorStyle=dette>0?H.style.green_color:{};

                          return <ListItem button
                                    onPress={()=>{H.goTo(this,"show_fournisseur",{id:item.id})}}
                                    avatar key={index}>
                                    <Left>
                                       <H.DivImg  name={item.maison}/>
                                    </Left>
                                    <Body  >

                                      <Text> {item.maison}</Text>
                                      <Text note>Dette: <Text note style={colorStyle}>{dette} Um </Text></Text>

                                    </Body>
                                    <Right>
                                      <Button onPress={()=>{this.delfourn(item)}} transparent>
                                          <Icon style={{fontSize: 30,color:"#b71c1c"}}  name="trash" />
                                      </Button>

                                    </Right>
                                  </ListItem>
                        })


                      }


                      </List>
                  </Content>

            </AppLayout>


    );
  }
}
