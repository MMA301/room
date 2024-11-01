import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Appbar, ActivityIndicator, Divider } from 'react-native-paper';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../utils/firebase';

const HistoryBooking = ({ route, navigation }) => {
	const { userId } = route.params;
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const db = getDatabase(app);
		const bookingsRef = ref(db, 'bookings');

		const unsubscribe = onValue(
			bookingsRef,
			(snapshot) => {
				const data = snapshot.val();
				if (data) {
					const userBookings = Object.values(data).filter(
						(booking) => booking.userId === userId,
					);
					setBookings(userBookings);
				} else {
					setBookings([]);
				}
				setLoading(false);
			},
			(error) => {
				console.error('Error fetching bookings:', error);
				Alert.alert('Error', 'Unable to load booking history.');
				setLoading(false);
			},
		);

		return () => unsubscribe();
	}, [userId]);

	const renderBooking = ({ item }) => (
		<Card style={styles.card}>
			<Card.Content>
				<View style={styles.cardContent}>
					<Text style={styles.bookingText}>
						Phòng ID: <Text style={styles.highlight}>{item.roomId}</Text>
					</Text>
					<Text style={styles.bookingText}>
						Check-in:{' '}
						<Text style={styles.highlight}>
							{new Date(item.checkInDate).toLocaleDateString()}
						</Text>
					</Text>
					<Text style={styles.bookingText}>
						Check-out:{' '}
						<Text style={styles.highlight}>
							{new Date(item.checkOutDate).toLocaleDateString()}
						</Text>
					</Text>
					<Text style={styles.statusText}>
						Trạng thái: <Text style={styles.highlight}>{item.status}</Text>
					</Text>
				</View>
			</Card.Content>
		</Card>
	);

	if (loading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#FF5A5F" />
				<Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title="Lịch Sử Đặt Phòng" />
			</Appbar.Header>

			<Divider style={styles.divider} />

			<FlatList
				data={bookings}
				renderItem={renderBooking}
				keyExtractor={(item) => item.roomId}
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E8F0FE',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5F5F5',
	},
	loadingText: {
		marginTop: 10,
		fontSize: 16,
		color: '#333',
	},
	card: {
		margin: 10,
		borderRadius: 12,
		elevation: 5,
		backgroundColor: '#FFFFFF',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 8,
	},
	cardContent: {
		padding: 15,
	},
	bookingText: {
		fontSize: 16,
		marginVertical: 4,
		color: '#333',
	},
	statusText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#FF5A5F',
		marginTop: 5,
	},
	highlight: {
		fontWeight: 'bold',
		color: '#FF5A5F',
	},
	divider: {
		height: 1,
		backgroundColor: '#DADADA',
		marginVertical: 10,
	},
	list: {
		paddingBottom: 20,
	},
});

export default HistoryBooking;
