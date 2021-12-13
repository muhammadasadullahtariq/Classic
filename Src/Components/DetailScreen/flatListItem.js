import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../Global/normalText';
import HeaderText from '../Global/headerText';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <View style={{width: '25%'}}>
        <HeaderText
          text="Name is"
          componentStyle={{fontSize: 20, paddingVertical: 0}}
        />
      </View>
      <View style={{width: '70%'}}>
        <Text
          componentStyle={styles.textContainer}
          text={
            'Wikipedia is a free content, multilingual online encyclopedia written and maintained by a community of volunteers through a model of open collaboration, using a wiki-based editing system. Individual contributors, also called editors, are known as Wikipedians. Wikipedia'
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 3,
  },
  textContainer: {
    fontSize: 15,
    width: '100%',
    padding: 0,
    opacity: 0.5,
  },
});

export default screen;
