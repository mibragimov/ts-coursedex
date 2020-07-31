import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

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
  const user = firebase.auth().currentUser;

  try {
    await collectionRef.doc().set({
      ...data,
      owner: user?.uid,
    });
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

export const deleteDocumentFromCollection = async (id: string) => {
  const documentRef = firestore.collection('courses').doc(id);

  try {
    await documentRef.delete();
  } catch (error) {
    console.log(error.message);
  }
};

export const updateDocumentFromCollection = async (id: string, data: {}) => {
  const documentRef = firestore.collection('courses').doc(id);
  const documentSnapshot = await documentRef.get();
  try {
    if (documentSnapshot.exists) {
      await documentRef.update(data);
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();
