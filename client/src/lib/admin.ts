import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import config from "../../database";

const firebaseApp = initializeApp(config);


export const storage = getStorage(firebaseApp);

export default firebaseApp;
