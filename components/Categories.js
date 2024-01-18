import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CategoriesCard from "./CategoriesCard";
import client, { urlFor } from "../sanity";

const Categories = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		client
			.fetch(
				`
		*[_type == "category"]
		`
			)
			.then((data) => {
				setCategories(data);
			});
	}, []);
	return (
		<ScrollView
			horizontal
			contentContainerStyle={{
				paddingHorizontal: 10,
				paddingTop: 10,
			}}
			showsHorizontalScrollIndicator={false}
		>
			{categories.map((category) => (
				<CategoriesCard
					key={category._id}
					imgUrl={urlFor(category.image).width(200).url()}
					title={category.name}
				/>
			))}
		</ScrollView>
	);
};

export default Categories;
