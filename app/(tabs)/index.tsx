import { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
	id: number,
	name: string,
	email: string,
}

export default function HomeScreen ()
{
	const [users, setUsers] = useState<User[]>([]); //using the Generics by TS
	const [loading, setLoading] = useState<boolean>(true);
	const [search, setSearch] = useState<string>("");
	// const [filteredUsers, setFilteredUsers] = useState<User[]>([]); //INFORMATION: Don't remove

	useEffect(() =>
	{
		fetchUsers();

	},[]); //seting the first time as empty array...

	function setCustomTimeout (seconds: number)
	{
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(true);
			}, seconds * 1000);
		});
	}

	function fetchUsers ()
	{
		fetch("https://jsonplaceholder.typicode.com/users")
		.then(async (r) => {
			let data: User [] = await r.json();

			data = data.map((d) => {
				return { email: d.email, id: d.id, name: d.name};
			});

			let dataLong = Array(1000)
			.fill(null)
			.map((_, i) => {
				return data.map((u, j) => {
					return {
						...u,
						id: u.id + (i * data.length), //@overwrite id to be unique
					}
				});
			})
			.flat();

			await setCustomTimeout(5); //simulating a delay...
			
			setUsers(dataLong);
		})
		.catch((e) => {
			console.log("error: ", e);
		})
		.finally(() => {
			setLoading(false);
		})
	}

	const usersFiltered = useMemo(() => //useMemo is a hook by performance optimization
	{
		if (search.trim() === "") { return users; }

		return users.filter((u) => 
			u.name.toLowerCase().includes(search.toLowerCase()) ||
			u.email.toLowerCase().includes(search.toLowerCase())
		);
	}, [search, users]);

	// INFORMATION: Don't remove
	// function onSearch (value: string)
	// {
	// 	if (value.trim() === "")
	// 	{ 
	// 		setFilteredUsers(users);
	// 	}
	// 	else
	// 	{
	// 		const filtered = users.filter((u) => 
	// 			u.name.toLowerCase().includes(value.toLowerCase()) ||
	// 			u.email.toLowerCase().includes(value.toLowerCase())
	// 		);
	// 		setFilteredUsers(filtered);
	// 	}

	// 	setSearch(value);
	// }

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Dados do ERP (teste 1)</Text>
			{loading && <Text>Wait... loading...</Text>}
			<TextInput
				style={styles.input}
				value={search}
				onChangeText={setSearch}
			/>
			<FlatList
				data={usersFiltered}
				keyExtractor={(i) => i.id.toString()}
				initialNumToRender={20} //how many items to render initialy
				windowSize={5} //how many items to keep in memory
				removeClippedSubviews={true} //unmount components when outside of window
				renderItem={({item}) => {
					return (
						<Text style={styles.item}>{ item.id } - {item.name} ({item.email.toLowerCase() || ""})</Text>
					)
				}}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		alignItems: "center",
		backgroundColor: '#fff',
		borderColor: "black",
		borderWidth: 2,
		borderRadius: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20
	},
	item: {
		backgroundColor: '#f2f2f2',
		padding: 10,
		borderRadius: 5,
		marginVertical: 5
	},
	input: {
		borderWidth: 2,
		borderColor: "black",
		width: "90%",
		borderRadius: 10,
		height: 40,
		marginBottom: 10,
		padding: 5
	}
});
