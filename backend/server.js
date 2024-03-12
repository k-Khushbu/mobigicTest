const express = require('express');
const app = express();

const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

const cors = require('cors');
app.use(cors());

const url = 'mongodb://localhost:27017';

MongoClient.connect(url)
    .then(client => {

        console.log("Successfully connected to Database!")

        const db = client.db('user_profile_app');
        const jsonParser = bodyParser.json();

        app.post('/login', jsonParser, async (req, res) => {
            const { username, password } = req.body;
            try {
                if (!username || !password) {
                    return res.status(400).json({ message: "Username and password are required" });
                }
                const user = await db.collection('User').findOne({ username });
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                if (user.password !== password) {
                    return res.status(401).json({ message: "Incorrect password" });
                }
                res.json({ message: "Login successful" });
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: "Internal server error" });
            }
        });

        app.post('/signup', jsonParser, async (req, res) => {
            const { username, password } = req.body;
            if (!username && !password) {
                return res.status(400).json({ message: "Username and Password are required" });
            }
            try {
                const collection = db.collection('User');
                console.log(collection.dbName);
                await collection.insertOne({ username, password });
                res.json({ message: "User created successfully" });
            } catch (err) {
                console.error(err);
                res.status(500).json({ message: "Internal server error " });
            }
        });

        const collectionName = 'files';
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });
        const upload = multer({ storage: storage });
        const generateUniqueCode = () => {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 6; i++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return code;
        };

        app.post('/uploadfile', upload.single('file'), async (req, res) => {
            try {
                const file = req.file;
                if (!file) {
                    return res.status(400).send('No file uploaded.');
                }
        
                const collection = db.collection(collectionName);
                const uniqueCode = generateUniqueCode();
                let fileData;
                try {
                    fileData = fs.readFileSync(file.path);
                } catch (readFileError) {
                    console.error('Error reading file:', readFileError);
                    return res.status(500).send('Error reading file');
                }
                await collection.insertOne({
                    filename: file.originalname,
                    data: fileData,
                    code: uniqueCode,
                });
                res.json(`File uploaded successfully with unique code: ${uniqueCode}`);
            } catch (uploadError) {
                console.error('Error uploading file:', uploadError);
                res.status(500).send('Error uploading file');
            }
        });
        

    })
    .catch(err => {
        console.log("Failed to connect to the database...", err);
    });

app.listen(5000, () => {
    console.log("Server has started at port 5000");
});
