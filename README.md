![Site Logo](./docs/Zak-Logo-BG-removed.png)

Logo credit to my good friend, [Lochy.](https://www.linkedin.com/in/lochlyn-thomas-045b55289/)

### Front End: https://pokemondaycare.tech/

### Back End: https://api.pokemondaycare.tech/

# Back End Documentation

## Server Routes

 - "/" 

 Response:

 ```
 { 200
    message: "Hello world! The server is working :)"
 }
 ```

 - "/invalid-route"

 Response:

 ```
 { 200
    message: "There are no routes with that path."
 }
 ```

 #### User Controller

 - "/register"
 POST

 Request:

 ```
 {
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    isAdmin: String
 }
 ```

 Error:

 ```
 { 400
    error: error
 }
 ```

 Response:

 ```
 { 201
    user: newUser
 }
 ```

 - "/login"
 POST

 Request:

 ```
 {
    email: String,
    password: String
 }
 ```

 Error:

 ```
 { 400
    message: "Invalid user details provided."
 }
 ```

Response:

 ```
 { 200
    encryptedJWT
 }
 ```

 - "/logout"
 POST

 Response:

 ```
 { 200
    message: "logged out"
 }
 ```

 - "/token-refresh"
 POST

 Error:

 ```
 { 400
    error: "no user found"
 }
 ```

 Response:

 isAdmin = true:

 ```
 { 200
    jwt: refreshResult,
    isAdmin: true,
    user: parsedData
 }
 ```

 isAdmin = false:

 ```
 { 200
    jwt: refreshResult,
    user: parsedData
 }
 ```

 - "/:userID"
 GET

 Response:

 ```
 { 200
    user: user
 }
 ```


 #### Pokemon Controller

 - "/all"
 GET

 Error:

 ```
 { 400
    error: error
 }
 ```

 Response:

 ```
 { 200
    pokemon: allPokemon
 }
 ```

 - "/:userID"
 GET

 Error:

 ```
 { 400
    error: error
 }
 ```

 Response: 

 ```
 { 200
    pokemon: allPokemon
 }
 ```

 - "/find/:pokemonID"
 GET

 Error:

 ```
 { 400
    error: error
 }
 ```

 Response:

 ```
 { 200
    pokemon: pokemon
 }
 ```

 - "/"
 POST

 Request:

 ```
 {
    species: String,
    nickname: String,
    gender: String,
    height: Integer,
    weight: Integer,
    notes: String,
 }
 ```

 Error:

 ```
 { 400
    error: error
 }
 ```

 Response:

 ```
 { 200
    pokemon: NewPokemon
 }
 ```

 - "/:pokemonID"
 PUT

 Request:

 ```
 {
    nickname: String,
    gender: String,
    height: Integer,
    weight: Integer,
    notes: String,
 }
 ```

 Error:

 ```
 { 400
    error: error
 }
 ```

 Response:

 ```
 { 200
    pokemon: updatedPokemon
 }
 ```

 - "/:pokemonID"
 DELETE

 Error:

 ```
 { 400
    error: error
 }
 ```

 Response:

 ```
 { 200
    pokemon: deletedPokemon
 }
 ```

 #### Appointment Controller

 - "/all"
 GET

 Error:

 ```
 { 400
    error: error
 }
 ```

 Response:

 ```
 { 200
    appointment: allAppointments
 }
 ```

 - "/:userID"
 GET

 Error:

 ```
 { 400
    error: error
 }
 ```

 Response:

 ```
 { 200
    appointments: allAppointments
 }
 ```

 - "/find/:appointmentID"
 GET

 Error:

 ```
 { 400
    error: error
 }
 ```

 Response:

 ```
 { 200
    appointment: appointment
 }
 ```

 - "/"
 POST

 Request:

 ```
 {
    dropOffDate: String,
    pickUpDate: String,
    typeOfAppointment: String,
    pokemon: String,
    user: String
 }
 ```

 Error:

 ```
 { 400
    error: error
 }
 ```

 ```
 { 200
    appointment: NewAppointment
 }
 ```

 - "/:appointmentID"
 DELETE

 Error:

 ```
 { 400
    error: error
 }
 ```

 Response:

 ```
 { 200
    appointment: deletedAppointment
 }
 ```
 

 ## Libraries Used

 ### Bcrypt
Bcrypt is a hashing function that is used in order to encrypt sensitive information. This is done by hashing, and then salting the string in question. In this project, bcrypt is used to encrypt user passwords before being sent to be stored in the Mongo database.


 ### Cookie-Parser
 Cookie parser is a library that is used in order to parse the cookies sent in a request, which populates request.cookies. This makes it easier to access these values in order to properly process a server response. In this project, cookie-parser is used to access the 'jwt' and 'isAdmin' values in order to determine the result of a request.


 ### Cors
Cors is a library that is used in order to restrict which domains can make requests to the server. In this project, domains are restricted to the site itself, as well as localhost, for testing purposes. 


 ### Dotenv
Dotenv is a library that makes variables declared in the .env file accessible by the app. In this project, it is used to make secret variables used by the server, accessible by the server.


 ### Express
Express is a minimalist web framework that is built for use with NodeJS. It provides support for a wide range of features to be used in web applications. In this project, the server has been built with ExpressJS due to previous knowledge and for use with routing and middleware.


 ### Jest
Jest is a JavaScript testing framework that can be used for testing different parts of app functionality. Jest supports function and data mocking, as well as providing checks for code coverage. In this project, Jest is used with Supertest to test the API server routes.


 ### jsonwebtoken
A JSON web token is a JSON object that used in order to securely transfer pieces of data between two locations over the internet. In this project, JWTs are sent between the server and client in order to: verify the user is logged in, verify who the user is, and verify their admin status.


 ### Mongoose
Mongoose is an ODM library for Node, that is used for MongoDB. Mongoose allows for schemas to be created for use with Mongoose, which can then be used with functions and routes in order to allow for data sent to the server and database to be validated.


 ### Validator
Validator is a library that is used for string validation and sanitisation. The library comes with a variety of validators that can be used for different situations. In this project, validator is used in the User schema, in order to determine whether the provided email is a valid email or not.


 ### Nodemon
Nodemon is a library that is used to help develop Node apps. It does this by automatically restarting the app whenever it detects changes made to any project files. 


 ### Supertest
Supertest is a library that is used to test APIs. Supertest is a library that extends another library known as Superagent, another API testing library. Supertest works together with Jest, a testing framework, in order to test different API routes. 