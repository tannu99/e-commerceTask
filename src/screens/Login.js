import {ArrowLeft2} from 'iconsax-react-native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../redux/actions/authActions';
import Toast from 'react-native-simple-toast';
import { colors } from '../utils/constants';

export const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const loading = useSelector(state => state.auth.loading);

  const handleLogin = () => {
    if (!phoneNumber) {
      Toast.show('Enter Phone Number to sent OTP.');
    } else {
      dispatch(
        loginRequest({phone: phoneNumber}, () =>
          navigation.navigate('Verify', phoneNumber),
        ),
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/login.jpg')}
          style={styles.recipeImage}
        />
      </View>
      <Animated.View style={styles.backButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <ArrowLeft2 size={hp(3)} color={colors.white} />
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.title}>Login / SignUp</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.buttonText}>Send OTP</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 400,

    borderRadius: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    marginTop: hp('3%'),
    marginBottom: hp('5%'),
  },
  inputContainer: {
    flexDirection: 'row',
    width: wp('87%'),
    marginLeft: wp('2%'),
    marginBottom: hp('3%'),
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    marginRight: wp('2%'),
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    width: wp('85%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButtonContainer: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS == 'android' ? hp(4) : hp('8%'),
  },
  backButton: {
    padding: 10,
    borderRadius: 999,
    marginLeft: 20,
    backgroundColor: colors.black,
  },
});
