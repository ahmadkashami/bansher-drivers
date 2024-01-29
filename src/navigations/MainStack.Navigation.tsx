import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { AppColorsTheme2 } from "../contants/Colors";
import { StatusBar } from "expo-status-bar";
const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

function BottomTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarInactiveTintColor: AppColorsTheme2.white,
      tabBarActiveTintColor: AppColorsTheme2.secondary,
      tabBarStyle: {
        backgroundColor: AppColorsTheme2.primary
      },
    }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="home-outline" size={size} color={color} />;
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="person-outline" size={size} color={color} />;
          },
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
const MainStackNavigation = () => {
  return (
    <>
      <StatusBar animated={true} style="auto" />
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>

    </>

  );
};

export default MainStackNavigation;

const styles = StyleSheet.create({});
