import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Colors from '../../libs/Colors';
import {IC_LOCK, IC_PROFILE_INACTIVE} from '../../utils/ImageSource';
import {useDispatch, useSelector} from 'react-redux';
import CustomHeader from '../../common/Components/CustomHeader';
import ProfileItem from '../../common/Components/ProfileItem';
import CustomButton from '../../common/Components/CustomButton';
import {toastShow} from '../../libs/toast';
import {isObjectEmpty} from '../../utils/Methods';
import CustomInput from '../../common/Components/CustomInput';
import {userLoginAsync} from '../../features/User/thunks';
import {logoutUser} from '../../features/User/usersSlice';

interface ProfileProps {
  navigation: any;
}

const ProfileTab: React.FC<ProfileProps> = ({navigation}) => {
  const dispatch = useDispatch<any>();
  const {user} = useSelector((state: {user: any}) => state);
  const [username, setUsername] = useState<string>('atuny0'),
    [password, setPassword] = useState<string>('9uQFF1Lh');
  useEffect(() => {
    console.log('LOGIN USER ', user?.userDetails);
    console.log('LOGIN USER ', isObjectEmpty(user?.userDetails));
  }, []);

  // render Header
  const renderHeader = () => {
    return (
      <View>
        <CustomHeader
          headerTitle="Account"
          containerStyle={{backgroundColor: Colors.whiteColor}}
        />
      </View>
    );
  };

  // render User Prfile
  const renderUserProfile = () => {
    return (
      <View style={styles.profileViewStyle}>
        <Image
          source={{uri: user?.userDetails?.image}}
          style={styles.accountLogoStyle}
        />
        {/* user Info */}
        <ProfileItem title="Name" desc={user?.userDetails?.firstName} />
        <ProfileItem title="Email" desc={user?.userDetails?.email} />
        <ProfileItem title="Gender" desc={user?.userDetails?.gender} />
      </View>
    );
  };

  // login start
  const startLogin = () => {
    const loginData = {
      username: username,
      password: password,
    };

    dispatch(userLoginAsync(loginData))
      .unwrap()
      .then((result: any) => {
        console.log('LOG:: USER LOGIN => ', result);
      })
      .catch(() => {
        // toastShow('error', messages.somethingWentWrong);
        toastShow('error', 'Something went Wrong.');
      });
  };

  // render Login Form
  const renderLoginForm = () => {
    return (
      <View style={styles.loginViewStyle}>
        <Text style={styles.loginTextStyle}>Login Form</Text>
        <CustomInput
          placeholder="Enter your username"
          RightIcon={IC_PROFILE_INACTIVE}
          inputValue={username}
          viewStyle={{marginVertical: 10}}
          onChangeText={(text: string) => {
            setUsername(text);
          }}
        />

        <CustomInput
          placeholder="Enter your username"
          RightIcon={IC_LOCK}
          inputValue={password}
          viewStyle={{marginVertical: 10}}
          isPassword={true}
          onChangeText={(text: string) => {
            setPassword(text);
          }}
        />

        <CustomButton
          btnString="Login"
          btnStyle={{marginVertical: 20}}
          onClick={() => {
            //
            startLogin();
          }}
        />
      </View>
    );
  };

  // Render User Profile
  const renderUser = () => {
    return (
      <View>
        {/* render User Profile */}
        {renderUserProfile()}

        {/* render Logout Button */}
        <CustomButton
          btnString="Logout"
          btnStyle={{marginHorizontal: 20, marginTop: 20}}
          onClick={() => {
            // toastShow('success', 'Coming Soon');
            dispatch(logoutUser());
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.centered}>
      {/* render Header */}
      {renderHeader()}

      {isObjectEmpty(user?.userDetails) ? renderLoginForm() : renderUser()}
    </View>
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: Colors.colorGray,
  },
  profileViewStyle: {
    backgroundColor: Colors.whiteColor,
    marginTop: 30,
    marginHorizontal: 15,
    paddingVertical: 30,
    borderRadius: 20,
  },
  accountLogoStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 40,
    borderWidth: 0.4,
    borderColor: Colors.primaryColor,
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

export default ProfileTab;
