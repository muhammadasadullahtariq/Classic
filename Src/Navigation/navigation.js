import * as React from 'react';
import {StatusBar, View, TouchableOpacity, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TestScreen from '../Screens/testScreen';
import SignIn from '../Screens/Login';
import DashBoard from '../Screens/dashBord';
import DetailScreen from '../Screens/detailscreen';
import Resturant from '../Screens/resturantList';
import productsListOfResturant from '../Screens/productsListOfResturant';
import SignUp from '../Screens/Signup';
import {createDrawerNavigator} from '@react-navigation/drawer';
import primary from '../Constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Context from './drawerContext';
import Profile from '../Screens/Profile';
import ResturantDetail from '../Screens/resturantDetail';
import BillScreen from '../Screens/paypal';
import ProductsList from '../Screens/productsList';
import CartProducts from '../Screens/cartProducts';
import * as colors from '../Constants/Colors';

//import Test from '../Screens/Test';

const white = 'white';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const NavigationDrawerStructure = props => {
  const navigation = useNavigation();
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    navigation.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <View style={{marginLeft: 5}}>
          <Icon name={'list-outline'} size={25} color={white} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ProductListWithDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <Context {...props} />}
      initialRouteName="DashBoard"
      screenOptions={{
        headerStyle: {backgroundColor: colors.primary},
        headerTitleStyle: {
          textAlign: 'center',
          color: 'black',
        },
        headerTintColor: 'black',
        headerLeft: () => <NavigationDrawerStructure />,
      }}>
      <Drawer.Screen
        name="DashBoard"
        component={DashBoard}
        options={{headerShown: false}}
      />
      {/* <Drawer.Screen name="ProductDetail" component={UserLogin} /> */}
    </Drawer.Navigator>
  );
};

function Navigation() {
  return (
    <NavigationContainer>
      <StatusBar
        hidden={false}
        translucent={true}
        backgroundColor={colors.primary}
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: colors.primary},
          headerTitleStyle: {
            textAlign: 'center',
            color: 'white',
          },
          headerTintColor: 'black',
        }}
        initialRouteName="SignIn">
        <Stack.Screen name="TestScreen" component={TestScreen} />
        <Stack.Screen name="SignIn" component={SignIn} />
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
          name="ProductListOfResturant"
          component={productsListOfResturant}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductList"
          component={ProductsList}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Home"
          component={ProductListWithDrawer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="ResturantDetail"
          component={ResturantDetail}
          option={{headerShown: true}}
        />
        <Stack.Screen
          name="CartProducts"
          component={CartProducts}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="BillScreen"
          component={BillScreen}
          options={{headerShown: true}}
        />
        {/* <Stack.Screen
          name="Test"
          component={Test}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen  name="tested"
        component={}
        option={{headerShown:false}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
