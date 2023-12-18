// Global loader for whole application //

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ImageStyle,
} from 'react-native';
import Color from '../../libs/Colors';
import {responsiveFontSize} from '../../libs/responsiveFont';
import {PRIMARY_FONT_MEDIUM_WORK_SANS_500} from '../../utils/fonts';

interface ImageProps {
  imageSource: any;
  imageStyle?: ImageStyle;
}

const TabImageItem = ({imageSource, imageStyle}: ImageProps) => {
  return (
    <Image
      source={imageSource}
      style={[{width: 20, height: 20}, imageStyle]}
      resizeMode={'contain'}
    />
  );
};
const styles = StyleSheet.create({
  textStyle: {
    fontFamily: PRIMARY_FONT_MEDIUM_WORK_SANS_500,
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: Color.black,
  },
});

export default TabImageItem;
