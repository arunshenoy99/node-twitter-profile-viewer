const express = require('express')
const hbs = require('hbs')
const getProfile = require('./utils/getProfile')
const path = require('path')
const fs = require('fs')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')
const staticPath = path.join(__dirname, '../public')
const profilesPath = path.join(__dirname, '../public/static/')

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/profile', (req, res) => {
    const username = req.query.username
    if (!username) {
        return res.send('Please provide a username')
    }
    try {
        const profileBuffer = fs.readFileSync(profilesPath + username + '.html')
        const profile = profileBuffer.toString()
        console.log('filesystem data sent')
        return res.send(profile)
    } catch (e) {
        getProfile(username, (error, profile) => {
            if (error) {
                return res.send(error)
            }
            fs.writeFileSync(profilesPath + username + '.html',profile)
            res.send(profile)
        })
    }
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})