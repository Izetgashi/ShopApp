import React from "react";
import { StyleSheet, FlatList, Button, Alert, View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/Shop/ProductItem";
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/products";

function UserProductScreen(props) {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  const editProductHandler = (id) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      {
        text: "Cancel",
        style: "default",
      },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(productActions.deleteProduct(id)),
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding:20, textAlign: 'center'}}>No products found, maybe start creating some?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              deleteHandler(itemData.item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default UserProductScreen;
