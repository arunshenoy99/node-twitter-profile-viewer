const request = require('request')

const getProfile = (username, callback) => {
    const url = 'https://www.twitter.com/'+username
    request({ url }, (error, response) => {
        if (error) {
            return callback(error, undefined)
        } else {
            callback(undefined, response.body)
        }
    })
}

module.exports = getProfile