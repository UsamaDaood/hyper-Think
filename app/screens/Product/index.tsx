import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Colors from '../../libs/Colors';
import {getStoredValAsync, storeValueAsync} from '../../utils/AsyncStorage';
import {IS_DDISPLAY_ONBOARDING} from '../../utils/AsyncStorage/keys';
import {BACK_IMAGE, IC_APP_ICON} from '../../utils/ImageSource';
import {useDispatch} from 'react-redux';
import CustomHeader from '../../common/Components/CustomHeader';
import CustomInput from '../../common/Components/CustomInput';
import CustomButton from '../../common/Components/CustomButton';
import {toastShow} from '../../libs/toast';
import {addProductAsync} from '../../features/Product/thunks';
interface AddProductProps {
  navigation: any;
}

const AddProduct: React.FC<AddProductProps> = ({navigation}) => {
  const dispatch = useDispatch<any>();
  const [title, settitle] = useState<string>(''),
    [price, setPrice] = useState<string>(''),
    [description, setDescription] = useState<string>(''),
    [stock, setStock] = useState<number>(0),
    [brand, setBrand] = useState<string>('');
  // header render
  const renderHeader = () => {
    return (
      <View>
        <CustomHeader
          headerTitle="Add Product"
          containerStyle={{backgroundColor: Colors.whiteColor}}
          leftIcon={BACK_IMAGE}
          callBackLeftImage={() => {
            navigation.goBack();
          }}
        />
      </View>
    );
  };

  // Add Product
  const addProduct = () => {
    const productData = {
      title: title,
      description: description,
      brand: brand,
      stock: String(stock),
      price: String(price),
    };

    dispatch(addProductAsync(productData))
      .unwrap()
      .then((result: any) => {
        console.log('LOG:: ADD PRODUCT => ', result);
        toastShow('success', 'Product add successfully');
      })
      .catch(() => {
        // toastShow('error', messages.somethingWentWrong);
        toastShow('error', 'Something went Wrong.');
      });
  };

  // render Login Form
  const renderAddProductForm = () => {
    return (
      <View style={styles.loginViewStyle}>
        <Text style={styles.loginTextStyle}>Add Product</Text>
        <CustomInput
          placeholder="Title"
          inputValue={title}
          viewStyle={{marginVertical: 10}}
          onChangeText={(text: string) => {
            settitle(text);
          }}
        />

        <CustomInput
          placeholder="Description"
          inputValue={description}
          viewStyle={{marginVertical: 10}}
          onChangeText={(text: string) => {
            setDescription(text);
          }}
        />

        <CustomInput
          placeholder="Brand"
          inputValue={brand}
          viewStyle={{marginVertical: 10}}
          onChangeText={(text: string) => {
            setBrand(text);
          }}
        />

        <CustomInput
          placeholder="Price"
          inputValue={price}
          viewStyle={{marginVertical: 10}}
          keyboardType={'number-pad'}
          onChangeText={(text: string) => {
            setPrice(text);
          }}
        />

        <CustomInput
          placeholder="Stock"
          inputValue={String(stock)}
          keyboardType={'number-pad'}
          viewStyle={{marginVertical: 10}}
          onChangeText={(text: any) => {
            setStock(text);
          }}
        />

        <CustomButton
          btnString="Add Product NOW"
          btnStyle={{marginVertical: 20}}
          onClick={() => {
            addProduct();
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.centered}>
      {/* Header */}
      {renderHeader()}
      {/* Add Product Form */}
      {renderAddProductForm()}
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: Colors.whiteColor,
  },
  loginViewStyle: {
    backgroundColor: Colors.whiteColor,
    padding: 10,
    borderRadius: 20,
    margin: 20,
  },
  loginTextStyle: {
    marginTop: 10,
    marginBottom: 20,
    color: Colors.primaryColor,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default AddProduct;
