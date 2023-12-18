import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Colors from '../../libs/Colors';
import {BACK_IMAGE, IC_RATING_STAR} from '../../utils/ImageSource';
import {useDispatch} from 'react-redux';
import CustomHeader from '../../common/Components/CustomHeader';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {toastShow} from '../../libs/toast';
import {getProductByIdAsync} from '../../features/Product/thunks';
interface ProductDetailProps {
  navigation: any;
  route?: any;
}

const ProductDetail: React.FC<ProductDetailProps> = ({navigation, route}) => {
  const productId: string = route?.params?.productId;
  const dispatch = useDispatch<any>();
  const [productInfo, setProductInfo] = useState<any>();

  useEffect(() => {
    console.log('Product Id ', productId);
    // call API to get Product Info
    const getProductInfo = async () => {
      const proId = {
        productId: productId,
      };
      dispatch(getProductByIdAsync(proId))
        .unwrap()
        .then((result: any) => {
          console.log('LOG:: GET Products => ' + result);
          // setProducts(result?.products);
          setProductInfo(result);
          console.log('Images.... ', result?.images);
        })
        .catch(() => {
          // toastShow('error', messages.somethingWentWrong);
          toastShow('error', 'Something went Wrong.');
        });
    };

    getProductInfo().catch();
  }, []);

  // render Header
  const renderHeader = () => {
    return (
      <View>
        <CustomHeader
          headerTitle="Product Detail"
          leftIcon={BACK_IMAGE}
          callBackLeftImage={() => {
            navigation.goBack();
          }}
          containerStyle={{backgroundColor: Colors.whiteColor}}
        />
      </View>
    );
  };

  const colors = ['ww', 'w', 'www', 'www', 'rreee', 'lloo['];
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const renderProductImages = () => {
    return (
      <View>
        <SwiperFlatList
          autoplay
          autoplayDelay={2}
          autoplayLoop
          index={2}
          paginationActiveColor={Colors.primaryColor}
          showPagination
          data={productInfo ? productInfo?.images : ['']}
          renderItem={({item}) => (
            <View>
              <Image
                source={{uri: item}}
                style={{width: windowWidth, height: 300}}
                resizeMode={'contain'}
              />
            </View>
          )}
        />
      </View>
    );
  };

  // Product more detail Item
  const moreDetailItem = (leftString: string, rightString: string) => {
    return (
      <View style={styles.moreDetailItem}>
        <Text style={{fontWeight: 'bold'}}>{leftString}</Text>
        <Text>{rightString}</Text>
      </View>
    );
  };

  // Product Detail
  const renderProductDetail = () => {
    return (
      <ScrollView style={{marginTop: -35}}>
        <View style={styles.productInfoView}>
          {/* Product Detail */}
          <Text style={styles.productnameStyle}>{productInfo?.title}</Text>

          {/* Rating View */}

          <View style={styles.priceView}>
            {/* left Side */}
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={IC_RATING_STAR} style={{width: 20, height: 20}} />
              <Text style={{fontSize: 14, marginHorizontal: 10}}>
                {productInfo?.rating}
              </Text>
            </View>
            {/* Right Side */}
            <Text
              style={{
                color: Colors.primaryColor,
                fontSize: 19,
                fontWeight: 'bold',
              }}>
              {productInfo?.price}
            </Text>
          </View>

          {/* product Desc */}
          <Text style={{color: Colors.black, fontSize: 17, marginVertical: 5}}>
            {productInfo?.description}
          </Text>
          <Text style={{color: Colors.black, fontSize: 21, marginVertical: 10}}>
            More Info
          </Text>
          {/* display Stock and Category and brand */}
          <View style={{flexDirection: 'column'}}>
            {moreDetailItem('Stock', productInfo?.stock)}
            {moreDetailItem('Brand', productInfo?.brand)}
            {moreDetailItem('Category', productInfo?.category)}
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.centered}>
      {/* Header */}
      {renderHeader()}
      {renderProductImages()}

      {/* product Detail */}
      {renderProductDetail()}
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: Colors.colorGray,
  },
  productInfoView: {
    // marginTop: -30,
    flexDirection: 'column',
    backgroundColor: Colors.backGroundLowWhiteColor,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 10,
  },
  productnameStyle: {
    color: Colors.primaryColor,
    fontSize: 27,
    fontWeight: 'bold',
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    alignItems: 'center',
  },
  moreDetailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderWidth: 0.4,
    borderRadius: 9,
    backgroundColor: Colors.backGroundLowWhiteColor,
    borderColor: Colors.darkGray,
    marginVertical: 5,
  },
});

export default ProductDetail;
