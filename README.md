# socialNetworkAPI - Challenge #18 in the U of MN Bootcamp

## Built With
* Express.js
* Mongoose
* MongoDB

## Description
This challenge had us create the back-end of a social media app where users could post their thoughts and reactions to other people's thoughts and create a friend list using Mongoose and MongoDB for the database.

## Table of Contents
* [Installation](#installation)
* [Acceptance Criteria](#acceptance-criteria)
* [Walkthrough Vido](#walkthrough-video)
* [Screenshot of the Application](#screenshot-of-the-application)
* [Git Repository](#git-repository)
* [How this was accomplished](#how-this-was-accomplished)

## Installation
npm install express mongoose

## Acceptance Criteria
* WHEN I enter the command to invoke the application\
THEN my server is started and the Mongoose models are synced to the MongoDB database
* WHEN I open API GET routes in Insomnia for users and thoughts\
THEN the data for each of these routes is displayed in a formatted JSON
* WHEN I test API POST and DELETE routes in Insomnia\
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Walkthrough Video


## Screenshot of the Application
![Screenshot (61)](https://user-images.githubusercontent.com/90292697/154813329-bb0804a0-d827-41a6-86db-b2b043822838.png)
![Screenshot (62)](https://user-images.githubusercontent.com/90292697/154813331-c90ca108-ecea-48c9-8441-64792e75d044.png)

## Git Repository
https://github.com/mbahl1670/ch18-socialNetworkAPI-mjb

## How this was accomplished
*  Created the models for Users & Thoughts & sub-schema for Reactions in the Thought model
*  Created the Controller & Routes directories, starting with the User controller functions then connected them with routes
*  Created the server.js file, connecting all the models/routes/controller files
*  Tested the user routes/models to be sure they were working in Insomnia
*  Verified the friends feature was working with User referencing itself
*  Wrote the controller functions for Thoughts then connected them with routes, verified they were working in Insomnia
*  Finished up with the reactions to thoughts by adding addReaction, deleteReaction in the Thought controller file, verified they were working in insomnia
