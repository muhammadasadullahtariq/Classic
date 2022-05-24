import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Text from './normalText';
import * as Colors from '../../Constants/Colors';

const Screen = props => {
  useEffect(() => {}, []);

  return (
    <TouchableOpacity
      onPress={() => props.setSelectedItem(props.index)}
      activeOpacity={0.5}>
      <View style={[styles.mainContainer, props.viewStyle]}>
        <Text text={props.text} style={props.style} />
        <View
          style={{
            width: 10,
            height: 10,
            borderRadius: 20,
            backgroundColor:
              props.selectedItem == props.index ? Colors.primary : Colors.white,
            borderWidth: 1,
            borderColor: Colors.primary,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

export default Screen;

