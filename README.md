# be-ghorilard (Backend and Database Ghorilard)

  This is backend and database structure for Ghorilard Project. Ghorilard is project to monitor water quality for shrimp farming using an IoT system and display sensor data to the website. Ghorilard checks water quality based on ph levels and temperature in the water. Ghorilard use Mongodb, ExpressJs, SvelteJs, and NodeJs for build website.
  
- For Frontend of Ghorilard Project, Github Link: [https://github.com/ghofaralhasyim/ghorilard-pwa](https://github.com/ghofaralhasyim/ghorilard-pwa)

- For End Devcice of Ghorilard Project, Github Link: [https://github.com/ghofaralhasyim/end-device-ghorilard](https://github.com/ghofaralhasyim/end-device-ghorilard)

- For Simulation and Description of Ghorilard Project, Youtube Link: https://youtu.be/ViWVCJh-_Is
  
## Backend
  Ghorilard Backend use NodeJs as base and ExpressJs as framework. Ghorilard backend deploy or hosting in Heroku because its free and easy to use (many documentation). Ghorilard Backend use MVC model plus routes. So its easy to understand the code.

There is some depedencies you must install in your code editor to run Ghorilard Backend
 - nodemon (Easy to run your code in localhost)
 - express (Framework for NodeJs)
 - dotenv (To make .env file for secret variabel)
 - cors (Make FE can easily get API from BE without credentials problem)
 - bcryptjs (To hash our password)
 - jsonwebtoken (For authorization and authenticaiton)
 - Mongoose (Like a framework for mongoDB)
 - joi (For validate input form from user or device)
 - ejs 
 - socket.io (For real time chat application (helpdesk)

## Database
  Ghorilard database use mongodb and mongoose. Mongoose will help us to use mongodb syntax easily and efficient. Ghorilard database deploys in MongoDB Atlas because its free and easy to use with mongoose depedency.

## Get Started Backend (NodeJs)

- Make sure you already install node js and npm
  - Check in your Terminal or Command Prompt
    ```
    node -v
    npm -v
    ```
- Initialize folder as NPM project
  ```
  npm init
  ```
  - This code will make package.json
- Install all depedencies above
  - You can use this command to install the depedency
    ```
    npm install express
    ```
  - After you install, in the package.json, there is some depedencies list that you have install and there is some node_modules (contain your depedencies)
- Make app.js file in your directory
  - you can use this command to make file
    ```
    touch app.js
    ```
    
- Install env depedencies
  - You can use this command
    ```
    npm install dotenv
    ```
  - After you install, make .env file with this command
    ```
    touch .env
    ```
  - Open .env file and add some code with this code
    ```
    TOKEN_SECRET=uptoyou
    DB_CONNECT= "use link that you get in MongoDB Atlas"
    ```
- You already to use the code without error

## Get Started Database (Mongodb)
In Ghorilard project, we use Mongodb Atlas to put our data. This is step if you want to try make your own server connect to mongodb Atlas.
- Install mongoose depedencies in your backend code
  ```
  npm install mongoose
  ```
- Require your mongoose in your file
  ```
  require('mongoose');
  ```
- Connect your backend with your mongodb Atlas
  ```
  mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true})
  ```
- DB_CONNECT is variabel that store in .env file. So you must make .env file and put the link from your mongodb Atlas if you have already make database.
  ```
  DB_CONNECT=mongodb+srv://username:password@cluster.sygau.mongodb.net/yourDatabase
  ``` 
