import React, { useEffect, useLayoutEffect } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { urlFor } from "../sanity";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	ArrowLeftIcon,
	MapPinIcon,
	StarIcon,
} from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectBasketItems } from "../features/basketSlice";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = ({ route, navigation }) => {
	const dispatch = useDispatch();
	const items = useSelector(selectBasketItems);
	const {
		id,
		imgUrl,
		title,
		rating,
		genre,
		address,
		short_description,
		dishes,
		long,
		lat,
	} = route.params;

	useEffect(() => {
		dispatch(
			setRestaurant({
				id,
				imgUrl,
				title,
				rating,
				genre,
				address,
				short_description,
				dishes,
				long,
				lat,
			})
		);
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);
	return (
		<SafeAreaView className="h-full">
			<ScrollView className={items.length > 0 ? "mb-16" : ""}>
				<View className="relative">
					<Image
						source={{ uri: urlFor(imgUrl).url() }}
						className="w-full h-56 p-4 bg-gray-200"
					/>
				</View>
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="absolute rounded-full top-4 left-4 bg-gray-100 p-2"
				>
					<ArrowLeftIcon size={20} opacity={0.5} color={"red"} />
				</TouchableOpacity>

				<View className="bg-white">
					<View className="px-4 pt-4">
						<Text className="text-3xl font-bold">{title}</Text>
					</View>

					<View className="px-4 flex-row items-center">
						<StarIcon color={"red"} />
						<Text className="text-gray-500">
							<Text>{rating}</Text> | {genre}
						</Text>
					</View>

					<View className="px-4 flex-row items-center">
						<MapPinIcon color={"red"} />
						<Text className="text-gray-500">Nearby {address}</Text>
					</View>

					<Text className="px-4 pt-2 text-gray-500">{short_description}</Text>
				</View>

				<TouchableOpacity></TouchableOpacity>

				{dishes.map((dish) => (
					<DishRow
						key={dish._id}
						id={dish._id}
						name={dish.name}
						description={dish.short_description}
						price={dish.price}
						image={dish.image}
					/>
				))}
			</ScrollView>
			{items.length > 0 && <BasketIcon navigation={navigation} />}
		</SafeAreaView>
	);
};

export default RestaurantScreen;
