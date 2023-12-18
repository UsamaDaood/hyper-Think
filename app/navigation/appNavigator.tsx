import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import CustomText from '../common/Components/CustomText';
import Color from '../libs/Colors';
import {useSelector} from 'react-redux';
import {responsiveFontSize} from '../libs/responsiveFont';
// Screens Importing
import TabImageItem from '../common/Components/TabImageItem';
// import ProfileTab from '../screens/HomeTabs/ProfilTab';
import {PRIMARY_FONT_MEDIUM_WORK_SANS_500} from '../utils/fonts';
// import ChatTabScreen from '../screens/HomeTabs/ChatTab';
// import HistoryTab from '../screens/HomeTabs/HistoryTab';
import BottomTabItem from '../common/Components/BottomTabItem';
import {
  IC_CHAT_COLORED,
  IC_CHAT_WHITE,
  IC_HOME_ACTIVE,
  IC_HOME_INACTIVE,
  IC_PLUS,
  IC_PLUS_COLORED,
  IC_PLUS_DISABLE,
  IC_PLUS_OUTLINE,
  IC_PLUS_UNSELECT,
  IC_PROFILE_ACTIVE,
  IC_PROFILE_INACTIVE,
  IC_SEARCH_ACTIVE,
  IC_SEARCH_INACTIVE,
} from '../utils/ImageSource';
import HomeTab from '../screens/HomeTabs/Home';
import SearchTab from '../screens/HomeTabs/Search';
import ProductDetail from '../screens/ProductDetail';
import AddProduct from '../screens/Product';
import SplashScreen from '../screens/Splash/index';
import ProfileTab from '../screens/HomeTabs/Profile';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="AddProduct" component={AddProduct} />

      {/* Bottom Tabs */}
      <Stack.Screen
        name="HomeTabs"
        component={HomeTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
// Displaying Projects List ==> 2nd Tabs Stack
function HomeTabStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={({navigation, route}) => ({
          headerTitle: props => {
            return <CustomText textString={''} />;
          },
        })}
      />
    </Stack.Navigator>
  );
}

// History tab Stack
function SearchTabStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
      <Stack.Screen
        name="SearchTab"
        component={SearchTab}
        options={({navigation, route}) => ({
          headerTitle: props => {
            return <CustomText textString={''} />;
          },
        })}
      />
    </Stack.Navigator>
  );
}

// ProfileTab
// Displaying Projects List ==> 2nd Tabs Stack
function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
      <Stack.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={({navigation, route}) => ({
          headerTitle: props => {
            return <CustomText textString={''} />;
          },
        })}
      />
    </Stack.Navigator>
  );
}

// Home Tabs New
function HomeTabs() {
  return (
    <BottomTab.Navigator
      screenListeners={({navigation, route}) => ({
        tabPress: e => {
          // Prevent default action
          e.preventDefault();
          navigation.navigate(route.name, {
            screen: route.name,
            params: null,
          });
        },
      })}
      sceneContainerStyle={{backgroundColor: Color.whiteColor}}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 30,
        },
        tabBarItemStyle: {
          marginTop: 15,
          height: Platform.OS == 'android' ? 30 : 30,
          // borderWidth: 1,
        },
        tabBarLabelStyle: {
          // marginTop: 10,
          marginBottom: 5,
          fontSize: 13,
        },
      }}>
      {/* All Items */}
      <BottomTab.Screen
        name="Home"
        component={HomeTabStack}
        options={{
          unmountOnBlur: true,
          tabBarLabel: () => {
            return null;
          },
          tabBarActiveTintColor: Color.black,
          tabBarInactiveTintColor: Color.darkGray,
          // title: 'Home',
          tabBarIcon: ({focused}) =>
            focused ? (
              <BottomTabItem
                imageSource={IC_HOME_ACTIVE}
                focus={focused}
                title={'Home'}
              />
            ) : (
              <BottomTabItem
                imageSource={IC_HOME_INACTIVE}
                focus={focused}
                title={''}
              />
            ),
        }}
      />

      {/* Tips Tabs */}
      <BottomTab.Screen
        name="Search"
        component={SearchTabStack}
        options={{
          unmountOnBlur: true,
          tabBarLabel: () => {
            return null;
          },
          tabBarActiveTintColor: Color.black,
          tabBarInactiveTintColor: Color.darkGray,
          tabBarIcon: ({focused}) =>
            focused ? (
              <View
                style={{
                  paddingBottom: 55,
                  alignItems: 'center',
                }}>
                <Image
                  source={IC_SEARCH_ACTIVE}
                  style={{
                    width: 50,
                    height: 50,
                    // borderWidth: 1,
                    margin: 20,
                    borderRadius: 100,
                    borderColor: Color.primaryColor,
                  }}
                  resizeMode={'contain'}
                />
              </View>
            ) : (
              <View
                style={
                  {
                    // paddingBottom: 55,
                  }
                }>
                <Image
                  source={IC_SEARCH_INACTIVE}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                  resizeMode={'contain'}
                />
              </View>
            ),
        }}
      />

      {/* Setting Tab Render */}
      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          unmountOnBlur: true,
          tabBarLabel: () => {
            return null;
          },
          tabBarActiveTintColor: Color.black,
          tabBarInactiveTintColor: Color.darkGray,
          tabBarIcon: ({focused}) =>
            focused ? (
              <BottomTabItem
                imageSource={IC_PROFILE_ACTIVE}
                focus={focused}
                title={'Account'}
              />
            ) : (
              <BottomTabItem
                imageSource={IC_PROFILE_INACTIVE}
                focus={focused}
                title={''}
              />
            ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default () => <AppNavigator />;

const styles = StyleSheet.create({});
