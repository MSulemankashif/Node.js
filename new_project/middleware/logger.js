var fs = require('fs')

function logger(req, res, next) {
    const logText = `${new Date().toISOString()} ${req.method} ${req.url}\n`;

    fs.appendFile("server_logs.txt", logText, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err);
        }
        next();
    });
}



module.exports = logger
