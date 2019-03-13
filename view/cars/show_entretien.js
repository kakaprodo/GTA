import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

// import {Driver} from "../../controller/driver"
import {Entretien} from "../../controller/entretien"

var entr;
let listener=null;






export default class ShowEntr extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      car:null,
      refreshing:true,
      entretiens:[],
      total:0,
      isForMonth:true,


    }


    entr=new Entretien({model:this,container:"entretiens"});

  }



  componentDidMount() {
     //H.initIcon(this);
      this.init();
     //  if (Platform.OS == "android" && listener == null) {
     //    listener = BackHandler.addEventListener("hardwareBackPress", () => {
     //       this.init();
     //    })
     // }

  }

  init(){
    var props=this.props;
    var car=props.car;
    var isForMonth=props.forMonth;


    this.setState({car:car});
    entr.car(car.id,(entrs)=>{
        var descOrder=H.descOrder(entrs);

         if (isForMonth) {
             descOrder=H.getForThisMonth(descOrder);
         }

         var total=H.getTotal(descOrder);

        this.setState({entretiens:descOrder,total:total,isForMonth:isForMonth});
    },()=>{});

  }

  delEntr(id){
    entr.destroyEl(id,()=>{this.init()});
  }

  render() {

    var state=this.state;






    return (
                             <View>
                                     <ListItem style={{marginBottom: 10}}>
                                       <Body>
                                          <Text>Total : {state.total} UM</Text>
                                       </Body>
                                       {state.isForMonth?
                                         <Right>
                                           <Button onPress={()=>{H.goTo(this,H.path.save_entretien,{car:state.car,init:()=>{this.init()}})}} success small rounded>
                                              <Text>New</Text>
                                           </Button>
                                         </Right>:
                                         <Text></Text>
                                       }

                                     </ListItem>


                                     <View>


                                         {state.entretiens.map((item,index) => {
                                                var opNumb=state.entretiens.length-(index);
                                                 return <Card key={index}>
                                                           <CardItem header style={{backgroundColor: '#ccc',height: 50}}>
                                                             <Text>Entretien {opNumb}</Text>
                                                             <Button onPress={()=>{this.delEntr(item.id)}} style={{position: 'absolute',right: 5,top:10}} danger small>
                                                               <Icon name="trash" />
                                                             </Button>
                                                           </CardItem>

                                                            <View style={{padding:10,marginBottom:10}} >


                                                             <Text style={{fontSize: 13,marginBottom:5}}>Motif : {item.motif}</Text>
                                                             <Text style={{fontSize: 13,marginBottom:5}}>Montant : {item.montant} UM</Text>
                                                             <Text style={{fontSize: 13,marginBottom:5}}>Technicien :{item.type}</Text>
                                                             <Text style={{fontSize: 13,marginBottom:5}}>Date : {item.created_at}</Text>
                                                           </View>
                                                          </Card>

                                             })
                                             }


                                     </View>

                </View>



         );
  }
}
