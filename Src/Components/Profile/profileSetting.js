import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Share,
} from 'react-native';
import Text from '../Global/normalText';
import Icon from 'react-native-vector-icons/Ionicons';
import primary from '../../Constants/Colors';

const brown = '#dbdbdb';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <TouchableHighlight
      onPress={() => {
        console.log('i pressed');
        props.onPress(props.text);
      }}
      activeOpacity={0.6}
      underlayColor={brown}>
      <View style={styles.mainContainer}>
        <Icon name={props.iconName} size={30} color={primary} />
        <Text
          text={props.value}
          style={{opacity: 0.6, paddingTop: 0, fontSize: 20, paddingLeft: 10}}
        />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    height: 60,
    paddingLeft: 20,
    alignItems: 'center',
    marginTop: 0,
    //borderTopWidth: 1,
    borderTopColor: brown,
    borderBottomColor: brown,
    //borderBottomWidth: 1,
  },
});

export default screen;
