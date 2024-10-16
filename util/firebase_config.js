
var admin = require("firebase-admin");
var serviceAccount = require("../cerv19-firebase-adminsdk-4tqtw-7cdabdb265");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cerv19-default-rtdb.firebaseio.com"
});

module.exports.admin = admin
