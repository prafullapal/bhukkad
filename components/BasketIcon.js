import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import Currency from "react-currency-formatter";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { ArrowRightCircleIcon } from "react-native-heroicons/solid";
import { useEffect, useState } from "react";

const BasketIcon = ({ navigation }) => {
	const items = useSelector(selectBasketItems);
	const total = useSelector(selectBasketTotal);

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("Basket")}
			className="bg-red-600 absolute bottom-0 h-16 w-full z-50"
		>
			<View className="flex-row items-center mx-auto pt-2">
				<Text className="text-white text-lg font-bold">
					{items.length} items added{" "}
				</Text>
				<ArrowRightCircleIcon color={"white"} />
			</View>
			<View className="mx-auto flex-row">
				<Text className="text-white">Total cart value:</Text>
				<Text className="text-white font-bold">
					<Currency quantity={total} currency="INR" />
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default BasketIcon;
