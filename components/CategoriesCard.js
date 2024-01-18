import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const CategoriesCard = ({ imgUrl, title }) => {
	return (
		<TouchableOpacity className="relative mr-2">
			<Image source={{ uri: imgUrl }} className="w-20 h-20 rounded" />
			<Text className="absolute bottom-1 left-1 text-gray-100 font-bold">
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CategoriesCard;
