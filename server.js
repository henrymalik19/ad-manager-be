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
app.get('/api/user', async (req, res) => {
    if(req.query.user) {
        try {
            let data = await AD.findUser(req.query.user);
            res.json(data);
        } catch (error) {
            res.status(500).json({err: error});
        }
    } else {
        try {
            let data = await AD.find('Person', ['dn', 'name', 'givenName', 'sn', 'sAMAccountName', 'department', , 'title', 'co']);
            res.json(data);
        } catch (error) {
            res.status(500).json({err: error});
        }
    }
});


app.get('/api/group', async (req, res) => {
    if(req.query.group) {
        try {
            let data = await AD.findGroup(req.query.group);
            res.json(data);
        } catch (error) {
            res.status(500).json({err: error});
        }
    } else {
        try {
            let data = await AD.find('Group', ['dn', 'name', 'sAMAccountName']);
            res.json(data);
        } catch (error) {
            res.status(500).json({err: error});
        }
    }
});

app.get('/api/computer', async (req, res) => {
    if(req.query.computer) {
        try {
            let data = await AD.findComputer(req.query.computer);
            res.json(data);
        } catch (error) {
            res.status(500).json({err: error});
        }
    } else {
        try {
            let data = await AD.find('Computer', ['dn', 'name', 'sAMAccountName', 'operatingSystem', 'lastLogonTimestamp']);
            res.json(data);
        } catch (error) {
            res.status(500).json({err: error});
        }
    }
});

app.listen("5000");