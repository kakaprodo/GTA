import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Station} from "../../controller/station"

var station;

let listener=null;




class Allstations extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      refreshing:true,
      allstation:[],
      total:0
    }
    H.setModel("current",this);
    station=new Station({model:this,container:"allstation"});

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

    station.index((data)=>{
            var total=0;
           for (var i = 0; i < data.length; i++) {
                  total=total+H.getTotal(data[i].mvm,"quantite",{is_paid:0})
           }
           this.setState({total:total,allstation:data.reverse()});
    },()=>{
        this.setState({total:0,...H.msg404([])});
    });
  }

  delstation(stationin){
      station.destroyEl(stationin.id,()=>{this.init()});
  }





  render() {

    var state=this.state;
     var stations=state.stations;





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
                       <Title style={H.style.title}>All stations</Title>
                     </Body>
                     <Right>
                       <Button onPress={()=>{H.goTo(this,H.path.search,{model:station})}} transparent>
                         <Icon name='search' />
                       </Button>

                       <Button onPress={()=>{this.init()}} transparent>
                         <Icon name='refresh' />
                       </Button>

                       <Button onPress={()=>{H.goTo(this,H.path.create_station,{init:()=>{this.init()}})}} transparent>
                         <Text>New</Text>

                       </Button>
                     </Right>
                   </Header>
                   <Content  padder style={H.style.content}>
                       
                     <List style={{marginLeft:-3}}>
                          <CardItem header>
                             <Text>Total consommation :          <Text style={H.style.green_color}>{state.total}</Text></Text>
                          </CardItem>
                        {state.allstation.map((item,index) => {

                          var consommation=H.getTotal(item.mvm,'quantite',{is_paid:0});
                          var colorStyle=consommation>0?H.style.green_color:{};


                          return <ListItem button
                                    onPress={()=>{H.goTo(this,"show_station",{id:item.id})}}
                                    avatar key={index}>
                                    <Left>
                                       <H.DivImg size={40}  name={item.station_name}/>
                                    </Left>
                                    <Body  >

                                      <Text> {item.station_name}</Text>
                                      <Text note>Consommation: <Text note style={colorStyle}>{consommation}</Text> </Text>

                                    </Body>
                                    <Right>
                                      <Button onPress={()=>{this.delstation(item)}} transparent>
                                          <Icon style={{fontSize: 30,color:"#b71c1c"}}  name="trash" />
                                      </Button>

                                    </Right>
                                  </ListItem>
                        })


                      }


                      </List>
                      <H.LoadingData  msg={this.state.msg404||''} data={state.allstation}/>
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

export default H.con(...[,mapDispatchToProps])(Allstations)