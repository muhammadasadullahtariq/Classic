import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import profile from '../assets/Images/defaulProfileImage.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import * as COLORS from '../Constants/Colors';
import HeaderText from '../Components/Global/headerText';
import {Header} from 'react-native/Libraries/NewAppScreen';

export default function DrawerContent(props) {
  const user = useSelector(state => state.user);
  const [profileImage, setProfileImage] = useState(profile);
  useEffect(() => {
    console.log(user);
    if (user.image != '') {
      console.log(user.image);
      setProfileImage({uri: user.image});
    }
  }, [user]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{flex: 1}}
        style={{backgroundColor: COLORS.primary, flex: 1}}>
        <View style={[styles.drawerContent]}>
          <View style={styles.userInfoSection}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                paddingLeft: 20,
              }}>
              <Image
                source={profileImage}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'contain',
                  borderRadius: 50,
                  backgroundColor: COLORS.white,
                }}
              />
              <HeaderText
                text={
                  '@' + user.name.charAt(0).toUpperCase() + user.name.slice(1)
                }
                style={{paddingLeft: 20}}
              />
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="person-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="fast-food-outline" color={color} size={size} />
              )}
              label="Favourites"
              onPress={() => {
                props.navigation.navigate('FavouriteProductsList');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('SettingScreen');
              }}
            />
          </Drawer.Section>
        </View>
        <View style={{flex: 1, backgroundColor: COLORS.white}} />
        <View />
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-outline" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            auth().signOut();
            props.navigation.navigate('SignIn');
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: COLORS.white,
  },
  userInfoSection: {
    //backgroundColor: 'red',
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
