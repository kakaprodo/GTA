import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Switch} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Driver} from "../../controller/driver"

var driver;

let listener=null;




class AllDrivers extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,

      refreshing:true,


      drivers:[],
    }
    H.setModel("current",this);
    driver=new Driver({model:this,container:"drivers"});

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

     if (Platform.OS == "android" && listener == null) {
       listener = BackHandler.addEventListener("hardwareBackPress", () => {
          this.init();
       })
    }



  }

  init(){

    driver.index((all)=>{
       this.setState({drivers:all.reverse()})
    },()=>{this.setState(H.msg404([])) });
  }

  delDriver(chauffeur){
      driver.destroyEl(chauffeur.id,()=>{this.init()});
  }



  render() {

    var state=this.state;
     var drivers=state.drivers;





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
                       <Title style={H.style.title}>All drivers</Title>
                     </Body>
                     <Right>
                       <Button onPress={()=>{H.goTo(this,H.path.search,{model:driver})}} transparent>
                         <Icon name='search' />
                       </Button>




                       <Button onPress={()=>{H.goTo(this,H.path.create_driver,{init:()=>{this.init()}})}} transparent>
                         <Text>New</Text>

                       </Button>
                     </Right>
                   </Header>
                   <Content padder style={H.style.content}>


                      

                     <List style={{marginLeft:-3}}>
                        {drivers.map((item,index) => {
                          let NumImg=H.getRandomInt(1,6);
                          return <ListItem button
                                    onPress={()=>{H.goTo(this,"show_driver",{id:item.id,pic:NumImg})}}
                                    avatar key={index}>
                                    <Left>
                                      <H.DivImg  name={item.names}/>
                                    </Left>
                                    <Body  >
                                      <Text>{item.names} / code :{item.id}</Text>
                                      <Text note>Created : {item.created_at}</Text>
                                    </Body>
                                    <Right>
                                      <Button onPress={()=>{this.delDriver(item)}} transparent>
                                          <Icon style={{fontSize: 30,color:"#b71c1c"}}  name="trash" />
                                      </Button>

                                    </Right>
                                  </ListItem>
                        })}







                      </List>
                      <H.LoadingData msg={this.state.msg404||''} data={drivers}/>
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

export default H.con(...[,mapDispatchToProps])(AllDrivers)