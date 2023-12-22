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


 #### Pokemon Controller

 - "/all"

 error:

 ```
 {
    error: error
 }
 ```

 ```
 {
    pokemon: allPokemon
 }
 ```

 - "/:userID" 

 ```
 {
    error: error
 }
 ```

 ```
 {
    pokemon: allPokemon
 }
 ```

 - "/find/:pokemonID"

 error:

 ```
 {
    error: error
 }
 ```

 ```
 {
    pokemon: pokemon
 }
 ```

 - "/"

 error:

 ```
 {
    error: error
 }
 ```

 ```
 {
    pokemon: NewPokemon
 }
 ```

 - "/:pokemonID"

 error:

 ```
 {
    error: error
 }
 ```

 ```
 {
    pokemon: updatedPokemon
 }
 ```

 - "/:pokemonID"

 error:

 ```
 {
    error: error
 }
 ```

 ```
 {
    pokemon: deletedPokemon
 }
 ```

 #### Appointment Controller

 - "/all"

 error:

 ```
 {
    error: error
 }
 ```

 ```
 {
    appointment: allAppointments
 }
 ```

 - "/:userID"

 ```
 {
    error: error
 }
 ```

 ```
 {
    appointments: allAppointments
 }
 ```

- "/find/:appointmentID"

 error:

 ```
 {
    error: error
 }
 ```

 ```
 {
    appointment: appointment
 }
 ```

 - "/"

 error:

 ```
 {
    error: error
 }
 ```

 ```
 {
    appointment: NewAppointment
 }
 ```

 - "/:appointmentID"

 error:

 ```
 {
    error: error
 }
 ```

 ```
 {
    appointment: deletedAppointment
 }
 ```