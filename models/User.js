const {db} = require("../firebase/config/config");
const {collection,addDoc,getDocs,doc,updateDoc,deleteDoc,getDoc} = require("firebase/firestore");
const CustomError = require("../library/Error");
const { HTTP_CODES } = require("../library/Enum");

class User{
    constructor(uuid,email,password,name,surname,phone_number,roles=[]){
        this.uuid = uuid; // Firebase Auth UUID
        this.email = email;
        this.password=password;
        this.name=name;
        this.surname=surname;
        this.phone_number=phone_number;
        this.roles = roles; // Userrole ids
        this.userCollections = collection(db,"users");
    }

    async create(){
        try {
            const docRef = await addDoc(this.userCollections,
                {
                    uuid : this.uuid,
                    email : this.email,
                    password : this.password,
                    name : this.name,
                    surname : this.surname,
                    phone_number : this.phone_number,
                    roles : this.roles,
                }
            );
            return docRef.id;
        } catch (error) {
            throw new CustomError(HTTP_CODES.INT_SERVER_ERROR,"User Creation Failed",error.message);
        }
    }

    static async getAll(){
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            return querySnapshot.docs.map(doc=>({id:doc.id,...doc.data()}));
        } catch (error) {
            throw new CustomError(HTTP_CODES.INT_SERVER_ERROR,"Failed to Retrieve Users",error.message);
        }
    }

    static async getById(userId){
        try {
            const userDoc = await getDoc(doc(db,"users",userId));
            if (userDoc.exists()) {
                return {id:userDoc.id,...userDoc.data()};
            }else{
                throw new CustomError(HTTP_CODES.NOT_FOUND,`User with ID ${userId} does not exist`);
            }
        } catch (error) {
            throw new CustomError(HTTP_CODES.INT_SERVER_ERROR,"Failed to Retrieve User",error.message);
        }
    }

    static async update(userId,updatedData) {
        try {
            const userDoc = doc(db,"users",userId);
            await updateDoc(userDoc,updatedData);
        } catch (error) {
            throw new CustomError(HTTP_CODES.INT_SERVER_ERROR,"Failed to Update User",error.message);
        }
    }

    static async delete(userID){
        try {
            const userDoc = doc(db,"users",userID);
            await deleteDoc(userDoc);
        } catch (error) {
            throw new CustomError(500, "Failed to delete user", error.message);
        }
    }
}

module.exports = User;