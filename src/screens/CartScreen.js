import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { Add, ArrowLeft2, Minus, Trash } from "iconsax-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, deleteProducts } from "../redux/actions/cartActions";
import { clickRequest } from "../redux/actions/authActions";
import Toast from "react-native-simple-toast";
import { colors } from "../utils/constants";

export const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const cart = useSelector((state) => state.cart.cart);

  const calculateTotal = () => {
    const total = cart.reduce((acc, product) => {
      return acc + product.products[0].price * product.products[0].qty;
    }, 0);

    return total;
  };

  const removeItemFromCart = async (data) => {
    Alert.alert(
      "Remove Product",
      "Do you want to remove this product from cart?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => {
            dispatch(
              deleteProducts({
                cart_id: data.cart_id,
                cart_session: data.cart_session,
                product_id: data?.products[0]?.item_id,
              })
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  const checkOut = async () => {
    if (!token) {
      navigation.navigate("Login");
      dispatch(clickRequest("check"));
    } else {
      navigation.navigate("Success");
    }
  };
  const products = useSelector((state) => state.products.products);

  const handleAddButtonClick = (data) => {
    const findProductById = (productList) => {
      return productList.find(
        (product) =>
          product.attribute_group_id === data.products[0].attribute_group_id
      );
    };
    const product = findProductById(products);

    if (data.products[0].qty < data.products[0].max_qty) {
      let params = {
        product_id: product.id_product,
        product_parent_id: product.parent_id,
        product_options: product.size,
        name: product.name,
        sku: product.sku,
        price: product.price,
        qty_ordered: Number(data.products[0].qty) + 1,
        final_price: product.price,
        store: product.store,
        image: product.image,
        show: false,
      };
      dispatch(addProducts(params));
    } else {
      Toast.show(
        `Can't add more, maximum quantity available is ${data.products[0].max_qty}`
      );
    }
  };
  const handleMinusButtonClick = (data) => {
    const findProductById = (productList) => {
      return productList.find(
        (product) =>
          product.attribute_group_id === data.products[0].attribute_group_id
      );
    };
    const product = findProductById(products);
    if (data.products[0].qty > 1) {
      let params = {
        product_id: product.id_product,
        product_parent_id: product.parent_id,
        product_options: product.size,
        name: product.name,
        sku: product.sku,
        price: product.price,
        qty_ordered: Number(data.products[0].qty) - 1,
        final_price: product.price,
        store: product.store,
        image: product.image,
        show: false,
      };
      dispatch(addProducts(params));
    } else {
      Alert.alert(
        "Remove Product",
        "Do you want to remove this product from cart?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Remove",
            onPress: () =>
              dispatch(
                deleteProducts({
                  cart_id: data.cart_id,
                  cart_session: data.cart_session,
                  product_id: data?.products[0]?.item_id,
                })
              ),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const renderProducts = (data) => {
    return (
      <View key={data.key} style={styles.productsView}>
        <View style={styles.imageView}>
          <Image source={{ uri: data.image }} style={styles.image} />
        </View>
        <View
          style={{
            flex: 1,
            height: "100%",
            justifyContent: "space-around",
          }}
        >
          <View>
            <Text style={styles.name}>{data.products[0]?.name}</Text>
            <View style={styles.priceView}>
              <Text style={styles.price}>&#8377;{data.products[0]?.price}</Text>
            </View>
          </View>
          <View style={styles.qtyView}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => handleMinusButtonClick(data)}
                style={styles.minusbtn}
              >
                <Minus size="16" color="black" />
              </TouchableOpacity>
              <Text>{data.products[0]?.qty}</Text>
              <TouchableOpacity
                onPress={() => handleAddButtonClick(data)}
                style={styles.addbtn}
              >
                <Add size="16" color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data)}>
              <Trash size="16" color="red" style={{ padding: 8 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const NotLoggedInBanner = () => {
    return (
      <TouchableOpacity
        style={styles.banner}
        onPress={() => {
          navigation.navigate("Login");
          dispatch(clickRequest("cart"));
        }}
      >
        <Text style={styles.bannerText}>
          To ensure seamless shopping experience, Please LOGIN/SIGNUP !
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size="20" color="black" style={{ padding: 12 }} />
          </TouchableOpacity>
          <Text style={styles.hdrText}>My Shopping Cart</Text>
        </View>
        {!token && <NotLoggedInBanner />}

        <View style={{ paddingHorizontal: 16 }}>
          {cart && cart.length > 0 ? (
            cart.map(renderProducts)
          ) : (
            <View
              style={{
                alignSelf: "center",
                marginTop: hp("25%"),
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/trolley.png")}
                style={{
                  height: hp(20),
                  width: hp(20),

                  alignSelf: "center",
                }}
              />
              <Text style={styles.empty}>Your cart is empty</Text>

              <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
                style={{
                  ...styles.button,
                  borderColor: colors.black,
                  borderWidth: 1,
                  backgroundColor: "white",
                  alignSelf: "center",
                  marginTop: hp("2%"),
                }}
              >
                <Text style={{ ...styles.buttonText, color: "black" }}>
                  Shop Now
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {cart && cart.length > 0 ? (
            <View
              style={{
                paddingHorizontal: 16,
                marginTop: 40,
                marginBottom: 80,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: colors.black,
                  fontWeight: "500",
                  letterSpacing: 1,
                  marginBottom: 20,
                }}
              >
                Order Info
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    maxWidth: "80%",
                    color: colors.black,
                    opacity: 0.5,
                  }}
                >
                  Subtotal
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    color: colors.black,
                    opacity: 0.8,
                  }}
                >
                  &#8377;{calculateTotal()}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 22,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    maxWidth: "80%",
                    color: colors.black,
                    opacity: 0.5,
                  }}
                >
                  Shipping Charges
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    color: colors.black,
                    opacity: 0.8,
                  }}
                >
                  &#8377;{cart[0].shipping_charge}
                </Text>
              </View>
              <View style={styles.shipView}>
                <Text style={styles.shipTotal}>Total</Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: colors.black,
                  }}
                >
                  &#8377;{calculateTotal() + cart[0].shipping_charge}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </ScrollView>

      {cart && cart.length > 0 ? (
        <View style={styles.checkView}>
          <TouchableOpacity
            onPress={() => (calculateTotal() != 0 ? checkOut() : null)}
            style={styles.checkoutbtn}
          >
            <Text style={styles.checkText}>
              CHECKOUT (&#8377;{calculateTotal() + cart[0].shipping_charge} )
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007bff",

    width: wp("35%"),
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  banner: {
    backgroundColor: colors.black,
    padding: 3.5,
    alignItems: "center",
    marginTop: hp("1.5%"),
  },
  bannerText: {
    color: "white",
    fontSize: 13,
  },
  checkoutbtn: {
    width: "86%",
    height: "90%",
    backgroundColor: colors.yellow,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: {
    fontSize: 17,
    fontWeight: "500",
    letterSpacing: 1,
    color: "white",
    textTransform: "uppercase",
  },
  checkView: {
    position: "absolute",
    bottom: 10,
    height: "6%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  shipView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  shipTotal: {
    fontSize: 12,
    fontWeight: "400",
    maxWidth: "80%",
    color: colors.black,
    opacity: 0.5,
  },
  productsView: {
    width: "100%",
    height: 100,
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("4%"),
  },
  imageView: {
    width: "30%",
    height: 100,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: 10,
    marginRight: 22,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  name: {
    maxWidth: "100%",
    color: colors.black,
    fontWeight: "600",
    letterSpacing: 1,
    fontSize: 14,
  },
  priceView: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.6,
  },
  price: {
    fontSize: 14,
    fontWeight: "400",
    maxWidth: "85%",
    marginRight: 4,
  },
  qtyView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  minusbtn: {
    borderRadius: 100,
    marginRight: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.yellow,
    opacity: 0.5,
  },
  addbtn: {
    borderRadius: 100,
    marginLeft: 20,
    padding: 4,
    borderWidth: 1,
    borderColor:colors.yellow,
    opacity: 0.5,
  },
  safeView: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    position: "relative",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 16,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  hdrText: {
    fontSize: 20,
    color: colors.black,
    fontWeight: "bold",
    marginRight: wp("25%"),
  },
  empty: {
    alignSelf: "center",
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#333",
    marginTop: hp("2%"),
  },
  shopbtn: {},
});
