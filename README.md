# Discord Bot w/ Twitch 

* Accesses twitch information about subscriptions based on commands in discord and updates roles in the server.

* Ex: `!subgrade rickternet` will attempt to access information about whether my twitch channel, `rickternet`, is subscribed to the broadcaster defined in the settings.

* Need to create an `auth.json` file with the following information:
	
```
{
	"discord": {
		"secret": "SECRET",
	},
	"twitch": {
		"userID": broadcaster_id,
		"clientID": "CLIENT",
		"secret": "SECRET"
	}
}
```
