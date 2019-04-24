//password Wifi:20172*#UlkGiS%!!$@Ja


// import axios from "axios"

// import {localSecured} from "./localSecurity"
// import {Validation as Valid} from "./validation";
import { Font, AppLoading,Permissions,Location } from "expo";
import React, { Component } from 'react';
import {Alert,TouchableOpacity} from "react-native"
import {connect} from 'react-redux';
import {Toast} from "native-base"
const rColor=require('randomcolor');
import  {Images} from "../assets/img/images"

import {pathRouter} from "./pathRouter"
// export const MW=mw;

import {style,globalStyle} from "./style"
import ExpiredOp from "../view/expired_operation"
import DivImg from "./div_image"
import LoadingData from './loading_data'
import {Variables} from './variables'



// console.log(cache.setItem("name","prodo"));

var Models={
   current:null,
   app:null,
   sidebar:null,
};




export var CONF={
    DNS:"http://192.168.43.25:8000/api",
    HOST_IMG:"http://192.168.43.25:8000/img",
    const:Variables,
    // cache:cashe,
    ExpiredOp:ExpiredOp,
    DivImg:DivImg,
    LoadingData:LoadingData,
    style:style,
    appName:"GTA",
    img:Images,
    appLongName:"Fk management",
    globalStyle:globalStyle,
    path:pathRouter,
    appStateName:"appState",
    isLoggedIn:false,
    AccDenied:"Access denied",
    drawer:null,
    User:[],
    Client:null,
    defaultRedirection:"/login",
    allInputRef:[],
    iconLoaded:false,
    initModel:null,
    msg_404:'The list is empty',
    con:connect,//connection of react and redux
    logOut(model){
        this.isLoggedIn=false;
        return {type:this.const.LOGOUT,done:()=>{
              this.goTo(model,this.path.login);
        }}
        
        
    },
    initModel(){
        if (this.initModel!=undefined){
            return this.initModel();
        }
       return ;
    }
    ,
    randomColor(){return rColor()},
    currentM(){
      return Models.current;
    },
    btn(){
       return ['success','small','full','rounded','iconRight'];
    },
    setModel(modelName,modelObject){
      var {state}=modelObject.props.navigation;
      
      if (modelName!==undefined) {
         Models[modelName]=modelObject;
      }
      

      return {type:this.const.SET_CURRENT_PAGE,info_page:state};
    }
    ,
    encrypt(data){
     return localSecured.encrypt(data);

    },
    decrypt(data){
      return localSecured.decrypt(data);
    },
  isEmpty(value){
        if (value!==null && value!==undefined && value!=="") {
          return false;
        }
        return true;
    },
    fieldChange(m,value,varName,KeyValidation=null){
       if (KeyValidation!==null) {
         m.setState({[varName]:value,[KeyValidation]:""});
       }
      m.setState({[varName]:value});
    },
    goTo(model,screen,params={},isFromMenu=false){
      
      if (model.props.navigation==undefined) {
        return this.Toast("Component navigation error:",'danger',15000);
      }
      params=params===undefined?{}:params;
      model.props.navigation.navigate(screen,params);
      if (isFromMenu) {
         this.closeDrawer();
      }
    }

    ,
    setRouteModel(model){
      
      if (Models.sidebar!=null) {
        // console.log('init2');
        //Models.sidebar.setState({routes:model});
      }

    },
    initIcon:async(model,once)=>{//this function helps to load icons in expo


       if (model.state.loading==true) {
         await Font.loadAsync({
           Roboto: Images.icon.Roboto,
           Roboto_medium: Images.icon.Roboto_medium
         });

         model.setState({ loading: false });
         var {setModel}=model.props;
         if (setModel!==undefined) {
             setModel(...[,model]);
         }
       }


        //model.setState({ loading: false });


    },
    strReplace(str,search,replacement="+"){
       if (this.isEmpty(str)) {
         return str;
       }
       return str.split(search).join(replacement);
    },
    Toast(msg="successfully done",type=undefined,durration=3000,position="bottom"){

      return Toast.show({
                 text: msg,
                 position: position,
                 duration:durration,
                 buttonText:"Ok",
                 type:type

               });

    },
    swal(msg='Do you want to do this operation',onYess,title='Are you sure ?',onNo){
      Alert.alert(title,msg,
         [
           {
             text: 'Yes',
             onPress: () => {
                 if (onYess) {
                   onYess.call(this);
                 }
             },
           },
           { text: 'No', onPress: () => {
               if (onNo) {
                 onNo.call(this);
               }
           } },
         ],
         { cancellable: false }
        );
    }
    ,
    client_img(name){
      return this.HOST_IMG+"/client/"+name;
    },
    agent_img(name){
      return this.HOST_IMG+"/agent/"+name;
    },
    invalid(model,field){
       var field=model.state[field];
       if (this.isEmpty(field)) {
         return false;
       }
       return true;
    },
    replacePararam(string,placeholderArray){//this is to replace placeholders in string by a value
        for (var p in placeholderArray) {
          string = string.replace(new RegExp('{' + p + '}', 'g'), placeholderArray[p])
        }
        return string;
   },
   inputFocused (model,refName) {
      setTimeout(() => {
        let scrollResponder = model.refs.scrollView.getScrollResponder();
        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
          React.findNodeHandle(model.refs[refName]),
          110, //additionalOffset
          true
        );
      }, 50);
   }
  ,
  resetAllState(model){
    for (var key in model.state) {
       model.setState({[key]:""});

    }
  },
  getKeyName(array,index){
    var j=1;
    var keyName;
    for (var a in array) {
       if(j==index){
         keyName=a;
         break;
       }

       j++;

    }
    return keyName;
  }
  ,
  resetModel(keyIndex=[],model){//this will reset the value of a kid in state of model
    //according to the index of the keyIndex
    var state=model.state;
    if (keyIndex==="all") {
       return this.resetAllState(model);
    }
    for (var i = 0; i < keyIndex.length; i++) {

         var currentIndex=keyIndex[i].split(":");
         var kidIndex=currentIndex[0];
         var valueToReplace=currentIndex[1]==undefined?"":currentIndex[1];
         var keyName=this.getKeyName(state,kidIndex);

         model.setState({[keyName]:valueToReplace});
    }

  }
  ,
  closeDrawer(){
    var {navigation}=Models.sidebar.props;
    navigation.closeDrawer()
  },
  openDrawer(){
      var {navigation}=Models.sidebar.props;
      navigation.openDrawer()
    

  },
  format(date,type){
       if (date===undefined) {return;}
       
       var dateArr=date.split("at")[0];
       if (dateArr!==undefined) {
          dateArr=date.split('/');

          if (type==="my") {
            
            date=dateArr[1]+"/"+dateArr[2];
          }
       }
       return date;
  }
  ,
  now(full=false,format){
    var date=new Date()
    var result;
    if (full) {
      result=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()+" at "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    }
    result=date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();

    if (format!=undefined) {
      if (format=="my") {
        var dateArr=result.split("/");
        result=dateArr[1]+"/"+dateArr[2];
      }

    }

    return result;
  },
  round(number,AfterComa){
        var numberArr=number.toString().split(".");

        number=numberArr[0]+(numberArr[1]!=undefined?"."+numberArr[1].substring(0,AfterComa):"");
        return parseFloat(number);
  }
  ,
  getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  getParam(props,key){
      return props.navigation.getParam(key,'no '+key);
  },
  goBack(props){
       return props.navigation.goBack();
  },
  descOrder(data=[]){
     var desc=data.reverse();
     return desc;

  },
  getFields(data=[]){
    var fields=this.arrKeys(data);
    var fieldString=fields.toString();
    var values=this.arrValues(data,'string');
    var nbRow=fields.length;
    var tagPrepare=nbRow>0?"?":null;//preparation query for insert specially
    var colUpdate="";//preparation of query for update
    var selectQuery="";
    for (var i = 1; i < nbRow; i++) {
        tagPrepare=tagPrepare+",?";
    }

    for (var i = 0; i < nbRow; i++) {
           const remainerInLoop=nbRow-1;
           colUpdate=colUpdate+(fields[i]+((remainerInLoop==i)?"=?":"=?,"));
    }

    for (var i = 0; i < nbRow; i++) {
           const remainerInLoop=nbRow-1;
           selectQuery=selectQuery+(fields[i]+((remainerInLoop==i)?"=?":"=? and "));
    }

   return {fields:fields,
           fieldString:fieldString,
           values:values,
           tagPrepare:tagPrepare,
           colUpdate:colUpdate,
           selectQuery:selectQuery};

  }
  ,
  arrKeys(arr=[]){
     return Object.keys(arr);
  },
  arrValues(arr=[],format){
    arr=Object.values(arr);

     if (format==="string") {//transform all value to string
        arr=this.stringifyValue(arr);
     }
     return arr;
  },
  stringifyValue(obj) {
      var keys=Object.keys(obj);
      var finalResult=[];
      for (var i = 0;i<keys.length;i++) {
           var current=obj[keys[i]];

            finalResult[keys[i]]=current===undefined?current:current.toString();
         
      }

      return finalResult;
 }
  ,
  fieldMach(data,fieldToCheck){
      var resp=true;
      var fields=this.arrKeys(fieldToCheck);
      var values=this.arrValues(fieldToCheck);
      for (var i = 0; i <fields.length; i++) {
          if (data[fields[i]]!=values[i]) {
             resp=false;
             break;
          }
      }
    return resp;
  },
  filterAll(data,fieldToCheck){
     data=data.filter((item) => {
         return this.fieldMach(item,fieldToCheck);
     })
     return data;
  },
  formatMonthYear(mothYear,dateNotReady=false){
       if (dateNotReady) {
          mothYear=this.format(mothYear,'my')
       }
       var res=mothYear.split("/");
       return this.monthName(res[0])+" "+res[1];
  }
  ,
  monthName(number){
      number=parseInt(number)
      switch (number) {
          case 1:
            return "January";
          break;
          case 2:
              return "Febrary";
            break;
          case 3:
              return "March";
            break;
          case 4:
              return "April";
            break;
          case 5:
            return "May";
          break;
          case 6:
              return "Jun";
            break;
          case 7:
              return "Juilly";
            break;
          case 8:
              return "August";
            break;
          case 9:
              return "September";
            break;
          case 10:
              return "October";
            break;
          case 11:
              return "November";
              break;
          case 12:
              return "December";
            break;

        default:return ;

      }
  }
  ,
  getTotal(data=[],col='montant',fieldToCheck){
     var total=0;

     for (var i = 0; i <data.length; i++) {
        if (fieldToCheck!=undefined) {

            if (this.fieldMach(data[i],fieldToCheck)) {
               total=total+parseInt(data[i][col]);
            }

        }
        else{
          total=total+parseInt(data[i][col]);
        }

     }

     return total;

  },
  dateSameMonth(date1,date2,date2IsReady=false,toCall,callWhenStateIs){
       date1=(date1.split(" ")[0]).split("/");
       var monthYear1=date1[1]+"/"+date1[2];



       if (date2IsReady) {
           monthYear2=date2;
       }
       else{
         date2=(date2.split(" ")[0]).split("/");
         var monthYear2=date2[1]+"/"+date2[2];
       }

       if (monthYear1===monthYear2) {
         if (toCall) {
            if(callWhenStateIs)
             {toCall();}
         }
         return true
       }
       if (toCall) {
            if(callWhenStateIs===false)
             {toCall();}
         }
       return false;

  },
  forTargetMonth(data,TargetMonth){

    data=data.filter((item) => {//prodo
        return this.dateSameMonth(item.created_at,TargetMonth,true);
    })
    return data;
  }

  ,
  getForThisMonth(data){

     data=data.filter((item) => {//prodo
         return this.dateSameMonth(item.created_at,this.now());
     })
     return data;
  }
  ,
 refreshPage(props,funcToCall='init',param){

       var initFunc=H.getParam(props,funcToCall);
       if (initFunc!=undefined) {

           return initFunc(param);
       }

  },
  fieldsAndData(arr=[]){
    var fields=Object.keys(arr).toString();
    var data=[];
    var j=0;
     for (var i in arr) {
       data[j]=(arr[i]);
       j++;
     }
    return {data:data,fields:fields};
  },
  alias(table,key){
     return table[key]==undefined?key:table[key];
  }
  ,
  searchData(data,value,col=['id']){

     if (this.isEmpty(value)) {
       return [];
     }

    data=data.filter((item) => {

            var result=[];


            for (var i = 0; i < col.length; i++) {
               var fieldTocheck=item[col[i]];
               if (fieldTocheck!=undefined) {
                   value=value.toString().toLowerCase();
                   fieldTocheck=fieldTocheck.toString().toLowerCase()
                   var checker=null;
                   
                   try {
                     checker=fieldTocheck.match(value);
                   } catch(e) {
                     
                   }

                     if (checker!=null) {
                       result[i]=checker;
                       //console.log(item);
                     }

                }


            }
            return result.length>0;
      })
    return data;
  },
  shortName(name){//give a short of given name,eg:kaka prodo='Kp'
    if (name===undefined) {
      return "";
    }
     name=name.split(" ");
    var name1=name[0]!==undefined?name[0].charAt(0):"";
    var name2=name[1]!==undefined?name[1].charAt(0):"";
    name=name1.toUpperCase()+''+name2.toLowerCase();
    return name;
  },
  handleOnDelete(itemToDel,isForMonth,dataOfMonth,allItems,md){
    
               var forMonth=md.state[dataOfMonth].filter((item)=>{
                  return itemToDel.id!==item.id;
               });

               var all_list=md.state[allItems].filter((item)=>{
                  return itemToDel.id!==item.id;
               });

               md.setState({[dataOfMonth]:forMonth,[allItems]:all_list,...this.msg404(all_list)})
          
  },
  msg404(item){
      if (item===undefined) {
         return {};
      }

      return {msg404:item.length===0?this.msg_404:''};
  }






}
