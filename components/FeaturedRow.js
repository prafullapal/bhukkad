import { ScrollView, Text, View } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/solid";
import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import client from "../sanity";

const FeaturedRow = ({ id, title, description, navigation }) => {
	const [restaurants, setRestaurants] = useState([]);
	useEffect(() => {
		client
			.fetch(
				`
		*[_type == 'featured' && _id == $id] {
			...,
			restaurants[]->{
				...,
				dishes[]->,
				type-> {
					name
				}
			},
		}[0]
		`,
				{ id }
			)
			.then((data) => {
				setRestaurants(data?.restaurants);
			});
	}, []);
	return (
		<View>
			<View className="mt-4 flex-row items-center justify-between px-4">
				<Text className="font-bold text-lg">{title}</Text>
				<ArrowRightIcon color="red" />
			</View>

			<Text className="text-xs text-gray-500 px-4">{description}</Text>
			<ScrollView
				horizontal
				contentContainerStyle={{
					paddingHorizontal: 15,
				}}
				showsHorizontalScrollIndicator={false}
				className="pt-4"
			>
				{/* Restaurants Cards */}
				{restaurants?.map((restaurant) => (
					<RestaurantCard
						key={restaurant._id}
						id={restaurant._id}
						imgUrl={restaurant.image}
						title={restaurant.name}
						rating={restaurant.rating}
						genre={restaurant.type?.name}
						address={restaurant.address}
						short_description={restaurant.short_description}
						dishes={restaurant.dishes}
						long={restaurant.long}
						lat={restaurant.lat}
						navigation={navigation}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default FeaturedRow;
