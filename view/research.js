import React, { Component } from 'react';
import { Header,Container, Content, Form, Item, Input,Subtitle, Label,Text,Button,Icon,H2,H3,Body,Title,
  Card, CardItem ,Image,Thumbnail,List,ListItem, Left, Right, Tabs,Tab,TabHeading} from 'native-base';

import { StyleSheet, View,ScrollView,Platform,BackHandler } from 'react-native';
import {AppLayout,AppLoading} from "./app_layout"


let listener=null;




export default class Research extends Component {
  constructor(props){
      super(props);
      this.state={
      loading:true,
      value:"",
      modelName:"",
      model:"",//the model in which we are looking that data
      alldata:[],//all data fetched in the given model
      checkCol:[],
      dataFound:[],
      start:false,
      total:0//total result
    }
    


  }

  static navigationOptions=({navigation})=>{
     let header=null;
     return {header};
  }

  componentDidMount() {
     H.initIcon(this);
     this.init();


  }

  componentWillReceiveProps(nextprops){
     this.props=nextprops;
      
     this.init();
  }

  init(){
     
    
    var model=H.getParam(this.props,"model");
    var checkCol=model.colSearch;//col in which we are going to search for data
    var modelName=model.modelName;
    this.setState({checkCol:checkCol==undefined?[]:checkCol.split(','),
                   modelName:modelName,model:model});
    model.index(...[(allData)=>{

          this.setState({alldata:allData,start:false,dataFound:[],value:''});
    },,true]);
  }

  search(val){

      var state=this.state;
      var dataFromModel=state.alldata;
      var col=state.checkCol;
      var dataFound=H.searchData(dataFromModel,val,col)

      this.setState({dataFound:dataFound,value:val,start:true});
  }

  delItem(item){
    this.state.model.destroyEl(item.id,()=>{
            var dataFound=this.state.dataFound.filter((el) => {
                 return el.id!=item.id;
            })
             this.setState({dataFound:dataFound});
      });
  }





  render() {

    var state=this.state;

    if (state.loading && state.alldata===null) {
      return <AppLoading />
    }





    return (

            <AppLayout noBack={true}>

                <Header style={H.style.base_headers} searchBar rounded>
                      <Item>
                        <Icon name="ios-search" />
                        <Input value={state.value}
                           autoFocus
                           onChangeText={(val)=>{this.search(val)}} />
                         {!H.isEmpty(state.value)?
                           <Button onPress={()=>{this.search('')}} transparent>
                            <Icon style={{color:'black'}} name="close" />
                          </Button>
                         :<Text></Text>}
                      </Item>
                      
                    </Header>
                   <Content  padder style={H.style.content}>

                    {this.state.dataFound.length>0?
                         <View>
                                <CardItem header style={{height: 50}}>
                                    <Text>Results found: {state.dataFound.length}</Text>
                                </CardItem>



                                 <List style={{marginLeft:-3}}>
                                    {state.dataFound.map((item,index) => {

                                         return <ListItem onPress={()=>{H.goTo(this,"show_"+state.modelName,{id:item.id,repport:item})}}
                                                     avatar key={index}>
                                                     <Left>
                                                        <H.DivImg  name={(state.modelName=="mission"?"N ":"")+item[state.model.contentImg]+" "||"R p"}/>
                                                     </Left>
                                                    <Body>

                                                      {
                                                            state.checkCol.map((colName,index2) => {

                                                                return  <Text key={index2} style={{fontSize: 13,marginBottom:5}}><Text style={H.style.green_color} note>{H.alias(state.model.colAlias,colName)} :</Text> {item[colName]}</Text>
                                                            })

                                                       }

                                                   </Body>
                                                   <Right>
                                                     {state.modelName!=="repport"?
                                                        <Button onPress={()=>{this.delItem(item)}} transparent>
                                                         <Icon style={{fontSize: 30,color:"#b71c1c"}}  name="trash" />
                                                     </Button>:<Text></Text>
                                                   }
                                                     

                                                   </Right>

                                        </ListItem>


                                    })}


                                </List>
                      </View>:
                      <View>
                        {state.start && !H.isEmpty(state.value)?
                           <Text style={H.style.center}>No result for {state.modelName} with {H.arrValues(state.model.colAlias).toString()} : {state.value}</Text>:
                              <Text style={H.style.center}>Search a {state.modelName} using his {H.arrValues(state.model.colAlias).toString()}</Text>
                        }

                      </View>
                    }


                  </Content>

            </AppLayout>


    );
  }
}

