import React from "react";
import {
  View,
  Platform,
  SafeAreaView,
  Button,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import HeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";
import UserProductScreen from "../screens/user/UserProductScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={{ flex: 1 }}>
        <SafeAreaView>
          <View style={{ flex: 1, alignItems: "center", paddingTop: 20 }}>
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigation(props) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: "front",
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen
        name="Product"
        component={ProductOverviewScreen}
        options={({ navigation }) => ({
          headerTitle: "All Products",
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
                onPress={() => navigation.navigate("Cart")}
              />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={Colors.primary}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="Order"
        component={OrderScreen}
        options={({ navigation }) => ({
          headerTitle: "Your orders",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={Colors.primary}
            />
          ),
        })}
      />
      <Drawer.Screen
        name="User"
        component={UserProductScreen}
        options={({ navigation }) => ({
          headerTitle: "Your Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Cart"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Add"
                iconName={
                  Platform.OS === "android" ? "md-create" : "ios-create"
                }
                onPress={() =>
                  navigation.navigate("EditProduct", { productId: "0" })
                }
              />
            </HeaderButtons>
          ),
          drawerIcon: () => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={Colors.primary}
            />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
