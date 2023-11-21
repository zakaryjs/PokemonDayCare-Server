var {app, PORT, HOST} = require('./server');

app.listen(PORT, HOST, () => {
    console.log(`The Pokemon Daycare server is now running.`)
})