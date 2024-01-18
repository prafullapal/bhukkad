import { Image, Text, TouchableOpacity, View } from "react-native";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusIcon, PlusIcon } from "react-native-heroicons/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addToBasket,
	removeFromBasket,
	selectBasketItemsWithId,
} from "../features/basketSlice";

const DishRow = ({ id, name, description, price, image }) => {
	const [isPressed, setIsPressed] = useState(false);
	const items = useSelector((state) => selectBasketItemsWithId(state, id));
	const dispatch = useDispatch();

	useEffect(() => {
		if (items.length > 0) setIsPressed(true);
	}, []);

	const addItemToBasket = () => {
		dispatch(addToBasket({ id, name, description, price, image }));
	};

	const removeItemFromBasket = () => {
		if (!items.length > 0) return;
		else if (items.length === 1) setIsPressed(false);
		dispatch(removeFromBasket({ id }));
	};

	return (
		<>
			<View className="bg-white p-4 border border-gray-200">
				<View className="flex-row">
					<View className="flex-1 pr-2">
						<Text className="text-lg">{name}</Text>
						<Text className="text-xs text-gray-500">{description}</Text>
						<Text className="font-bold text-lg">
							<Currency quantity={price} currency="INR" />
						</Text>
					</View>
					<View className="relative">
						<Image
							style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
							source={{ uri: urlFor(image).url() }}
							className="h-24 w-24 bg-gray-300 p-4 rounded-md"
						/>
						<View
							className={`flex-row absolute inset-x-0 -bottom-2 py-1 mx-3 items-center justify-center space-x-1 rounded-md border border-red-600 ${
								isPressed ? "bg-red-500" : "bg-red-100"
							}`}
						>
							{!isPressed ? (
								<TouchableOpacity
									onPress={() => {
										setIsPressed(true);
										addItemToBasket();
									}}
								>
									<Text className="font-bold text-red-600">ADD</Text>
								</TouchableOpacity>
							) : (
								<>
									<TouchableOpacity onPress={removeItemFromBasket}>
										<MinusIcon color={"white"} size={16} />
									</TouchableOpacity>
									<Text className="text-white">{items.length}</Text>
									<TouchableOpacity onPress={addItemToBasket}>
										<PlusIcon color={"white"} size={16} className="font-bold" />
									</TouchableOpacity>
								</>
							)}
						</View>
					</View>
				</View>
			</View>
		</>
	);
};
export default DishRow;
