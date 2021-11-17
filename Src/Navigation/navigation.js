import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TestScreen from '../Screens/testScreen';
import UserLogin from '../Screens/Login';
import ItemList from '../Screens/itemsList';
import DetailScreen from '../Screens/detailscreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#186BFE"
        translucent={true}
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#186BFE'},
          headerTitleStyle: {
            textAlign: 'center',
            color: 'white',
          },
          //headerBackImage: () => <Image source={icon} />,
        }}
        initialRouteName="Test">
        {/* initial Route Name */}
        {/* TEST SCREEN TO TEST THE COMPONENTS */}
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Login" component={UserLogin} />
        <Stack.Screen name="ItemList" component={ItemList} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
