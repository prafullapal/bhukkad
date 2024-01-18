import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import RestaurantScreen from "./screens/RestaurantScreen";
import { store } from "./store";
import { Provider } from "react-redux";
import BasketScreen from "./screens/BasketScreen";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import DeliveryScreen from "./screens/DeliveryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Restaurant" component={RestaurantScreen} />
					<Stack.Screen
						name="Basket"
						component={BasketScreen}
						options={{
							presentation: "modal",
							animation: "slide_from_bottom",
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="PreparingOrder"
						component={PreparingOrderScreen}
						options={{
							presentation: "modal",
							animation: "slide_from_right",
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="Delivery"
						component={DeliveryScreen}
						options={{
							presentation: "modal",
							animation: "slide_from_right",
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
