const functions = require( 'firebase-functions' );

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const cors = require( ‘cors’ )( { origin: true } );
const admin = require( ‘firebase - admin’ );
admin.initializeApp();
const database = admin.database().ref( ‘/items’);


