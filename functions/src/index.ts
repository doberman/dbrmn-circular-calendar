import functions = require( "firebase-functions" );

import type {Response, https} from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloEurope = functions.region("europe-west1").https.onRequest(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (req: https.Request, response: Response<any>) => {
      functions.logger.info("Hello logs!", {structuredData: true});
      response.send("Hello from Firebase!");
    }
);
