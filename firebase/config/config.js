const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage"); 

const firebaseConfig = {
    apiKey: "AIzaSyBVnbmE-qIdIQCBoMDx32ivVlAoWcQZ8W0",
    authDomain: "task-assignment-project-456f8.firebaseapp.com",
    projectId: "task-assignment-project-456f8",
    storageBucket: "task-assignment-project-456f8.appspot.com",
    messagingSenderId: "140257205626",
    appId: "1:140257205626:web:ab768167b4a98943b20ac3"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp); 

module.exports = { firebaseApp, db, storage }; 
