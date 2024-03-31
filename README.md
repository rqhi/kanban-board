# Start

## Download MongoDB
First you have to install MongoDB and for easier use mongodb-compass.
https://www.mongodb.com/docs/compass/current/install/

Make sure to update the file '.env' accordingly to your port, and passwort secret (or use existing).
It should look something like this:
>PORT=5000
>MONGODB_URL=mongodb://localhost:<<port>>/kanban-app
>PASSWORD_SECRET_KEY=<<urpasswordsecretkey>>
>TOKEN_SECRET_KEY=<<urtokensecretkey>>



## In /client
`yarn start`

It should start the client and open a new browser window on port **3000**, if not open
> http://localhost:3000


## In /server
`yarn start`

It should start the server and listens on port **5000**
on Apple products, you have to disable **Airplay Receiver**
> System Settings > General > AirDrop & Handoff > AirPlay Receiver