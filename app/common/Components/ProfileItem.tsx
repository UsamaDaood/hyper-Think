// Global loader for whole application //

import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Colors from '../../libs/Colors';

interface TextProps {
  title: string;
  desc: string;
}

const ProfileItem = ({title, desc}: TextProps) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={{color: Colors.black, fontSize: 14}}>{desc}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: Colors.backGroundLowWhiteColor,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 6,
  },
  titleStyle: {
    color: Colors.black,
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ProfileItem;
