function loadJSON2DB(dataSet) {
  dataSet &&
    Object.keys(dataSet).forEach(function(key) {
      var nestedContent = dataSet[key];
      console.log(key.toString());
      if (typeof nestedContent === "object") {
        Object.keys(nestedContent).forEach(function(docTitle) {
          admin
            .firestore()
            .collection(key)
            .doc(docTitle)
            .set(nestedContent[docTitle])
            .then(function(res) {
              console.log("Document successfully written!");
              return true;
            })
            ["catch"](function(error) {
              console.error("Error writing document: ", error);
              return false;
            });
        });
      }
    });
  return false;
}

var admin = require("./node_modules/firebase-admin");
var serviceAccount = require("./service-key.json");
var jsonData = require("./import-file.json");
var dbURL = "https://projectname.firebaseio.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: dbURL
});

if (loadJSON2DB(jsonData)) {
  console.log("Data loaded");
} else {
  console.log("Data did not load");
}
