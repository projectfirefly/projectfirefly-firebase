const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Set GOOGLE_APPLICATION_CREDENTIALS env variable to private key path
// https://firebase.google.com/docs/functions/local-emulator
admin.initializeApp();

exports.testCollectionCreate = functions.https.onRequest(async (req, res) => {
    const data = {
        first_name: "george",
        last_name: "lopez",
    };
    const db = admin.firestore();
    const newDoc = await db.collection("asdf").add(data);
    newDoc.collection("1234").add({ yo: "yo" });
});

exports.createUser = functions.auth.user().onCreate(async user => {
    const db = admin.firestore();
    // const newDoc = await db.collection("users").add({
    //     id: user.uid
    // });
    console.log(user);
    const newDoc = await db.collection("users").doc(user.uid).set({
        first_name: "",
        last_name: "",
    })
});
