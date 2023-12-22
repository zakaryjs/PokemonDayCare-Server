![Site Logo](./docs/Zak-Logo-BG-removed.png)

Logo credit to my good friend, [Lochy.](https://www.linkedin.com/in/lochlyn-thomas-045b55289/)

### Front End: https://pokemondaycare.tech/

### Back End: https://api.pokemondaycare.tech/

# Back End Documentation

## Server Routes

 - "/" 

 ```
 {
    message: "Hello world! The server is working :)"
 }
 ```

 - "/invalid-route"

 ```
 {
    message: "There are no routes with that path."
 }
 ```

 #### User Controller

 - "/register"

 error if invalid details (password length less than 8, missing details)

 ```
 {
    user: newUser
 }
 ```

 - "/login"

 error if invalid details

 ```
 {
    encryptedJWT
 }
 ```

 - "/logout"

 ```
 {
    message: "logged out"
 }
 ```

 - "/token-refresh"

 error:

 ```
 {
    error: "no user found"
 }
 ```

 isAdmin = true:

 ```
 {
    jwt: refreshResult,
    isAdmin: true,
    user: parsedData
 }
 ```

 isAdmin = false:

 ```
 {
    jwt: refreshResult,
    user: parsedData
 }
 ```

 - "/:userID"

 ```
 {
    user: user
 }
 ```