import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button, Divider, Appbar } from 'react-native-paper';
import { formatCurrency } from 'react-native-format-currency';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../utils/firebase';

const RoomDetailScreen = ({ route, navigation }) => {
	const { roomId } = route.params;

	const [room, setRoom] = useState(null);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [showStartDatePicker, setShowStartDatePicker] = useState(false);
	const [showEndDatePicker, setShowEndDatePicker] = useState(false);

	useEffect(() => {
		const fetchRoomDetails = async () => {
			const db = getDatabase(app);
			const roomRef = ref(db, `rooms/${roomId}`);

			onValue(
				roomRef,
				(snapshot) => {
					const data = snapshot.val();
					if (data) {
						setRoom(data);
					} else {
						Alert.alert('Error', 'Room not found.');
					}
				},
				{
					onlyOnce: true,
				},
			);
		};

		fetchRoomDetails();
	}, [roomId]);

	const onStartDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || startDate;
		setShowStartDatePicker(false);
		setStartDate(currentDate);
	};

	const onEndDateChange = (event, selectedDate) => {
		const currentDate = selectedDate || endDate;
		setShowEndDatePicker(false);
		setEndDate(currentDate);
	};

	const handleBooking = () => {
		Alert.alert(
			'Xác nhận đặt phòng',
			`Bạn có chắc chắn muốn đặt phòng từ ngày ${startDate.toLocaleDateString()} đến ${endDate.toLocaleDateString()}?`,
			[
				{ text: 'Hủy', style: 'cancel' },
				{ text: 'Xác nhận', onPress: () => navigation.goBack() },
			],
		);
	};

	if (!room) {
		return (
			<View style={styles.loadingContainer}>
				<Text>Đang tải dữ liệu...</Text>
			</View>
		);
	}

	const [pricePerNight] = formatCurrency({
		amount: room.pricePerNight,
		code: 'VND',
	});

	return (
		<View style={styles.container}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.goBack()} />
				<Appbar.Content title={room.title} />
			</Appbar.Header>
			<ScrollView contentContainerStyle={styles.content}>
				<Image source={{ uri: room.imageURL }} style={styles.image} />
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{room.title}</Text>
					<Text style={styles.description}>{room.description}</Text>
					<Text style={styles.price}>Giá: {pricePerNight}/đêm</Text>
					<Text style={styles.amenities}>
						Tiện nghi: {room.amenities.join(', ')}
					</Text>

					<Text style={styles.sectionTitle}>Vị trí</Text>
					<MapView
						style={styles.map}
						initialRegion={{
							latitude: room.location.latitude,
							longitude: room.location.longitude,
							latitudeDelta: 0.01,
							longitudeDelta: 0.01,
						}}
					>
						<Marker
							coordinate={{
								latitude: room.location.latitude,
								longitude: room.location.longitude,
							}}
							title={room.title}
							description={room.description}
						/>
					</MapView>

					<Divider style={styles.divider} />

					<View style={styles.datePickerContainer}>
						<Text style={styles.sectionTitle}>Chọn ngày đặt phòng</Text>
						<View style={styles.datePicker}>
							<Button
								mode={'outlined'}
								onPress={() => setShowStartDatePicker(true)}
							>
								Ngày bắt đầu: {startDate.toLocaleDateString()}
							</Button>
							{showStartDatePicker && (
								<DateTimePicker
									value={startDate}
									mode="date"
									display="default"
									onChange={onStartDateChange}
								/>
							)}
						</View>
						<View style={styles.datePicker}>
							<Button
								mode={'outlined'}
								onPress={() => setShowEndDatePicker(true)}
							>
								Ngày kết thúc: {endDate.toLocaleDateString()}
							</Button>
							{showEndDatePicker && (
								<DateTimePicker
									value={endDate}
									mode="date"
									display="default"
									onChange={onEndDateChange}
								/>
							)}
						</View>
					</View>

					<Button
						mode="contained"
						style={styles.bookButton}
						onPress={handleBooking}
					>
						Đặt phòng
					</Button>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5F5F5',
	},
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	content: {
		paddingBottom: 20,
	},
	image: {
		width: '100%',
		height: 250,
	},
	infoContainer: {
		padding: 15,
		backgroundColor: '#fff',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		marginTop: -10,
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 10,
		color: '#333',
	},
	description: {
		fontSize: 16,
		color: '#666',
		marginBottom: 10,
	},
	price: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#FF5A5F',
		marginBottom: 10,
	},
	amenities: {
		fontSize: 14,
		color: '#666',
		marginBottom: 15,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333',
		marginTop: 20,
		marginBottom: 10,
	},
	map: {
		width: '100%',
		height: 200,
		borderRadius: 10,
	},
	divider: {
		height: 1,
		backgroundColor: '#DADADA',
		marginVertical: 20,
	},
	datePickerContainer: {
		marginBottom: 15,
	},
	datePicker: {
		marginBottom: 10,
	},
	bookButton: {
		backgroundColor: '#FF5A5F',
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 20,
	},
});

export default RoomDetailScreen;
