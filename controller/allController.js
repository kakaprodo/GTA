/*REGISTRATION OF ALL CONTROLLER*/

import {Carburant} from "./carburant";
import {Cars} from "./cars";
import {IO} from "./driver_io";
import {Driver} from "./driver"
import {Entretien} from "./entretien"
import {Fournisseur} from "./fournisseur"
import {FournMvm} from "./fss_mvm"
import {Mashindano} from "./machindano"
import {MissionCar} from "./mission_car"
import {Mission} from "./mission"
import {Perdieme} from "./perdieme"
import {Repport} from "./repport"
import {StationMvm} from "./station_mvm"
import {Station} from "./station"
import {User} from "./user"

export var allController={
    carburant:new Carburant(),
    cars:new Cars(),
    driver_io:new IO(),
    driver:new Driver(),
    entretien:new Entretien(),
    fournisseur:new Fournisseur(),
    fss_mvm:new FournMvm(),
    machindano:new Mashindano(),
    mission_car:new MissionCar(),
    mission:new Mission(),
    perdieme:new Perdieme(),
    repport:new Repport(),
    station_mvm:new StationMvm(),
    station:new Station(),
    user:new User()
}
