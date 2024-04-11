import { Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";

// UTILS
import nav from "../../utils/navigation";

// STYLES
import StylesOffer from "./offer";
const styles = StylesOffer();

const Offer = ({ offer }) => {
	const navigation = useNavigation();

	return (
		<>
			<Pressable onPress={() => nav("Offer", navigation, { id: offer._id })}>
				<View>
					<Image
						source={{
							uri: offer.photos[0].url,
						}}
						style={{ width: "100%", height: 150 }}
					/>
					<Text>{offer.price}</Text>
				</View>
				<View>
					<View>
						<Text>{offer.title}</Text>
						<View>
							<Text>{offer.ratingValue} stars</Text>
							<Text>{offer.reviews} reviews</Text>
						</View>
					</View>
					<Image
						source={{ uri: offer.user.account.photo.url }}
						style={{ width: 100, height: 100 }}
					/>
				</View>
			</Pressable>
		</>
	);
};

export default Offer;
