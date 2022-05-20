import React from 'react';
import {} from 'react-native';
import Navigation from './Src/Navigation/navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';
import store from './Src/Redux/store';

export default function App() {
  return (
    <RootSiblingParent>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </RootSiblingParent>
  );
}
