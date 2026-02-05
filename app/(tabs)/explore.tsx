import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen ()
{
	return (
		<SafeAreaView style={styles.container}>
			<Text>Hello explore</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#949494',
		padding: 10,
	}
});