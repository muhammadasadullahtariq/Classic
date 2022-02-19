import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TestScreen from '../Screens/testScreen';
import UserLogin from '../Screens/Login';
import DashBoard from '../Screens/dashBord';
import DetailScreen from '../Screens/detailscreen';
import Resturant from '../Screens/resturantList';
import ProductList from '../Screens/productsList';
import SignUp from '../Screens/Signup';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const NavigationDrawerStructure = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

function Navigation({navigation}) {
  return (
    <NavigationContainer>
      <StatusBar hidden={false} translucent={true} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#FF007F'},
          headerTitleStyle: {
            textAlign: 'center',
            color: 'black',
          },
          headerTintColor: 'black',
          // headerLeft: () => (
          //   <NavigationDrawerStructure navigationProps={navigation} />
          // ),
        }}
        initialRouteName="DashBoard">
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Login" component={UserLogin} />
        <Stack.Screen
          name="DashBoard"
          component={DashBoard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResturantList"
          component={Resturant}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
