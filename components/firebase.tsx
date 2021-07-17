import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: 'AIzaSyB1jYuSuH0i9IulgOWmuyA3DtKiSh796Mg',
    authDomain: 'four-hour-body.firebaseapp.com',
    projectId: 'four-hour-body',
    storageBucket: 'four-hour-body.appspot.com',
    messagingSenderId: '997052779692',
    appId: '1:997052779692:web:ca3d12277c9e2e9796e309',
    measurementId: 'G-DTHBN5MQ6Z',
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const weights = firebase.firestore().collection('weights');
export default firebase;
