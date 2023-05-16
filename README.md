# Santa Node.js App
## How to start the application
### Glitch
Go to this link and use it:
```
https://perfect-coffee-ketchup.glitch.me/
```

### Node.js
1. Clone this repository
2. Install dependencies
```
npm install
```
3. Run the tests
```
npm run test
```
4. Run the application
```
npm run start
```
5. Go to `localhost:3000` in your browser and use the application

### Docker
1. Clone this repository
2. Build and run the docker container with the following command:
```
docker-compose up
```
3. Go to `localhost:3000` in your browser and use the application

## How to use the application
### Send an email to Santa
1. Go to the homepage
2. Enter your username and your message to Santa
3. If the username is not found or the user is older than 10 years old, an error page will be displayed
4. If the username is found and the user is younger than 10 years old, a confirmation page will be displayed
5. Every 15 seconds, an email will be sent to Santa with all the pending requests
6. You can check the emails sent to Santa by going to the following link:
```
https://ethereal.email
```
7. You can log in with the following credentials:
```
email: rahsaan.ratke@ethereal.email
password: XtYWm75xKNHqhMPD3x
```
8. Check the emails by clicking on the `Messages` tab

## What I did
* Implemented the email sending feature
* Developed the application with a data-driven approach (things are mostly not hardcoded)
* Implemneted a comprehensive suite of tests
* Added a Dockerfile and a docker-compose file to run the application in a container
* Used Webpack to bundle the application
* Converted the application to use Typescript for better type safety
* Added a linter (eslint) to enforce code quality
* Utilized Babel to transpile the code to ES5
* Improved overall file structure of the codebase for better maintainability
* Added a logger to log the requests to the server
* Added a favicon to the application
* Added custom error pages for better user experience
* Upgraded node version from 8.x to 16.x
* Added character counter for the message input

------------------

# IMPORTANT! READ before starting
By default for anonymous users (non logged in), your code and app will only remain on glitch.com for 5 days.
In order to not lose your challenge, please create a glitch.com account and log in to glitch.com before proceeding.

The following README contains instructions to guide you through the coding challenge, please read them carefully.

# nodejs coding challenge:

## How to create and submit your app using glitch

0. **Login to glitch**: make sure you are logged in to glitch.com

1. **Clone**: Go to this URL: https://glitch.com/~nodejs-santa-app and click the `Remix your own` button to clone the code. This will copy all the code to a new, randomly generated URL (e.g. https://glitch.com/edit/#!/capable-toothpaste). This is your URL to code on, no other candidates will have this URL.

2. **Code**: You can edit the code directly in the Glitch editor or use your editor of choice (VSCode, Sublime, etc) and copy paste the files into Glitch. Git import and export is also available in the Tools menu on the bottom left. How you edit the code is entirely up to you, so long as your finished work is viewable at the URL created in the previous step.

> **NOTE**: Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.

4. **Turn in**: When you finish coding, send your URL to us so we can review your code.


## Objectives overview:

The webapp should display a form for children to enter their id and a free text message to santa.

When submitting the form, the server should check:
 1. that the child is registered
 2. that the child is less than 10 years old.
To this purpose, the server can fetch user and profiles data in JSON format from:
- https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json
- https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json

If the child is not registered (no match for the user id) or more than 10years old, the webapp should display a basic error page with an error message explaining the problem.\
If the child is registered and less than 10 years old, the server should show a page indicating that the request has been received.

Every 15seconds, the server should send an email with information on all pending (not yet sent) requests including:
- child username (eg. charlie.brown)
- child's address (eg. 219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo)
- request free text as was input in the form

Email sender should be set as do_not_reply@northpole.com, and sent to santa@northpole.com

## tips and detailed instructions:

- somebody started to work on the app, but left it unfinished. It is up to you to complete it. You are allowed to restart from scratch if you prefer.
- the look and feel of the application for this challenge is not the priority. The pages/email do not need to look good, as long as they convey the information effectively.
- you should fetch the JSON data at every form submission (consider it as an API)
- for the sake of the challenge, you can keep the requests in-memory only
- you are encouraged to select and use npm packages as needed (you can add packages by editing package.json, or using `npm install` from the glitch console)
- to get an smtp server for emails, go to https://ethereal.email/ and click "Create Ethereal Account".\
This will give you an account (take note of your username and pwd if you need to re-logon later) and smtp server (actual emails do not get delivered).\
Go to https://ethereal.email/messages to see the emails that have been received by the smtp server.



## Some things we will look for in your submission
- Code quality (readability, use of modern syntax...)
- Does the app work as designed (cf. objectives overview)
- App architecture (folder structure, configuration management...)



## tips on usage of glitch

Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.
When your app is running, you can access logs and console using the "Tools" button at the bottom left.

Your Project
------------

On the front-end,
- edit `public/client.ts`, `public/style.css` and `views/index.html`
- drag in `assets`, like images or music, to add them to your project

On the back-end,
- your app starts at `server.ts`
- add frameworks and packages in `package.json`
- safely store app secrets in `.env` (nobody can see this but you and people you invite)
- app uses node8 by default, it is possible to update the version of nodejs used: https://glitch.com/help/node/
