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
 