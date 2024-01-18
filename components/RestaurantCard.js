import { Image, Text, TouchableOpacity, View } from "react-native";
import { StarIcon, MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";

const RestaurantCard = ({
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
	navigation,
}) => {
	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("Restaurant", {
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
			}
			className="bg-white mr-3 shadow"
		>
			<Image
				source={{ uri: urlFor(imgUrl).url() }}
				className="h-36 w-64 rounded-sm"
			/>
			<View className="flex-row justify-between px-2">
				<Text className="text-lg font-bold">{title}</Text>
				<View className="flex-row items-center">
					<StarIcon color="red" size={20} />
					<Text className="text-red-400">{rating}</Text>
				</View>
			</View>
			<View className="">
				<Text className="text-gray-500 px-2">
					{genre} {/*  | {short_description} */}
				</Text>
			</View>

			<View className="flex-row px-2 pb-2 items-center">
				<MapPinIcon color="gray" size={22} opacity={0.4} />
				<Text className="text-xs text-gray-400">Nearby {address}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default RestaurantCard;
