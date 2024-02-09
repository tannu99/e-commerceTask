import { ArrowLeft2 } from "iconsax-react-native";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { verifyOTP } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-simple-toast";
import { colors } from "../utils/constants";

export const Verify = ({ navigation, route }) => {
  const [otp, setOtp] = useState("");
  const screen = useSelector((state) => state.auth.screen);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleVerify = () => {
    if (!otp) {
      Toast.show("Enter OTP to login/signup.");
    } else {
      dispatch(
        verifyOTP({ phone: route?.params, otp: otp, store: 1 }, () =>
          navigation.navigate(screen == "Home" ? "HomeScreen" : "CartScreen")
        )
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/login.jpg")}
          style={styles.recipeImage}
        />
      </View>
      <Animated.View style={styles.backButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeft2 size={hp(3)} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.title}>Verify OTP</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="phone-pad"
          value={otp}
          onChangeText={(text) => setOtp(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleVerify()}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>VERIFY</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    position: "relative",
    alignSelf: "center",
    alignItems: "center",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  recipeImage: {
    width: "100%",
    height: 400,

    borderRadius: 100,
    resizeMode: "contain",
  },
  title: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    marginTop: hp("3%"),
    marginBottom: hp("5%"),
  },
  inputContainer: {
    flexDirection: "row",
    width: wp("87%"),
    marginLeft: wp("2%"),
    marginBottom: hp("3%"),
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("3%"),
    marginRight: wp("2%"),
  },
  button: {
    backgroundColor: colors.black,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    width: wp("85%"),
    alignSelf: "center",
    marginTop: hp("2%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  backButtonContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS == "android" ? hp(4) : hp("8%"),
  },
  backButton: {
    padding: 10,
    borderRadius: 999,
    marginLeft: 20,
    backgroundColor: colors.black,
  },
});
