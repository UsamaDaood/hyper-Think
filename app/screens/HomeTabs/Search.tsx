import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import Colors from '../../libs/Colors';
import {
  IC_CANCEL,
  IC_NO_RECORD,
  IC_SEARCH_ACTIVE,
} from '../../utils/ImageSource';

import {useDispatch} from 'react-redux';
import CustomInput from '../../common/Components/CustomInput';
import CustomHeader from '../../common/Components/CustomHeader';
import ProductItem from '../../common/Components/ProductItem';
import {searchProductAsync} from '../../features/Product/thunks';
import {toastShow} from '../../libs/toast';
interface SearchProps {
  navigation: any;
}

const SearchTab: React.FC<SearchProps> = ({navigation}) => {
  const popularSearches = [
    'ww',
    'ww',
    'ww',
    'ww',
    'ww',
    'ww',
    'ww',
    'ww',
    'ww',
    'ww',
  ];
  const dispatch = useDispatch<any>();
  const [search, setSearch] = useState<string>('');
  const [searchedProduct, setSearchedProducts] = useState<any>([]);

  // render Search Input
  const renderSearchInout = () => {
    return (
      <View style={{marginHorizontal: 20}}>
        <CustomInput
          RightFirstIcon={search.trim().length > 0 ? IC_CANCEL : ''}
          callBackRightFirstImage={() => {
            setSearch('');
          }}
          inputStyle={{
            paddingLeft: 15,
            backgroundColor: Colors.backGroundLowWhiteColor,
          }}
          rightIconStyle={{
            marginRight: 15,
            backgroundColor: Colors.backGroundLowWhiteColor,
          }}
          RightIcon={IC_SEARCH_ACTIVE}
          keyboardType={'web-search'}
          inputValue={search}
          placeholder={'Find a product'}
          callBackRightImage={() => {
            if (search?.trim().length > 0) {
              searchProduct(search);
            } else {
              toastShow('error', 'Please enter something to search');
            }
          }}
          rightFirstIconStyle={{
            width: 10,
            height: 10,
            marginRight: 5,
          }}
          onChangeText={(text: string) => {
            setSearch(text);
            // searchig(text);
          }}
        />
      </View>
    );
  };

  const searchProduct = async (search: string) => {
    const proId = {
      searchKey: search,
    };
    dispatch(searchProductAsync(proId))
      .unwrap()
      .then((result: any) => {
        console.log('LOG:: GET Products => ' + result);
        // setProducts(result?.products);

        console.log('Images.... ', result?.products);
        setSearchedProducts(result?.products);
      })
      .catch(() => {
        // toastShow('error', messages.somethingWentWrong);
        toastShow('error', 'Something went Wrong.');
      });
  };

  // header render
  const renderHeader = () => {
    return (
      <View>
        <CustomHeader
          headerTitle="Search"
          containerStyle={{backgroundColor: Colors.whiteColor}}
        />
      </View>
    );
  };

  // render Products Lists
  // reder Flat list
  const renderFlatList = () => {
    return (
      <View style={{marginTop: 5, marginHorizontal: 20}}>
        <FlatList
          // data={JSON.parse(toolSlice?.toolListArr)}
          data={searchedProduct}
          keyExtractor={item => item.key.toString()}
          // numColumns={2}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: 30,
              }}>
              <Image
                source={IC_NO_RECORD}
                style={{
                  width: '100%',
                  height: 200,
                  marginVertical: 30,
                  borderRadius: 20,
                }}
                resizeMode={'contain'}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.black,
                  fontWeight: 'bold',
                }}>
                No Record found
              </Text>
            </View>
          }
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
      {/* Render Search InputText */}
      <View style={{marginTop: 20, flex: 1, marginBottom: 50}}>
        {/* Render Search Input */}
        {renderSearchInout()}
        {/* render Product List */}
        {renderFlatList()}
      </View>
      {/* priduct List */}
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Colors.colorGray,
  },
  recentSearchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderWidth: 0.3,
    margin: 5,
    borderRadius: 5,
    borderColor: Colors.primaryDisable,
  },
  recentItemText: {
    alignSelf: 'flex-start',
    color: Colors.primaryDisable,
    fontSize: 14,
    marginRight: 4,
  },
  recentTextStyle: {
    color: Colors.black,
    fontSize: 20,
  },
});

export default SearchTab;
