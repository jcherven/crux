# Crux

Crux is cron's best friend; a semantic crontab expression helper.

Do you like [cron](https://en.wikipedia.org/wiki/Cron)? It's nice and you can do a lot of helpful things with it thanks to its clever scheduling syntax and willingness to run whatever shell command you tell it to run, rigidly on that schedule without compromise.

Crafting crontab entries can be a little bit faster and a bit less dangerous. Improperly written cron jobs can really mess things up in ways that are hilarious, and also ways that are far from hilarious.

__Crux__ will be a novel way to create cron expressions semantically. A simple MERN application that will allow me to use plain language for the creation of a clean, tidy, and safe crontab entry.

## Features:
- Craft your crontab expression in simple language:
  - On this day of this month at this time
  - Every x days
  - From x time to y time during these days
  - (We'll see what else I come up with; cron can be surprisingly expressive)
- Constraints on possibly dangerous or hilarious expressions
- Mobile-first front-end built in React and Foundation
- Sign in to an account so you can save and recall your favorite cron expressions
- Share crontab expressions with others, and see some clever cron expressions others have saved
- Back-ended by Express and MongoDB
- Maybe a reverse crontab checker that can translate your crontab expression into plain language
- More if this turns out to work okay and be a good idea

After deciding to make this, I found that there are at least two other crontab expression helpers that are both quite good and quite different from one another in UX and features:
- [Corntab](http://corntab.com)
- [Crontab Guru](https://crontab.guru)

Crux will also be quite different in UX, hopefully for the better.

## What's crontab?
__Crontab__ is a small system application built in to most Unix-like systems. It allows a user to specify a schedule for automatically running a command, kicking off a script, or performing some task regularly.

People refer to these scheduled tasks as **__cron jobs__**. They faithfully do exactly what you tell them to do, whether that is hilarious, stupid, or what you actually originally intended.

Believe it or not, it's really easy to do something unintentionally stupid with them. Testing out a new cron job usually means waiting for it to run and then checking to see if you nailed it. The problem is that these schedules can be confusing to create.

Consider the following.

You can check out what cron jobs you may or may not currently have by doing this at your command prompt:
```
$ crontab -l
```
You can edit a file, known as a **__crontab__** (*cron* as in *chronological*, *tab* as in *table*), in order to specify the schedule and the command to run. This file will open in your terminal environment's default text editor with:
```
$ crontab -e
```
When you save that file with a new entry, you have a new cron job that your system will ruthlessly execute on schedule, until you remove that entry.

An example of a crontab entry would be a **__cron expression__** followed by **__the command to run__**. Here's a weird example:
```
0 0,12  1 */2 * echo $(date) >> ~/list-of-timestamps.txt
```
This cron job will paste a new timestamp into a new line of a text file in your home directory according to the following schedule:
  - __Midnight__ and __noon__ on the __first day__ of __every other month__, __whatever day of the week__ that might be

As you can see this is both very granularly specified and very confusing. The whitespace is hard to read, and every character in the expression is deeply important to the schedule. It's also unlike any syntax for anything else ever. But it's very powerful and useful for automating all kinds of things you need your system to do.

So, this could be a little easier. I'd like to use my app to specify the schedule part in plain laguage and generate a little text snippet of the crontab expression. Then I can paste that into my crontab file. I'd like to not worry about double and triple checking the expression when I write these. And perhaps if you administer a \*nix system, you would too.

While I'm building this, check out some cool things you can look forward to doing with cron at [commandlinefu](https://www.commandlinefu.com/commands/matching/cron/Y3Jvbg==/sort-by-votes).

[Back to top](#Crux)

## Project Progress
#### **__2019-02-05__**
More API work has been completed. After adding some POST and GET routes for user profiles, I've gotten the very basic routes and validation propped up for the core of the application: the crontab expressions. Currently the expressions model is an object with keys for each cron expression component (second, minute, hour, dayOfMonth, month, dayOfWeek) and a description. There needs to be some more work done to constrain the input to the crontab expression fields to valid cron syntax, but for now I'll press onward to the React frontend and work on this later. I believe having a GUI in the browser will make testing these values a lot easier... right now my testing is being done in Postman and it's pretty slow editing the body of each request to test values.

The current testing workflow involves copypasting the logged in user's bearer token into a POST request header, then manually changing values in the request body. If this could be done in the browser I'd be a lot more efficient, so I consider this enough API work to move on to the client code now.

There's also a matter of whether the validation should be handled in the Mongoose model itself or with my current validation scripts. Maybe both, but I'm worried about database performance.

[Back to top](#Crux)

#### **__2019-02-01__**
Filled out some more parts of the back-end API with the addition of a private http POST route for the user profile. While I'm not sure what should go into user profiles yet, I do feel that less personal/identifying information is better for now. At the moment a user profile consists of the user's vanity URL, which is updating and returning the expected JSON responses and errors.

This route is at /api/profile, and using the logged in user's bearer token in the header with a HTTP POST creates new profiles or updates the user object in the database if it exists. If the field doesn't exist, it's added.

Hitting the authenticated route with a HTTP GET retrieves the contents of the profile object in the database.

I've added some helpful comment headers to each file to save myself some headaches and confusion while I work. I'm also now using jsdoc tags in comments for the API route methods to see if I can create some nice documentation as I work.

[Back to top](#Crux)

#### **__2019-01-29__**
After finishing authentication with [JSON Web Tokens](https://jwt.io/) and [Passport](http://www.passportjs.org/), input basic validation has been implemented on the register and login API endpoints with the help of the [Validator](https://www.npmjs.com/package/validator) NPM package. The routes are checking for empty fields, valid email formation, name length, and password minimum length, returning error objects in each case that will be passed to the client app. Existing user email addresses in the DB are also being errored back properly.

Should this all be done on the client app instead? Should it be done on both? I don't know yet and at the moment I'm unlikely to change it unless someone yells at me or I read something authoritative on the topic. Back end validation seems like a safe default for now.

The current state has been deployed to a test environment on [Heroku](https://www.heroku.com/). You can curl the register endpoint with:
````
curl -X POST \
  https://jcherven-crux.herokuapp.com/api/users/reg \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'name=&email=&password=&passwordConfirm='
````
A successful registration should return the user's information. You can even see your [bcrypt](https://www.npmjs.com/package/bcrypt)-salted and hashed password (lol). This will obviously not be exposed later on.

The login endpoint can be curl-ed with:
````
curl -X POST \
  https://jcherven-crux.herokuapp.com/api/users/login \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'email=&password='
````
The JSON object that gets served from a successful login request contains the user ID and session bearer token, which are used to authenticate requests to private routes while logged in as the user. This was much simpler to implement than I thought it was going to be, thanks to JWT and Passport.

Just about every value in the request body is invoking the expected JSON message response so far.

[Back to top](#Crux)

#### **__2019-01-27__**
Following the well-known advice of security not being an add-on but a core component, I've decided to do something scary and work on user registration and authentication right away as part of the initial work on the back end API. It's only scary because this is the first time I've ever tried to implement it in anything.

At the moment I've got it working smoothly: HTTP requests to the users API endpoint are giving me the JSON messages I'm expecting. New user registrations are writing to the back end database, and upon hitting the sign-in endpoint with authenticated credentials the user token is being sent back from my JSON Web Token key signing call.

I've deployed the current state to Heroku, and after fiddling with the deployment's environment variables I'm successfully hitting the deployed API and getting the expected JSON responses.

[Back to top](#Crux)
