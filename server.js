var express = require('express')
var app = express()
const PORT = 4000
var fs = require('fs');
app.use(express.json())

app.use(logger)


// App Level Middle Ware
function logger(req, res, next){
    const logText = `${new Date().getDate().toString()} ${req.method} ${req.url} \n`;

    fs.appendFile("server_logs.txt", logText, (err)=>{
        if(err){
            console.error("Failed to wrtie to log file: ", err)
        }
        next();
    });
}

// Route Specific Middle Ware

// function validateId(req, res, next){
//     var id = req.params.id

//     if (!id || isNaN(id) || id<0){
//         res.status(400).json({message: "Please provide valid Id"})
//     }
//     next()
// }



app.listen(PORT, ()=>{ console.log("Server is running at", PORT)})