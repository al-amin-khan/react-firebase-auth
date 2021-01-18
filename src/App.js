import './App.css';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App() {
  const [signedIn, setSignedIn] = useState({
    isSignIn: false,
    displayName : '',
    email: '',
    photoURL: '',
  });


  const provider = new firebase.auth.GoogleAuthProvider();
  // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  // firebase.auth().useDeviceLanguage();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(result => {
      const credential = result.credential;
      const token = credential.accessToken;
      const user = result.user;
      const {displayName, email, photoURL} = user; 
      
      setSignedIn({
        isSignIn: true,
        displayName: displayName,
        email: email,
        photoURL: photoURL,
      });
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    })

  };

  const handleSignOut = () => {
    firebase.auth().signOut()
    .then(res => {
      const logout = {
        isSignIn: false,
        displayName: '',
        email: '',
        photoURL: '',
      }
      setSignedIn(logout);
    })
    .catch(error => console.log(error))
  };


  return (
    <div className="App">
      {
        signedIn.isSignIn ? 
        <button onClick={handleSignOut}>Logout</button>
        :
        <button onClick={handleSignIn}>Sign-in with Google</button>
      }
      {
        signedIn.isSignIn ?
      <div>
      <h2>Welcome, {signedIn.displayName}</h2>
      <p>Email: {signedIn.email}</p>
      <img src={signedIn.photoURL} alt={signedIn.displayName}/>
      </div>
      :
      <h2>You are not logged in.</h2>
      }

    </div>
  );
}

export default App;
