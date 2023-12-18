import React, {useEffect, useState} from 'react';
import Colors from '../../libs/Colors';
import {IC_PLUS} from '../../utils/ImageSource';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import CustomHeader from '../../common/Components/CustomHeader';
import ProductItem from '../../common/Components/ProductItem';
import {getProductsAsync} from '../../features/Product/thunks';
import {toastShow} from '../../libs/toast';
import {isObjectEmpty} from '../../utils/Methods';
interface HomeProps {
  navigation: any;
}

const HomeTab: React.FC<HomeProps> = ({navigation}) => {
  const dispatch = useDispatch<any>();
  const [products, setProducts] = useState<any>([]);
  const {user} = useSelector((state: {user: any}) => state);

  useEffect(() => {
    // get Products
    const getProducts = async () => {
      dispatch(getProductsAsync({}))
        .unwrap()
        .then((result: any) => {
          console.log('LOG:: GET Products => ' + result?.products.length);
          setProducts(result?.products);
        })
        .catch(() => {
          toastShow('error', 'Something went Wrong.');
        });
    };

    getProducts().catch();
  }, []);

  // header render
  const renderHeader = () => {
    return (
      <View>
        <CustomHeader
          headerTitle="Products"
          containerStyle={{backgroundColor: Colors.whiteColor}}
          RightIcon={IC_PLUS}
          callBackRightImage={() => {
            isObjectEmpty(user?.userDetails)
              ? navigation.navigate('Profile', {
                  screen: 'ProfileTab',
                })
              : navigation.navigate('AddProduct');
          }}
        />
      </View>
    );
  };

  // reder Flat list
  const renderFlatList = () => {
    return (
      <View style={{marginTop: 5, marginHorizontal: 20, flex: 1}}>
        <FlatList
          // data={JSON.parse(toolSlice?.toolListArr)}
          data={products}
          keyExtractor={item => item.key.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={item => item.id}
        />
      </View>
    );
  };

  // render Item
  const renderItem = (item: any, index: number) => {
    return (
      <ProductItem
        item={item}
        index={index}
        onCLick={() => {
          navigation.navigate('ProductDetail', {
            productId: item?.id,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.centered}>
      {/* render Header */}
      {renderHeader()}
      {/* render Products List */}
      {renderFlatList()}
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: Colors.colorGray,
  },
});

export default HomeTab;
