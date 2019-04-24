import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Switch} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Repport} from "../../controller/repport"

var repport;

let listener=null;




 class Allrepports extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,

      refreshing:true,

      total:0,
      repports:[],
    }
    H.setModel("current",this);
    repport=new Repport({model:this,container:"repports"});

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
    repport.repportHandler("save",(data)=>{
          repport.index(...[(allRepport)=>{
                 //console.log(allRepport);
                this.setState({total:H.getTotal(allRepport,"resultat_net"),repports:allRepport})
          },()=>{this.setState(H.msg404([]))},true]);
    });

  }

  // delrepport(chauffeur){
  //     repport.destroyEl(chauffeur.id,()=>{this.init()});
  // }



  render() {

    var state=this.state;
     var repports=state.repports;





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
                       <Title style={H.style.title}>All repports</Title>
                     </Body>
                     <Right>
                       <Button onPress={()=>{H.goTo(this,H.path.search,{model:repport})}} transparent>
                         <Icon name='search' />
                       </Button>
                       <Button onPress={()=>{this.init()}} transparent>
                         <Icon name='refresh' />
                       </Button>


                     </Right>
                   </Header>
                   <Content padder style={H.style.content}>



                      
                     <List style={{marginLeft:-3}}>
                         <CardItem header>
                            <Text>Total resultat net : {state.total} Um</Text>
                         </CardItem>
                        {repports.map((item,index) => {
                          let NumImg=H.getRandomInt(1,6);
                          return <ListItem button
                                    onPress={()=>{H.goTo(this,H.path.show_repport,{repport:item})}}
                                    avatar key={index}>
                                    <Left>
                                       <Icon style={{color:H.randomColor()}} name="logo-wordpress" />
                                    </Left>
                                    <Body  >
                                      <Text>Repport of :{H.formatMonthYear(item.mois_annee)} </Text>
                                      <Text note>Resultat net :  <Text style={H.style.green_color} note>{item.resultat_net} Um</Text></Text>

                                    </Body>

                                  </ListItem>
                        })}







                      </List>
                      <H.LoadingData msg={this.state.msg404||''} data={repports}/>
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

export default H.con(...[,mapDispatchToProps])(Allrepports)