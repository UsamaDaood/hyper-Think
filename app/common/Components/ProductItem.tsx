// Global loader for whole application //

import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Image} from 'react-native';
import Colors from '../../libs/Colors';
import {responsiveFontSize} from '../../libs/responsiveFont';
import {
  IC_APP_ICON,
  IC_APP_STORE,
  IC_RATING_STAR,
} from '../../utils/ImageSource';

interface ProductItemProps {
  item: any;
  index: number;
  onCLick?: any;
}

const ProductItem = ({item, index, onCLick}: ProductItemProps) => {
  return (
    <View style={styles.itemView}>
      <TouchableOpacity onPress={onCLick}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{uri: item?.thumbnail}}
            style={styles.productImageStyle}
            resizeMode={'cover'}
          />
          <View
            style={{
              flexDirection: 'column',
              // marginHorizontal: 10,
              // padding: 10,
              marginHorizontal: 5,
              alignItems: 'center',
            }}>
            <Text numberOfLines={1} style={styles.productNameStyle}>
              {item?.title}
            </Text>
            <Text style={{textAlign: 'center', marginVertical: 5}}>
              {item?.description?.length > 50
                ? item?.description.substring(0, 49)
                : item?.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  itemView: {
    flex: 0.5,
    margin: 5,
    borderWidth: 0.3,
    borderColor: Colors.darkGray,
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
    flexDirection: 'column',
  },
  productImageStyle: {
    width: 90,
    height: 90,
    marginBottom: 10,
    borderRadius: 10,
  },
  productNameStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
  },
  productPrice: {
    color: Colors.primaryDisable,
    marginTop: 8,
  },
  ratingImage: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 10,
    right: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  ratingText: {
    color: Colors.premiumColor,
    fontSize: 14,
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default ProductItem;
