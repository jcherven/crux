# Crux

Crux is cron's best friend; a semantic cron expression helper.

Do you like crontab? It's nice and you can do a lot of helpful things with it thanks to its clever scheduling syntax and willingness to run whatever shell command you tell it to run, rigidly on that schedule without compromise.

Crafting crontab entries can be a little bit faster and a bit less dangerous. Improperly written cron jobs can really mess things up in ways that are hilarious, and also ways that are far from hilarious.

Crux will be a novel way to create cron expressions semantically. A simple MERN application that will allow me to use plain language for the creation of a clean, tidy, and safe crontab entry.

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

## What's cron?
Crontab is a small system application built in to most Unix-like systems. It allows a user to specify a schedule for automatically running a command, kicking off a script, or performing some task regularly. It faithfully does exactly what you tell it to do, whether that is hilarious, stupid, or what you actually originally intended.

You can check out what cron jobs you may or may not currently have by doing this at your command prompt:
```
$ crontab -l
```
You can edit a file referred to as a crontab (*cron* as in *chronological*, *tab* as in *table*) in order to specify the schedule and the command to run. This file will open in your terminal environment's default text editor with:
```
$ crontab -e
```
An example of a crontab entry would be a cron expression followed by the command to run. Here's a weird example:
```
0 0,12  1 */2 * echo $(date) >> ~/list-of-timestamps.txt
```
This crontab entry will put a new timestamp into a file in your home directory according to the following schedule:
  - Midnight and noon on the first day of every other month, whatever day of the week that might be

As you can see this is both very granularly specified and very confusing. It's also very powerful and useful for automating all kinds of things.

But it could be easier. I'd like to use my app to specify the schedule part in plain laguage and generate a little text snippet of the crontab expression. Then I can paste that into my crontab file. I'd like to not worry about double and triple checking the expression when I write these. And perhaps if you administer a \*nix system, you would too.
