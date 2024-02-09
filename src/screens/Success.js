import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/reducers/cartReducer";
import { colors } from "../utils/constants";

export const Success = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={{ backgroundColor:colors.white, flex: 1 }}>
      <View style={{ alignItems: "center", top: hp("20%") }}>
        <Image
          style={{ width: 200, height: 200 }}
          source={require("../assets/check.jpg")}
        />
        <Text
          style={styles.text}
        >
          Order placed successfully!
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("HomeScreen");
          dispatch(clearCart());
        }}
      >
        <Text
          style={styles.ok}
        >
          OK
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 19,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    marginTop: hp("2%"),
    color: colors.black,
  },
  btn: {
    alignItems: "center",
    top: hp("30%"),
    backgroundColor: colors.black,
    width: wp("60%"),
    borderRadius: 15,
    alignSelf: "center",
    paddingVertical: 10,
  },
  ok: {
    alignSelf: "center",
    textAlignVertical: "center",
    fontSize: 20,
    color: colors.white,
  },
});
