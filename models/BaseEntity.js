const { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } = require("firebase/firestore");
const CustomError = require("../library/Error");
const { HTTP_CODES } = require("../library/Enum");
const {db} = require("../firebase/config/config")

class BaseEntity {
    constructor(collectionName) {
        if (new.target === BaseEntity) {
            throw new Error("Cannot instantiate abstract class BaseEntity directly.");
        }
        this.collectionName = collectionName;
        this.collectionRef = collection(db, this.collectionName);
    }

    async create(data) {
        try {
            const docRef = await addDoc(this.collectionRef, data);
            return docRef.id;
        } catch (error) {
            throw new CustomError(HTTP_CODES.INT_SERVER_ERROR, `${this.collectionName} Creation Failed`, error.message);
        }
    }

    static async getAll(collectionName) {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            throw new CustomError(HTTP_CODES.INT_SERVER_ERROR, `Failed to Retrieve ${collectionName}`, error.message);
        }
    }

    static async getById(collectionName, id) {
        try {
            const entityDoc = await getDoc(doc(db, collectionName, id));
            if (entityDoc.exists()) {
                return { id: entityDoc.id, ...entityDoc.data() };
            } else {
                throw new CustomError(HTTP_CODES.NOT_FOUND, `${collectionName} with ID ${id} does not exist`);
            }
        } catch (error) {
            throw new CustomError(HTTP_CODES.INT_SERVER_ERROR, `Failed to Retrieve ${collectionName}`, error.message);
        }
    }

    static async update(collectionName, id, updatedData) {
        try {
            const entityDoc = doc(db, collectionName, id);
            await updateDoc(entityDoc, updatedData);
        } catch (error) {
            throw new CustomError(HTTP_CODES.INT_SERVER_ERROR, `Failed to Update ${collectionName}`, error.message);
        }
    }

    static async delete(collectionName, id) {
        try {
            const entityDoc = doc(db, collectionName, id);
            await deleteDoc(entityDoc);
        } catch (error) {
            throw new CustomError(HTTP_CODES.INT_SERVER_ERROR, `Failed to delete ${collectionName}`, error.message);
        }
    }
}

module.exports = BaseEntity;
