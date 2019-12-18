// Dependencies
const axios = require('axios').default
var discord = require('discord.js')
const fs = require('fs')
var handleMessage = require('./twitch-api.js').handleMessage

// Get auth credentials from auth.json
var authJson = fs.readFileSync("auth.json")
const auth = JSON.parse(authJson)

// Establish client instance
const clientDiscord = new discord.Client()

// Ensure bot is online
clientDiscord.on('ready', function() {
    console.log('Bot is now connected');
})

/**
 *  Checks if the command is in this format: 
 *   !subgrade <twitch username>
 *  Then makes subsequent requests to check if they are in the subscription.
 */
clientDiscord.on('message', async (msg) => {
    user = msg.author
    command = 'subgrade'
    message = msg.content.split(' ')
    if(message.length == 2 && message[0] === '!' + command && !user.bot) {
        var sub = await handleMessage(message[1])
        if(!sub) {
            console.log('User is not subscribed')
        } else {
            console.log('User is subscribed') // TODO handle discord permissions
            handleDiscordUpgrade(user)
        }
    }
})

/**
 * Handle the requests to Discord to give people with subs access to certain channels
 * 
 * @param {*} user 
 */
function handleDiscordUpgrade(user) {
    // TODO
}

// Login
clientDiscord.login(auth.discord.secret);