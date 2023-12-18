// Global loader for whole application //

import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Image, View} from 'react-native';
import Color from '../../libs/Colors';

interface TabItemProps {
  imageSource: any;
  focus: boolean;
  title: string;
}

const BottomTabItem = ({imageSource, focus, title}: TabItemProps) => {
  return (
    <View
      style={[
        styles.tabMainView,
        {
          backgroundColor:
            title.length > 0 ? Color.primaryColor : Color.whiteColor,
        },
      ]}>
      <Image source={imageSource} style={styles.imageStyle} />
      <Text style={{color: Color.whiteColor}}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  imageStyle: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  tabMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default BottomTabItem;
