const express = require('express')
const http = require('http')
const gameLogic = require('./game-logic')
const cors = require('cors');
const app = express()


// app.use(cors({
//     origin: ['http://localhost:3000']
// }));
/**
 * Backend flow:
 * - check to see if the game ID encoded in the URL belongs to a valid game session in progress. 
 * - if yes, join the client to that game. 
 * - else, create a new game instance. 
 * - '/' path should lead to a new game instance. 
 * - '/game/:gameid' path should first search for a game instance, then join it. Otherwise, throw 404 error.  
 */


const server = http.createServer(app)
server.listen(process.env.PORT || 8000, () => {
    console.log("Server running");
})
// server-side
const io = require("socket.io")(server, {
    allowEIO3: true,
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"], 
        credentials: true
    }
  });
  

// get the gameID encoded in the URL. 
// check to see if that gameID matches with all the games currently in session. 
// join the existing game session. 
// create a new session.  
// run when client connects

io.on('connection', client => {
    console.log("OK");
    gameLogic.initializeGame(io, client)
})

// usually this is where we try to connect to our DB.
