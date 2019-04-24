import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Repport} from "../../controller/repport"

let listener=null;




class Showrepport extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      id:null,
      refreshing:true,
      repport:null,
    }
    H.setModel("current",this);
    repport=new Repport({model:this,container:"repport"});


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
    var rep=H.getParam(this.props,"repport");
    var id=rep.id;
    this.setState({repport:rep});

     repport.repportHandler("update",()=>{

       repport.show(id,()=>{},()=>{H.goBack(this.props)});
     },rep)



    this.setState({id:id});

  }


  render() {

    var state=this.state;
     var repport=state.repport;





    if (state.loading || repport==null ) {
      return <AppLoading />
    }



     var repportFields=H.arrKeys(repport);
     var repportVal=H.arrValues(repport);

    return (




          <AppLayout noBack={true}>

                  <Header style={H.style.base_headers}>
                    <Left>
                      <Button onPress={()=>{H.openDrawer()}} transparent>
                        <Icon name='logo-wordpress' />
                      </Button>
                    </Left>
                     <Body>
                       <Title style={H.style.title}> {H.formatMonthYear(repport.mois_annee)}</Title>

                     </Body>
                      <Right>

                        <Button transparent onPress={()=>{this.init()}}>
                            <Icon name="refresh" />
                        </Button>
                      </Right>
                   </Header>
                   <Content padder style={H.style.content}>
                     <ScrollView>
                       <CardItem header>
                          <Text> Repport informations :{H.formatMonthYear(repport.mois_annee)}</Text>
                       </CardItem>
                       <List>
                         {repportFields.map((item,index) => {
                             if (item!="id" && item!="mois_annee") {

                                  var colorStyle={};
                                   if (item=='resultat_net') {colorStyle={color:'#00695c'}}
                                   if (item=='resultat_brut') {colorStyle={color:"#0277bd"}}
                                   if (item=='dime') {colorStyle={color:"#00838f"}}
                               return <ListItem key={index} icon>
                                     <Left>
                                       <Button style={H.style.headers}>
                                         <Icon active name="logo-euro" />
                                       </Button>
                                     </Left>
                                     <Body>

                                       <Text style={colorStyle}>{repportVal[index]} Um</Text>
                                       <Text note>{H.strReplace(item.toUpperCase(),"_"," ")}</Text>
                                     </Body>
                                     <Right></Right>
                                </ListItem>
                             }
                             return;

                         })

                         }

                        </List>
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

export default H.con(...[,mapDispatchToProps])(Showrepport)