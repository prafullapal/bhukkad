import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useEffect } from "react";

const PreparingOrderScreen = ({ navigation }) => {
	useEffect(() => {
		setTimeout(() => {
			navigation.navigate("Delivery");
		}, 4000);
	});
	return (
		<SafeAreaView className="bg-white flex-1 justify-center items-center">
			<Animatable.Image
				source={require("../assets/orderLoading.gif")}
				animation="slideInUp"
				className="h-96 w-96"
			/>

			<Animatable.Text
				animation="slideInUp"
				iterationCount={1}
				className="text-lg my-10 text-red-400 font-bold text-center"
			>
				Waiting for Restaurant to accept your order!
			</Animatable.Text>
			<Progress.Circle size={60} indeterminate={true} color="red" />
		</SafeAreaView>
	);
};

export default PreparingOrderScreen;
