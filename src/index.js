var {app} = require('./server');

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
    console.log(`The Pokemon Daycare server is now running.`)
})