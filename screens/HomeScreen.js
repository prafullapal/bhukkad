import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	MapPinIcon,
	ChevronDownIcon,
	UserCircleIcon,
	MagnifyingGlassIcon,
	MicrophoneIcon,
} from "react-native-heroicons/solid";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

export default function HomeScreen({ navigation }) {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	});

	const [featuredCategories, setFeaturedCategories] = useState([]);

	useEffect(() => {
		client
			.fetch(
				`
		*[_type == "featured"] {
			...,
			restaurants[]->{
				...,
				dishes[]->
			}
		}`
			)
			.then((data) => {
				setFeaturedCategories(data);
			});
	}, []);
	return (
		<SafeAreaView className="bg-white">
			{/* Header */}
			<View className="flex-row items-center justify-between p-4 bg-white">
				{/* Location */}
				<View className="flex-row items-center">
					<MapPinIcon size={30} color="red" />
					<View className="flex-col">
						<View className="flex-row items-center">
							<Text className="font-bold">Home</Text>
							<ChevronDownIcon size={18} color="gray" />
						</View>
						<Text className="text-gray-500">Kanpur, UP, India</Text>
					</View>
				</View>
				{/* Profile */}
				<UserCircleIcon size={38} color="pink" />
			</View>
			{/* Search */}
			<View className="m-2 px-4 py-2 bg-white border rounded-lg border-gray-300 flex-row justify-between">
				<View className="flex-row gap-2 items-center">
					<MagnifyingGlassIcon color="red" size={24} />
					<TextInput
						className="text-gray-400 font-semibold"
						placeholder="Search 'momos'"
					/>
				</View>
				<MicrophoneIcon color="red" size={24} />
			</View>

			{/* Scrollable Content */}
			<ScrollView
				className="bg-gray-100"
				contentContainerStyle={{ paddingBottom: 100 }}
			>
				{/* Recommended */}

				{/* Categories */}
				<Categories />
				{/* Featured */}
				{featuredCategories?.map((item, index) => (
					<FeaturedRow
						key={item._id}
						id={item._id}
						title={item.name}
						description={item.short_description}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}
