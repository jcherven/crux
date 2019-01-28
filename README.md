# Crux

Crux is cron's best friend; a semantic crontab expression helper.

Do you like crontab? It's nice and you can do a lot of helpful things with it thanks to its clever scheduling syntax and willingness to run whatever shell command you tell it to run, rigidly on that schedule without compromise.

Crafting crontab entries can be a little bit faster and a bit less dangerous. Improperly written cron jobs can really mess things up in ways that are hilarious, and also ways that are far from hilarious.

__Crux__ will be a novel way to create cron expressions semantically. A simple MERN application that will allow me to use plain language for the creation of a clean, tidy, and safe crontab entry.

## Features:
- Craft your crontab expression in simple language:
  - On this day of this month at this time
  - Every x days
  - From x time to y time during these days
  - (We'll see what else I come up with; cron can be quite expressive)
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

## Project Progress
### **__2019-01-27__**
Following the well-known advice of security not being an add-on but a core component, I've decided to do something scary and work on user registration and authentication right away as part of the initial work on the back end API. It's only scary because this is the first time I've ever tried to implement it in anything.

At the moment I've got it working smoothly: HTTP requests to the users API endpoint are giving me the JSON messages I'm expecting. New user registrations are writing to the back end database, and upon hitting the sign-in endpoint with authenticated credentials the user token is being sent back from my JSON Web Token key signing call.

I've deployed the current state to Heroku, and after fiddling with the deployment's environment variables I'm successfully hitting the deployed API and getting the expected JSON responses.
