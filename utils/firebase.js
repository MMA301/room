import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyBkZVF6R9qM3iUelygA9SU667NXKQ95vAg',
	authDomain: 'room-57777.firebaseapp.com',
	databaseURL:
		'https://room-57777-default-rtdb.asia-southeast1.firebasedatabase.app/',
	projectId: 'room-57777',
	storageBucket: 'room-57777.firebasestorage.app',
	messagingSenderId: '965212172453',
	appId: '1:965212172453:web:325771817710195a645d4c',
};

export const app = initializeApp(firebaseConfig);
