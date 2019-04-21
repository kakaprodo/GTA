import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler ,TouchableOpacity} from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

import {Entretien} from "../../controller/entretien"

var entr;

let listener=null;




export default class Allentr extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      refreshing:true,
      dataOfMonth:[],
      allentr:[],
      dataOfMonth:[],
      total:0
    }
    H.setModel("current",this);
    entr=new Entretien({model:this,container:"allentr"});

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

    entr.index(...[(entrs)=>{
          var dataForMonth=H.getForThisMonth(entrs);
          this.setState({dataOfMonth:dataForMonth});
    },,true]);
  }

  delentr(entrind){
      entr.destroyEl(entrind.id,()=>{this.init()});
  }

  Listentr(isForMonth=true){
      var state=this.state;
      var entrindanos=isForMonth?state.dataOfMonth:state.allentr;
      entrindanos=entrindanos.reverse();
      var total=H.getTotal(entrindanos,"montant");
      return (
      <View>
        <Card>
           <CardItem header style={{height: 50}}>
              <Text>Total entretien: {total} Um</Text>
           </CardItem>
         </Card>


        <List style={{marginLeft:-3}}>
           {entrindanos.map((item,index) => {
               var opNumb=entrindanos.length-(index);

              return <Card key={index}>
                             <CardItem header style={{backgroundColor: '#ccc',height: 50}}>
                               <Text>N° {opNumb}</Text>
                               <Button onPress={()=>{this.delentr(item)}} style={{position: 'absolute',right: 5,top:10}} danger small>
                                 <Icon name="trash" />
                               </Button>
                             </CardItem>

                              <View style={{padding:10,marginBottom:10}} >


                               <Text style={{fontSize: 13,marginBottom:5}}>Motif :{item.motif}</Text>
                               <Text style={{fontSize: 13,marginBottom:5}}>Montant :{item.montant}</Text>

                               <TouchableOpacity onPress={()=>{H.goTo(this,H.path.show_car,{id:item.car_id})}}>
                                   <Text  style={{fontSize: 13,paddingTop:10,paddingBottom:10}}>Sur vehicule n°: {H.round(item.car_id)} </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{H.goTo(this,H.path.show_mechanician,{id:item.mechanician_id})}}>
                                  <Text style={{fontSize: 13,marginBottom:5}}>Click to see the techanician</Text>
                               </TouchableOpacity>
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
                       <Title style={H.style.title}>Entretiens</Title>
                     </Body>
                     <Right>
                       <Button onPress={()=>{this.init()}} transparent>
                         <Icon name='refresh' />
                       </Button>


                     </Right>
                   </Header>
                   <Content  padder style={H.style.content}>
                      <H.LoadingData data={state.allentr}/>
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
