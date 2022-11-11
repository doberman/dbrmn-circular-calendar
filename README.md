# Doberman Circular Calendar

A lil' tool for easy overview of the festivities and local holidays across the Nordic studios.

## Getting started

### Web

Create an `.env.local` file by copying `.env.template` and fill out the data.
For local dev we recommend you to run following commands.
the `:https` includes all you need to bypass the Slack login and run with https :)

Then run:

`npm install`

`npm run dev:https`

### Calendar data fetching

This can be achieved in different forms, depending on the privacy level and platform.

We are using private calendars on Google, where we granted a service account reading permissions to the selected calendars. We decided to build a Firebase Function to provide all data, as we had about 10 calendars to read from.

Good to know, is that the Google API key can only read from public calendars, and it cannot be used to access Public Holiday calendars etc.

## Environments

This tiny project has a production environment, connected to the `main` branch.
We use PR preview on render, to review and test the code before hand.

## Tests

We are using jest for unit testing, primarily for calendar and date management.

`npm run test`

## Deployment

_main_ branch is deployed automatically with Github Actions to [dbrmn-circular-calendar.web.app](https://dbrmn-circular-calendar.web.app/). PR:s gets deployed automatically as well and the unique URL can be found as a comment on the PR.

The Firebase Function is still manual deploy, as this will most likely not change too much. You need all secrets in order to do a manual deploy, including the calendar ids and the service account key file. All env vars are stored in 1Password in the Syntax vault. Copy all the env vars and make sure you can run it locally before deploying.

Noteworthy: all secrets are being set with every deploy :( :)

Prod: https://europe-west1-dbrmn-circular-calendar.cloudfunctions.net/events

```sh
cd functions
cp .env.template .env
# fill out all the variables

# try it out locally
# then, deploy!

npm run deploy
```

## Contacts and nice to knows

Jonas Beck, jonas.beck1@doberman.ey.com
Lovis Dahl, lovis.dahl@doberman.ey.com
