const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors");

// Set GOOGLE_APPLICATION_CREDENTIALS env variable to private key path
// https://firebase.google.com/docs/functions/local-emulator
admin.initializeApp();
const db = admin.firestore();

exports.testUserCreate = functions.https.onRequest(async (req, res) => {
    const user = {
        uid: "asdf1234",
        email: "asdf@asdf.asdf",
    };

    try {
        await db
            .collection("users")
            .doc(user.uid)
            .set(
                {
                    email: user.email,
                    first_name: "",
                    last_name: "",
                    academic_research: false,
                },
                { merge: true }
            )
            .then(() => {
                return db
                    .collection("users")
                    .doc(user.uid)
                    .collection("information")
                    .add({
                        city: "",
                        state: "",
                        zip: "",
                        country: "",
                        marital_status: "",
                        job: "",
                        education: "",
                        age: 0,
                        children_relation: "",
                    });
            })
            .then(() => {
                res.status(200).send("Nice");
            });
    } catch (error) {
        console.log(error);
    }
});

exports.addChild = functions.https.onRequest((req, res) => {
    //Why is this required?
    const corsFn = cors();
    corsFn(req, res, () => {
        db.collection("users")
            .doc(req.headers.uid)
            .collection("children")
            .add(req.body)
            .then((docRef) => {
                db.collection("users")
                .doc(req.headers.uid)
                .collection("children")
                .doc(docRef.id)
                .collection("avatar")
                .add({
                    color: 53,
                    accessory: 0,
                    nickname: ""
                })
                .then(() => {
                    res.status(200).send(req.headers.uid);
                })
            });
    });
});

exports.createUser = functions.auth.user().onCreate(async user => {
    try {
        await db
            .collection("users")
            .doc(user.uid)
            .set(
                {
                    email: user.email,
                    first_name: "",
                    last_name: "",
                    academic_research: false,
                },
                { merge: true }
            )
            .then(() => {
                return db
                    .collection("users")
                    .doc(user.uid)
                    .collection("information")
                    .add({
                        city: "",
                        state: "",
                        zip: "",
                        country: "",
                        marital_status: "",
                        job: "",
                        education: "",
                        age: 0,
                        children_relation: "",
                    });
            });
    } catch (error) {
        console.log(error);
    }
});
