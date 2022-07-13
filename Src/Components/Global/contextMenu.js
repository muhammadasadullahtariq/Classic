import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
} from 'react-native';
import HeaderText from './headerText';
import InfoText from './normalText';
import * as COLORS from '../../Constants/Colors';

const screen = props => {
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      style={{height: 3}}
      onRequestClose={props.closeMenu}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000080',
        }}>
        <View
          style={{
            width: '60%',
            marginTop: '70%',
            borderRadius: 22,
            overflow: 'hidden',
            backgroundColor: 'white',
            justifyContent: 'center',
          }}>
          <HeaderText
            text={props.heading}
            style={{height: 52, alignSelf: 'center', paddingVertical: 16.5}}
          />
          <View style={{height: 1, backgroundColor: '#F7F8FA'}}></View>
          {props.array.map(item => {
            return (
              <View>
                <Pressable
                  onPress={() => {
                    props.itemPressed(item, props.array.indexOf(item));
                    console.log(item);
                  }}>
                  <InfoText
                    text={item}
                    style={{
                      height: 52,
                      paddingVertical: 16.5,
                      alignSelf: 'flex-start',
                      paddingLeft: 20,
                      color: COLORS.darkBrown,
                    }}
                  />
                </Pressable>
                <View style={{height: 1, backgroundColor: '#F7F8FA'}}></View>
              </View>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textContainer: {},
});

export default screen;