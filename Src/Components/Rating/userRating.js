import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Rating} from 'react-native-rating-element';
import Text from '../Global/normalText';

const screen = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.mainContainer}>
      <Rating
        rated={3}
        totalCount={5}
        ratingColor="#f1c644"
        ratingBackgroundColor="#cfcfcf"
        size={24}
        readonly={false}
        icon="ios-star"
        direction="row" // anyOf["row" (default), "row-reverse", "column", "column-reverse"]
      />
      <Text text="Wikipedia is a free content, multilingual online encyclopedia written and maintained by a community of volunteers through a model of open collaboration, using a wiki-based editing system. Individual contributors, also called editors, are known as Wikipedians. Wikipedia" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {backgroundColor: 'white'},
});

export default screen;
