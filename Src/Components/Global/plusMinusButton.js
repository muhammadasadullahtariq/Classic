import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Text from './normalText';
import HeaderText from './headerText';
import * as colors from '../../Constants/Colors';
import Icon from 'react-native-vector-icons/AntDesign';

const white = 'white';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <HeaderText text={'$ ' + props.price} style={{fontSize: 18}} />
        <View style={{flex: 1}} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={props.count == 0 ? true : false}
            onPress={() => props.setCount(props.count - 1)}>
            <View
              style={[
                styles.plusMinusButtonContainer,
                {backgroundColor: props.count == 0 ? '#dbdbdb' : '#afafaf'},
              ]}>
              <Icon name="minus" color={white} size={25} />
            </View>
          </TouchableOpacity>
          <Text
            text={props.count}
            style={{
              fontSize: 25,
              paddingHorizontal: 10,
              color: colors.primary,
              opacity: props.count == 0 ? 0.1 : 1,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => props.setCount(props.count + 1)}>
            <View style={styles.plusMinusButtonContainer}>
              <Icon name="plus" color={white} size={25} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {width: '97%', marginTop: 5},
  plusMinusButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    //marginLeft: 10,
  },
});

export default screen;
