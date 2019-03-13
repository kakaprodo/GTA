import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {Root,Drawer} from "native-base"
import SideBar from './sidebar';
import Login from "./user/login"
import Regit from "./user/regit"
import Dashboard from "./dashboard"
import AllDrivers from "./drivers/"
import CreateDriver from "./drivers/create"
import ShowDriver from "./drivers/show"
import EditDriver from "./drivers/edit"
import DriverIO from "./drivers/in_out"

import AllCars from "./cars/"
import CreateCar from "./cars/create"
import ShowCar from "./cars/show"
import EditCar from "./cars/edit"
import SaveEntretien from "./cars/save_entretien"

import AllMission from "./missions/"
import CreateMission from "./missions/create"
import ShowMission from "./missions/show"
import EditMission from "./missions/edit"
import SaveCarb from "./missions/save_carburant"
import SavePerd from "./missions/save_perdieme"

import AllMach from "./machindano/"
import CreateMash from "./machindano/create"

import AllFss from "./fournisseur/"
import CreateFss from "./fournisseur/create"

import AllStation from "./station/"
import CreateStation from "./station/create"
import ShowStation from "./station/show"
import SaveStMvm from "./station/save_station_mvm"


var AllScreen=createStackNavigator({

  'stations':{screen:AllStation},
  'create_station':{screen:CreateStation  },
  'show_station':{screen:ShowStation},
  'save_station_mvm':{screen:SaveStMvm},

  'fournisseurs':{screen:AllFss},
  'create_fournisseur':{screen:CreateFss  },



  'cars':{screen:AllCars},
  'create_car':{screen:CreateCar },
  'show_car':{screen:ShowCar},
  'edit_car':{screen:EditCar},
  'save_entretien':{screen:SaveEntretien},

  'mashindanos':{screen:AllMach},
  'create_mashindano':{screen:CreateMash  },

  'missions':{screen:AllMission},
  'create_mission':{screen:CreateMission },
  'show_mission':{screen:ShowMission },
  'edit_mission':{screen:EditMission},
  'save_carb':{screen:SaveCarb},
  'save_perd':{screen:SavePerd},



  'drivers':{screen:AllDrivers},
  'create_driver':{screen:CreateDriver },
  'show_driver':{screen:ShowDriver},
  'edit_driver':{screen:EditDriver},
  "driverin_out":{screen:DriverIO},






  // 'demo':{screen:Demo},



  'login':{screen:Login },
  'dashboard':{screen:Dashboard },
  'regit':{screen:Regit },


});

const Scr=createAppContainer(AllScreen);

// export default App;


export default class All extends Component {
  constructor(props){
      super(props);
      this.state={
        loading:true
      }
  }

 render() {
    var state=this.state;
    return (
      <Root>
        <Drawer
         ref={(ref) => { H.drawer = ref; }}
         content={<SideBar navigator={this.navigator} />}
         onClose={() => H.closeDrawer()} >
            <Scr/>
        </Drawer>
      </Root>

  );


  }
}
