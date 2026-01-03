let express = require('express')
let multer = require('multer')
let path = require('path')
let fs = require('fs')
let PORT = 4000
let app = express()

// Setup Folder Path
const uploadDir = "uploads"
if (!fs.existsSync(uploadDir)){

    fs.mkdirSync(uploadDir)
}

// Configure Multer
