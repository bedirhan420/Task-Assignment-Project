const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth");
const { firebaseApp } = require("../config/config");

class AuthService {
  constructor() {
    this.auth = getAuth(firebaseApp);
  }

  async signUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Sign Up Error: ${error.message}`);
    }
  }

  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Sign In Error: ${error.message}`);
    }
  }

  async signOut() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw new Error(`Sign Out Error: ${error.message}`);
    }
  }
}

module.exports = AuthService;
