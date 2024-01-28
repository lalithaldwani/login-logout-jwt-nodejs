## API based Login-Logout using JWT in NodeJS ExpressJs

**Description**

This module is a common module for any website. As we all know that a website has: user registration, login, logout, etc sections.

This app includes following APIs:

- **user registration** `http://localhost:8000/user/signup`: This will require data in POST request

  ###### Body part:

{
"username":"lalit",
"password":"lalit@123"
}

- **login** `http://localhost:8000/user/signin` : This will require data in POST request and will return a token which you need to attach in header with every request

  ###### Body part:

{
"username":"lalit",
"password":"lalit@123"
}

- **logout** `http://localhost:8000/user/logout`: A GET request which will remove the all active token from DB and clear the token response.Next time authenticate users will login again to access new screen .

  ###### Header part:

  ```
    authorization:   Select Type from dropdwon
    Bearer Token : YOUR_TOKEN_HERE (select Bearer token then place your token in token section)
  ```

  - **Produce List** `http://localhost:8000/product/listProduct` : This will require a token passed in header and data in GET request

  ###### Header part:

  ```
    authorization:    YOUR_TOKEN_HERE
  ```

**Requirements**

MongoDB
NodeJS

**Do following things before running the app**

- make a Database (`eminence`) in MongoDB
- Setup your config as required (`config directory`)
- run command `npm install` to install all the dependencies
- install nodemon if not in package.json (`npm i nodemon`)
- add  
   "scripts": {
  "serve": "nodemon index.js",
  }, in package.json

**App Execution**

- `npm run serve`
- for test cases  - `npm run test`
