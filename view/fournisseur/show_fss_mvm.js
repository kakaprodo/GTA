import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "../app_layout"

// import {Driver} from "../../controller/driver"
import {FournMvm} from "../../controller/fss_mvm"

var mvm;
let listener=null;






export default class ShowFssM extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      car:null,
      refreshing:true,
      mvms:[],
      total:0,
      fourn:null,
      is_paid:"",
      dettes:[],
      paiements:[],


    }


    mvm=new FournMvm({model:this});

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

  init(isChange){
    var props=this.props;
    var fourn=props.fourn;
    var isPaid=props.paid;
    var content=isPaid==0?"dettes":"paiements";

    if (isPaid==1) {
       H.initModel=()=>{this.init()};
    }


    this.setState({fourn:fourn});
    mvm.fss_mvm(...[fourn.id,,(mvms)=>{


        mvms=H.filterAll(mvms,{is_paid:isPaid});
        var descOrder=H.descOrder(mvms);
        var total=H.getTotal(descOrder,'montant');

        this.setState({[content]:descOrder,total:total,is_paid:isPaid});
    },()=>{}]);

  }

  delmvm(id){
    mvm.destroyEl(id,()=>{this.init()});
  }

  paiement(mvmS,index){

      mvm.paiement(mvmS.id,{is_paid:1},()=>{
             H.Toast('Debt paid');
             this.init();
             //we inititialse for debt paid
             H.initModel();

      });
  }

  render() {

    var state=this.state;






    return (
                             <View>
                                     <ListItem style={{marginBottom: 10}}>
                                       <Body>
                                          <Text>Total dette : {state.total} Um</Text>
                                       </Body>

                                       <Right>

                                             <Button onPress={()=>{H.goTo(this,H.path.save_fss_mvm,{fourn:state.fourn,is_paid:state.is_paid,init:()=>{this.init()}})}} success small rounded>
                                                <Text>New</Text>
                                             </Button>
                                        </Right>



                                     </ListItem>


                                     <View>


                                         {state[state.is_paid==1?"paiements":"dettes"].map((item,index) => {
                                                var opNumb=state[state.is_paid==1?"paiements":"dettes"].length-(index);
                                                 return <Card key={index}>
                                                           <CardItem header style={{backgroundColor: '#ccc',height: 50}}>
                                                             <Text>Operation {opNumb}</Text>
                                                               {!state.is_paid?
                                                                 <Button onPress={()=>{this.paiement(item,index)}} style={{position: 'absolute',right:60,top:10}} success small>
                                                                  <Text>Payer</Text>
                                                               </Button>:
                                                               <Text></Text>
                                                             }
                                                             <Button onPress={()=>{this.delmvm(item.id)}} style={{position: 'absolute',right: 5,top:10}} danger small>
                                                               <Icon name="trash" />
                                                             </Button>
                                                           </CardItem>

                                                            <View style={{padding:10,marginBottom:10}} >


                                                             <Text style={{fontSize: 13,marginBottom:5}}>Motif : {item.motif}</Text>
                                                             <Text style={{fontSize: 13,marginBottom:5}}>Montant : {item.montant} Um</Text>
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
