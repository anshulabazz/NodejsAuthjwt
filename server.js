const express = require('express')
const cors = require('cors')
const db = require('./src/models/index')
const app = express()
var corsoption = {
    origin: 'http://localhost:3000'
}
app.use(cors(corsoption))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
db.mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Successfully conected to database")
}).catch(err => {
    console.log("Not conected with database")
})
  db.role.estimatedDocumentCount((err, count) => {
        if (!err && count == 0) {
            db.role.insertMany([
                {
                    name: 'admin'
                },
                {
                    name: 'user'
                },
                {
                    name: 'moderator'
                }
            ])
        }

  })
require('./src/router/user.route')(app)
require('./src/router/auth.route')(app)
const port = process.env.PORT
app.listen(port, () => {
    console.log(`Connected to port ${port}`)
})