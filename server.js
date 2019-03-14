const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");
const AD = require('./utils/AD');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  

app.use(morgan('tiny'));

// INDEX ROUTE
app.use('/', express.static("../ad-web-app-fe"));

// ROUTES
app.get('/search', async (req, res) => {

    try {
        let data = await AD.find('Person', ['dn', 'name', 'givenName', 'sn', 'sAMAccountName', 'department', , 'title', 'co']);
        res.json(data);
    } catch (error) {
        res.status(500).json({err: error});
    }
    
});


app.get('/user', async (req, res) => {

    let user = req.query.user;
    console.log(user);
    
    try {
        let data = await AD.findUser(user);
        res.json(data);
    } catch (error) {
        res.status(500).json({err: error});
    }

   
});


app.get('/group', (req, res) => {

    let group = req.query.group;

});


app.listen("5000");