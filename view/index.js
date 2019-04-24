import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import {store,persistore} from '../store/'
import AllScreen  from './container'
import {AppLoading} from "./app_layout"



export default class AppScreens extends React.Component {

  render() {
      return <Provider store={store}>
              {/* the loading and persistor props are both required*/}
                <PersistGate loading={<AppLoading />} persistor={persistore}>
                   <AllScreen/>
                </PersistGate>
            </Provider>
  }
}
