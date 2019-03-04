//password Wifi:20172*#UlkGiS%!!$@Ja


// import axios from "axios"

// import {localSecured} from "./localSecurity"
// import {Validation as Valid} from "./validation";
import { Font, AppLoading,Permissions,Location } from "expo";
import {Toast} from "native-base"


import {pathRouter} from "./pathRouter"
// export const MW=mw;

import {style,globalStyle} from "./style"



// console.log(cache.setItem("name","prodo"));

export var Models={
   nav:null,
   app:null,
};




export var CONF={
    DNS:"http://192.168.43.25:8000/api",
    HOST_IMG:"http://192.168.43.25:8000/img",

    // cache:cashe,
    style:style,
    appName:"Intervation",
    globalStyle:globalStyle,
    path:pathRouter,
    appStateName:"appState",
    isLoggedIn:false,
    AccDenied:"Access denied",

    Agent:null,
    Client:null,
    defaultRedirection:"/login",
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
    goTo(model,screen,params={}){
      model.props.navigation.navigate(screen,params);
    }
    ,
    varToString(variable){
      return Object.keys(variable)[0];
    },
    initIcon:async(model)=>{//this function helps to load icons in expo
      await Font.loadAsync({
        Roboto: require("../../Fonts/Roboto.ttf"),
        Roboto_medium: require("../../Fonts/Roboto_medium.ttf")
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

   }




}
