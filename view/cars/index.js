import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Spiner} from 'native-base';
import {connect} from 'react-redux';
import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Cars} from "../../controller/cars"

var car;

let listener=null;




class Allcars extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,

      refreshing:true,


      cars:[],
    }
    
    car=new Cars({model:this,container:"cars"});

  }

  static navigationOptions=({navigation})=>{
   let header=null;
     return {header};
  }

  componentDidMount() {
     H.initIcon(this);
     this.init();
     this.props.setModel("current",this);

  }

  init(){

    car.index((all)=>{
      this.setState({cars:all.reverse()})
    },()=>{this.setState(H.msg404([])) });
  }

  delcar(veh){
      car.destroyEl(veh.id,()=>{this.init()});
  }



  render() {

    var state=this.state;
     var cars=state.cars;





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
                       <Title style={H.style.title}>All cars</Title>
                     </Body>
                     <Right>
                       <Button onPress={()=>{H.goTo(this,H.path.search,{model:car})}} transparent>
                         <Icon name='search' />
                       </Button>

                       <Button onPress={()=>{this.init()}} transparent>
                         <Icon name='refresh' />
                       </Button>


                       <Button onPress={()=>{H.goTo(this,H.path.create_car,{init:()=>{this.init()}})}} transparent>
                         <Text>New</Text>

                       </Button>
                     </Right>
                   </Header>
                   <Content  style={H.style.content}>



                     
                     <List style={{marginLeft:-3}}>
                        {cars.map((item,index) => {
                           
                           
                          return <ListItem button
                                    onPress={()=>{H.goTo(this,"show_car",{id:item.id})}}
                                    avatar key={index}>
                                    <Left>
                                       <H.DivImg bgColor={(bgColor)=>this.color=bgColor} name={item.marque}/>
                                    </Left>
                                    <Body  >
                                    
                                      <Text>{item.marque}</Text>
                                      <Text note>Plaque : {item.plaque} / code :{item.id}</Text>
                                      <Text note>Created : {item.created_at}</Text>
                                    </Body>
                                    <Right>
                                      <Button onPress={()=>{this.delcar(item)}} transparent>
                                          <Icon style={{fontSize: 30,color:"#b71c1c"}}  name="trash" />
                                      </Button>

                                    </Right>
                                  </ListItem>
                        })}


                    </List>
                    <H.LoadingData msg={this.state.msg404||''} data={cars}/>
                    
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

export default connect(...[,mapDispatchToProps])(Allcars)