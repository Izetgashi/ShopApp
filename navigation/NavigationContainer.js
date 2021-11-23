import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import ShopNavigation from "./ShopNavigation";

const NavigationContainers = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    if (!isAuth) {
      navigationRef.navigate('Auth')
    }
  }, [isAuth]);

  return (
    <NavigationContainer ref={navigationRef}>
      <ShopNavigation />
    </NavigationContainer>
  );
};

export default NavigationContainers;
