# be-ghorilard (Backend and Database Ghorilard)

  This is backend and database structure for Ghorilard Project. Ghorilard is project to monitor water quality for shrimp farming using an IoT system and display sensor data to the website. Ghorilard checks water quality based on ph levels and temperature in the water. Ghorilard use Mongodb, ExpressJs, SvelteJs, and NodeJs for build website.
  
  For frontend code, you check this github:
  
  For device code, you can check this github:
  
## 

## Backend

Our Backend use NodeJs as base and ExpressJs as framework.

There is some depedencies you must install in your code editor to run Ghorilard Backend
 - nodemon
 - express
 - dotenv
 - cors
 - bcryptjs
 - jsonwebtoken
 - Mongoose
 - joi
 - ejs
 - socket.io

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

## About Ghorilard Backend
- 


