import functions = require("firebase-functions");

import type {Response, https} from "firebase-functions";

import {GoogleAuth} from "googleapis-common";
import {google} from "googleapis";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const fetchCalendarData = async (calendarId: string) => {
  const auth: GoogleAuth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT,
    scopes: ["https://www.googleapis.com/auth/cloud-platform", "https://www.googleapis.com/auth/calendar"],
  });

  const calendar = google.calendar({version: "v3", auth});
  const res = await calendar.events.list({
    calendarId: calendarId,
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  });
  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    return "error";
  }
  console.log("Upcoming 10 events:", events);

  return {"DBRMN_COP_STUDIO": events};
};

const calId = process.env.DBRMN_COP_STUDIO_CAL_ID;

export const events = functions
    .region("europe-west1").https.onRequest(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async (req: https.Request, response: Response<any>) => {
          const res = await fetchCalendarData(calId as string);
          console.log("got res:", res);
          response.send(res);
          return;
        }
    );
