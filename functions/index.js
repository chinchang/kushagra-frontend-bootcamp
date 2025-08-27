/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { onDocumentWritten } = require("firebase-functions/v2/firestore");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// create a firestore trigger function that tells if the document was created, udpated or deleted
exports.firestoreTrigger = onDocumentWritten(() => {
  console.log("Firestore trigger function executed");

  // add a message in the `logs` collection
  const message = "Firestore document was created/updated/deleted";
  const logsCollection = collection(db, "logs");
  await addDoc(logsCollection, { message });
});

// create a cron job that runs every day at 00:00 UTC
exports.cronJob = onSchedule("0 0 * * *", () => {
  console.log("Cron job executed");
});
