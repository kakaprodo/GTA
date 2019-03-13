//password Wifi:20172*#UlkGiS%!!$@Ja


// import axios from "axios"

// import {localSecured} from "./localSecurity"
// import {Validation as Valid} from "./validation";
import { Font, AppLoading,Permissions,Location } from "expo";
import React, { Component } from 'react';
import {Alert} from "react-native"
import {Toast} from "native-base"
const rColor=require('randomcolor');
import  {Images} from "../assets/img/images"

import {pathRouter} from "./pathRouter"
// export const MW=mw;

import {style,globalStyle} from "./style"



// console.log(cache.setItem("name","prodo"));

var Models={
   current:null,
   app:null,
   sidebar:null,
};




export var CONF={
    DNS:"http://192.168.43.25:8000/api",
    HOST_IMG:"http://192.168.43.25:8000/img",

    // cache:cashe,

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
    randomColor(){return rColor()},
    currentM(){
      return Models.current;
    },
    btn(){
       return ['success','small','full','rounded','iconRight'];
    },
    setModel(modelName,value){
      Models[modelName]=value;
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
      model.props.navigation.navigate(screen,params);
      if (isFromMenu) {
         this.closeDrawer();
      }
    }

    ,
    setRouteModel(model){

      if (Models.sidebar!=null) {
        // console.log('init2');
        Models.sidebar.setState({routes:model});
      }

    },
    initIcon:async(model)=>{//this function helps to load icons in expo


      await Font.loadAsync({
        Roboto: require("../Fonts/Roboto.ttf"),
        Roboto_medium: require("../Fonts/Roboto_medium.ttf")
      });
      model.setState({ loading: false });
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
   locationDistance(){
     function distance(lon1, lat1, lon2, lat2) {
          var R = 6371; // Radius of the earth in km
          var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
          var dLon = (lon2-lon1).toRad();
          var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = R * c; // Distance in km
          return d;
        }

        /** Converts numeric degrees to radians */
        if (typeof(Number.prototype.toRad) === "undefined") {
          Number.prototype.toRad = function() {
            return this * Math.PI / 180;
          }
        }

        window.navigator.geolocation.getCurrentPosition(function(pos) {
          console.log(pos);
          console.log(
            distance(pos.coords.longitude, pos.coords.latitude, 42.37, 71.03)
          );
        });
   },

   getLocation:async (model) => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let resp=[];
        if (status !== 'granted') {
           resp.msg='Permission to access location was denied';
           resp.error=true;
        }

        let location = await Location.getCurrentPositionAsync({});
        models.setState({loc:location});
        resp.location={latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
        return resp;

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
    this.drawer._root.close()
  },
  openDrawer(){
    Models.sidebar.setState({user:this.User});
    this.drawer._root.open()
  },
  now(full=false){
    var date=new Date()
    if (full) {
      return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
    }
    return date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
  },
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
     var desc=[];

     for (var i = data.length-1; i >=0; i--) {
       desc.push(data[i])
     }

     return desc;

  },
  getTotal(data=[],col='montant'){
     var total=0;

     for (var i = 0; i <data.length; i++) {
       total=total+parseInt(data[i][col]);
     }

     return total;

  },
  dateSameMonth(date1,date2){
       date1=(date1.split(" ")[0]).split("/");
       var monthYear1=date1[1]+"/"+date1[2];

       date2=(date2.split(" ")[0]).split("/");
       var monthYear2=date2[1]+"/"+date2[2];

       if (monthYear1==monthYear2) {
         return true
       }
       return false;

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
  }






}
