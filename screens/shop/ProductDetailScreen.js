import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";

function ProductDetailScreen({ route }) {
  const selectedProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const carts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { productId } = route.params;
  const selectedProduct = selectedProducts.find((p) => p.id === productId);

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Card"
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
}
// not working
// ProductDetailScreen.defaultNavigationOptions = (navData) => {
//   return {
//     headerTitle: "lol",
//   };
// };

const styles = StyleSheet.create({
  container: {},
  image: {
    width: "100%",
    height: 300,
  },
  actions: {
    marginVertical: 20,
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: "open-sans",
  },
});

export default ProductDetailScreen;
