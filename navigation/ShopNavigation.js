import * as React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import DrawerNavigation from "./DrawerNavigation";
import EditProductScreen from "../screens/user/EditProductScreen";
import HeaderButton from "../components/UI/HeaderButton";
import AuthScreen from "../screens/user/AuthScreen";
import StartUpScreen from "../screens/StartUpScreen";
const Stack = createNativeStackNavigator();

export default function ShopNavigation() {
  return (
      <Stack.Navigator
        initialRouteName="StartScreen"
        defaultScreenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.primary : "",
          },
          headerTitleStyle: {
            fontFamily: "open-sans-bold",
          },
          headerBackTitleStyle: {
            fontFamily: "open-sans",
          },
          headerTintColor: Platform.OS === "android" ? Colors.primary : "white",
        }}
      >
         <Stack.Screen name="StartScreen" component={StartUpScreen} />
        <Stack.Screen
          name="Auth"
          options={{
            headerTitle: "Authenticate",
            headerTitleAlign: "center",
            headerTintColor: "#8360c3",
          }}
          component={AuthScreen}
        />
        <Stack.Screen
          name="Products"
          options={{
            headerShown: false,
          }}
          component={DrawerNavigation}
        />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
        <Stack.Screen
          name="EditProduct"
          component={EditProductScreen}
          options={({ route }) => {
            const { submitFn } = route.params;  
            const { productId } = route.params;
            return {
              headerTitle: productId !== "0" ? "Edit Product" : "Add Product",
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Save"
                    iconName={
                      Platform.OS === "android"
                        ? "md-checkmark"
                        : "ios-checkmark"
                    }
                    onPress={submitFn}
                  />
                </HeaderButtons>
              ),
            };
          }}
        />
        <Stack.Screen
          options={{ headerTitle: "Your cart" }}
          name="Cart"
          component={CartScreen}
        />
      </Stack.Navigator>
  );
}
