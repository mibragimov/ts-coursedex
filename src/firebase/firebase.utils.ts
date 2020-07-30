import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDRfIZ6o-mt2NlrpO2qWppehMCUoV2sDIU',
  authDomain: 'courses-dev-3b44f.firebaseapp.com',
  databaseURL: 'https://courses-dev-3b44f.firebaseio.com',
  projectId: 'courses-dev-3b44f',
  storageBucket: 'courses-dev-3b44f.appspot.com',
  messagingSenderId: '994250019511',
  appId: '1:994250019511:web:a70e50650b50667eae7332',
  measurementId: 'G-1RW8S13191',
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (
  userAuth: firebase.User | null,
  additionalData?: {}
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addDocumentToCollection = async (data: {}) => {
  const collectionRef = firestore.collection('courses');

  try {
    await collectionRef.doc().set(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const readDocumentsFromCollection = async () => {
  const collectionRef = firestore.collection('courses');
  const snapshot = await collectionRef.get();
  let collectionArr: {}[] = [];
  try {
    snapshot.forEach((doc) => {
      collectionArr.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return collectionArr;
  } catch (error) {
    console.log(error.message);
  }
};

export const readDocumentById = async (id: string) => {
  const documentRef = firestore.collection('courses').doc(id);
  const documentSnapshot = await documentRef.get();

  try {
    if (documentSnapshot.exists) {
      return documentSnapshot.data();
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();
