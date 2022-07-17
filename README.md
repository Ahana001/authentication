# Authentication API

HTTP is a stateless protocol. That is, the server does not hold any information on previous requests sent by the client. Client-side cookies were introduced by Netscape to maintain state, by storing client-specific information on the client's machine and later retrieved to obtain the state information.

As a user, whenever you are sending username and password to the server. Server checks whether this Username & Password matches a user in the Database. If it does, server generates a token or an encrypted key, and stores it some where on server. sends it back to the client(browser) in a cookie. That cookie, obviously, is always there with the browser. So for every request that browser makes, (now cookie has that authentication token) server establishes the identity of the user using that token. This is how basic authentication works.

JWT - JSON web tokens. It works similar to basic authentication just you don't have to store authentication token in the database. So how does it work? In this case - When user identity is verified, one token is generated and stored in client local storage which has 3 parts separated by dot : Header.payload.Signature. 

Which contains all the information in itself (like: encryption key, encryption algorithm, key expiry time, username and password in encrypted format) so it doesn't need to be store anywhere. avoiding the need to query the database more than once.

# JWT Flow Diagram

![jwt flow](https://user-images.githubusercontent.com/50478681/179411497-b9df4636-bd5a-434c-adea-ac63f5e918d8.jpg)

# To start setting up the project

Step 1: Clone the repo

    git clone https://github.com/Ahana001/authentication.git

Step 2: cd into the cloned repo and run:

    npm install

Step 3: Put your credentials in the .env file.

    PORT=8080
    DB_USER=
    DB_PASS=
    TOKEN_SECRET=
    MONGO_URI=

Step 4: Start the API by

    nodemon index.js
