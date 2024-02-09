import React, { useEffect, useState } from "react";
import {
  StatusBar,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ProductCard from "../components/ProductCard";
import {
  Logout,
  SearchNormal1,
  ShoppingCart,
  User,
} from "iconsax-react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/actions/productActions";
import { clickRequest, logoutRequest } from "../redux/actions/authActions";
import { colors } from "../utils/constants";


export function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.products.loading);
  useEffect(() => {
    dispatch(fetchProducts("value", () => setFilteredProducts(products)));
  }, []);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.description.toLowerCase().includes(searchText.toLowerCase()) ||
        product.price.toString().includes(searchText)
    );
    setFilteredProducts(filtered);
  }, [searchText, products]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(2), paddingTop: hp(2) }}
        style={{ paddingHorizontal: wp(4) }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            width: wp("90%"),
          }}
        >
          <Image
            source={require("../assets/brand.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          {token ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Logout",
                  "Are you sure you want to logout?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Logout",
                      onPress: () => dispatch(logoutRequest()),
                    },
                  ],
                  { cancelable: false }
                );
              }}
              style={{ left: wp("25%") }}
            >
              <Logout size="32" color="grey" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
                dispatch(clickRequest("Home"));
              }}
              style={{ left: wp("25%") }}
            >
              <User size="32" color="grey" />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
            <ShoppingCart size="32" color="grey" />
            {cart && cart.length > 0 && (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

       
        <View style={{ marginBottom: hp(2), marginLeft: wp("2%") }}>
          <Text
            style={{
              fontSize: hp(3.4),
              fontWeight: "bold",
              color: "gray",
              marginTop: hp(1),
            }}
          >
            Shop with ease,
          </Text>
          <Text
            style={{ fontSize: hp(3.4), fontWeight: "bold", color: "gray" }}
          >
            explore endless <Text style={{ color: colors.yellow }}>choices.</Text>
          </Text>
        </View>

       
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search"
            placeholderTextColor={"gray"}
            style={styles.input}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <View
            style={{
              backgroundColor: colors.white,
              borderRadius: hp(2),
              padding: hp(1),
            }}
          >
            <SearchNormal1 size="18" color="grey" />
          </View>
        </View>

        <View>
          <ProductCard products={filteredProducts} loading={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  badgeContainer: {
    position: "absolute",
    top: -10,
    right: -5, 
    backgroundColor:colors.black,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    fontSize: hp(1.7),
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: hp(1),
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    paddingVertical: hp(0.6),
    paddingHorizontal: hp(2),
    width: wp("88%"),
    marginLeft: wp("2%"),
  },
});
