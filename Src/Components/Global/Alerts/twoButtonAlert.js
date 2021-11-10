import React from 'react';
import {Modal, Pressable, StyleSheet, View, Text} from 'react-native';
import ButtonComponent from '../button';

const screen = props => {
  return (
    <Modal visible={props.visible} transparent={true} style={{height: 3}}>
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
            width: '80%',
            backgroundColor: 'white',
            marginBottom: '10%',
            borderRadius: 22,
          }}>
          <Text style={styles.textContainer}>{props.text}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <ButtonComponent
              text="OK"
              viewStyle={{width: '40%'}}
              componentStyle={{
                width: '100%',
                marginBottom: 20,
                alignSelf: 'flex-start',
                marginLeft: 10,
              }}
              onPress={props.okOnPress}
            />
            <ButtonComponent
              text="Cancle"
              viewStyle={{width: '60%'}}
              componentStyle={{
                width: '70%',
                marginBottom: 20,
                backgroundColor: 'red',
                alignSelf: 'flex-end',
                marginRight: 10,
              }}
              onPress={props.CancleOnPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  textContainer: {
    fontSize: 15,
    padding: 10,
    paddingBottom: 30,
    marginTop: 40,
    fontFamily: 'Montserrat',
    color: '#4F6C8D',
    textAlign: 'center',
  },
});

export default screen;
