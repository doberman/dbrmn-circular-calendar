# Doberman Circular Calendar

A lil' tool for easy overview of the festivities and local holidays across the Nordic studios.

## Getting started

### Web

Create an `.env.local` file by copying `.env.template` TODO add info on where to find Slack credentials

Then run:

`npm install`

`npm run dev`

### Calendar fetching

So, to have private calendars the calendar data fetching is performed using a Firebase Function + service account to pull all calendars and serve it in one go.

## Environments

What environments are there and how does this project manage those environments.

## Tests

We are using jest for unit testing

`npm run test`

## Deployment

_main_ branch is deployed automatically with Github Actions to [dbrmn-circular-calendar.web.app](https://dbrmn-circular-calendar.web.app/). PR:s gets deployed automatically as well and the unique URL can be found as a comment on the PR.

The Firebase Function is still manual deploy. The service account key file and all env vars are stored in 1Password in the Syntax vault. Copy all the env vars and make sure you can run it locally before deploying. All secrets are being set with every deploy :(

Prod: https://europe-west1-dbrmn-circular-calendar.cloudfunctions.net/events

```sh
cd functions
cp .env.template .env
# fill out all the variables

# try it out locally
# then, deploY!

npm run deploy
```

## Documentation

This project contains difference kinds of documentation under the [`/docs`](/docs) folder.

## Contacts and nice to knows

Are there any people that are important for developers to know about and how to contact? List those people along with their responsibilities. Also include any other bits of information that can be useful for a developer to know.
