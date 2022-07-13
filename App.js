import React, {useEffect} from 'react';
import {} from 'react-native';
import Navigation from './Src/Navigation/navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from 'react-redux';
import store from './Src/Redux/store';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  useEffect(() => {
    requestUserPermission();
    messaging().getToken().then(console.log);
     messaging().onMessage(message => {
       console.log('Message recieved', message);
     });
  }, []);
 
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </RootSiblingParent>
  );
}
