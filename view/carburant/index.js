import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Carburant} from "../../controller/carburant"

var carb;

let listener=null;




class Allcarb extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      refreshing:true,
      dataOfMonth:[],
      allcarb:[],
      
      total:0
    }
    
    carb=new Carburant({model:this,container:"allcarb"});

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

    carb.index((carbs)=>{
          var dataForMonth=H.getForThisMonth(carbs);
         
          this.setState({dataOfMonth:dataForMonth});
    },()=>{this.setState(H.msg404([]))},true);
  }

  delcarb(carbind,isForMonth){
      carb.destroyEl(carbind.id,()=>{
            var state=this.state;
            
            H.handleOnDelete(carbind,isForMonth,'dataOfMonth','allcarb',this);
      });
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
                               <Button onPress={()=>{this.delcarb(item,isForMonth)}} style={{position: 'absolute',right: 5,top:10}} danger small>
                                 <Icon name="trash" />
                               </Button>
                             </CardItem>

                              <View style={{padding:10,marginBottom:10}} >


                               <Text style={{fontSize: 13,marginBottom:5}}>Quantité :{item.quantite}</Text>
                               <Text style={{fontSize: 13,marginBottom:5}}>Km parcouru : {item.kmp} km</Text>
                                <Text onPress={()=>{H.goTo(this,H.path.show_mission,{id:item.mission_id})}} style={{fontSize: 13,paddingTop:10,paddingBottom:10}}>Sur mission n°: {H.round(item.mission_id)} </Text>
                               <Text style={{fontSize: 13,marginBottom:5}}>Description1 : {item.descr1}</Text>
                                <Text style={{fontSize: 13,marginBottom:5}}>Description2 : {item.descr2}</Text>
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
                     <H.LoadingData msg={this.state.msg404||''} data={state.allcarb}/>

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

export default H.con(...[,mapDispatchToProps])(Allcarb)