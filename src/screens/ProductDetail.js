import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useNavigation } from "@react-navigation/native";

import Animated from "react-native-reanimated";
import { ArrowLeft2 } from "iconsax-react-native";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../redux/actions/cartActions";
import { colors } from "../utils/constants";

export function ProductDetail(props) {
  let item = props.route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const loading = useSelector((state) => state.cart.loading);

  const handleAddToCart = () => {
    let params = {
      product_id: item.id_product,
      product_parent_id: item.parent_id,
      product_options: item.size,
      name: item.name,
      sku: item.sku,
      price: item.price,
      qty_ordered: "1",
      final_price: item.price,
      store: item.store,
      image: item.image,
      show: true,
    };
    if (!isItemInCart(item?.attribute_group_id)) {
      dispatch(addProducts(params));
    }
  };

  const isItemInCart = (itemId) => {
    return cart.some((item) => item.products[0].attribute_group_id === itemId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={"light"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.recipeImage} />
        </View>

        <Animated.View style={styles.backButtonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft2 size={hp(3)} color="#fbbf24" />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.mealDescriptionContainer}>
          <Animated.View style={styles.nameAndAreaContainer}>
            <Text style={styles.mealName}>{item?.description}</Text>
            {item?.product_details ? (
              <Text style={styles.mealArea1}>Product Details</Text>
            ) : null}
            <Text style={styles.mealArea}>{item?.product_details}</Text>
            {item?.product_description ? (
              <Text style={styles.mealArea1}>Product Description</Text>
            ) : null}
            <Text style={styles.mealArea}>{item?.product_description}</Text>
          </Animated.View>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>
            {isItemInCart(item?.attribute_group_id)
              ? "Added To Cart"
              : "Add to Cart"}
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    position: "relative",
  },
  scrollViewContent: {
    marginBottom: 50,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  recipeImage: {
    width: wp("100%"),
    height: hp(50),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    resizeMode: "contain",
  },
  backButtonContainer: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: hp(4),
  },
  backButton: {
    padding: 10,
    borderRadius: 999,
    marginLeft: 20,
    backgroundColor: colors.black,
  },
  favouriteButton: {
    padding: 10,
    borderRadius: 999,
    marginRight: 20,
    backgroundColor: colors.white,
  },
  loadingIndicator: {
    marginTop: hp(16),
  },
  mealDescriptionContainer: {
    paddingHorizontal: 20,
    justifyContent: "space-between",
    paddingTop: hp(1),
  },
  nameAndAreaContainer: {
    marginBottom: 20,
  },
  mealName: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: "#333",
  },
  mealArea: {
    fontSize: hp(2),
    fontWeight: "300",
    color: colors.black,
    letterSpacing: 1,
    marginTop: hp(1),
  },
  mealArea1: {
    fontSize: hp(2),
    fontWeight: "bold",
    color: colors.yellow,
    marginTop: hp(1),
  },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  ingredientsContainer: {
    marginBottom: 20,
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  videoContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: colors.black,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: wp("90%"),
    alignSelf: "center",
    marginBottom: hp("2%"),
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
