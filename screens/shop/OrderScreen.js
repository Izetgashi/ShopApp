import React from "react";
import { useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/Shop/OrderItem";
import * as ordersActions from  '../../store/actions/orders'

function OrderScreen(props) {
  const { orders } = useSelector((state) => state.orders);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(ordersActions.fetchOrders())
  }, [dispatch])

  if(orders.length === 0){
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{fontSize: 20, fontWeight: 'bold', padding:20, textAlign: 'center'}}>No orders yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderItem
            amount={item.totalAmount}
            date={item.date}
            items={item.items}  
          />
        )}
      />
   
    </View>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
  },
});

export default OrderScreen;
