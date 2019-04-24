/*Crettion of state store*/

import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {allReducers} from '../reducers/'
import {allMiddlewareChecker} from '../middleware/index'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import {CONF} from "../helper/all"

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};


window.H=CONF;
const pReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(pReducer,
                               applyMiddleware(allMiddlewareChecker,thunk)
                             );
export const persistore = persistStore(store);
