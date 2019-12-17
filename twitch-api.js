const axios = require('axios').default
const fs = require('fs')
const qs = require('qs')

var authJson = fs.readFileSync("auth.json")
const auth = JSON.parse(authJson)

/**
 * Check to see if the user is subscribed based on the username
 * 
 * @param {*} username 
 */
function checkSubscription(username) {
    const userData = {
        params: {
            login: username
        }
    }
    return axios.get('https://api.twitch.tv/helix/users', userData).then(function(response) {
        return axios.get('https://api.twitch.tv/helix/subscriptions', { 
            params: {
                broadcaster_id: auth.twitch.userID, // TODO Change to appropriate channel
                user_id: response.data.data[0].id
            }
        })
    }).catch(error => {
        console.log('Error hit')
        console.log(error)
    })   
}

/**
 * Create the authentication token
 * 
 * TODO figure out how to get this to refresh automatically w/o making a new request each time. 
 */
async function makeTokenRequest() {
    data = {
        "client_id": auth.twitch.clientID,
        "client_secret": auth.twitch.secret,
        "grant_type": "client_credentials",
        "scope": "channel:read:subscriptions user:read:email"
    }
    return axios.post('https://id.twitch.tv/oauth2/token', qs.stringify(data)).then(response => {
        axios.defaults.headers.common = {
            "Authorization": "Bearer " + response.data.access_token
        }
    })
}

/**
 * Handle a user being passed in if going with the !command route.
 * 
 * @param {*} user 
 */
async function handleMessage(user) {
    // Assume message has been validated and incoming is the username.
    var tokenRequest = await makeTokenRequest()

    // Make request to Discord to get Twitch Information
    checkSubscription(user).then(response => { 
        console.log(response.data) // TODO Figure out how to handle the response data.
    }).catch(error => {
        console.log(error)
    })
}

module.exports.handleMessage = handleMessage;