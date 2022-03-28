import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Rating} from 'react-native-rating-element';
import Text from '../Global/normalText';

const brown = '#dbdbdb';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <Rating
        rated={props.rating}
        totalCount={5}
        ratingColor="#f1c644"
        ratingBackgroundColor="#cfcfcf"
        size={18}
        readonly={false}
        icon="ios-star"
        direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
      />
      <Text text={props.commit} style={{paddingTop:10}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: brown,
    width: '100%',
    //backgroundColor: 'red',
    paddingLeft: 5,
    minHeight: 100,
    paddingTop: 5,
  },
});

export default screen;
