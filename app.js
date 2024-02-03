// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: console.log, // Log SQL queries to the console (optional, for debugging)
});

// Models
const User = require('./models/user')(sequelize, DataTypes);
const SpamReport = require('./models/spamReport')(sequelize, DataTypes);
const Contact = require('./models/contact')(sequelize, DataTypes);

// Associations
User.hasMany(SpamReport, { foreignKey: 'reporterId' });
User.hasMany(Contact, { foreignKey: 'userId' });

// Define API routes
require('./routes')(app, { User, SpamReport, Contact });

sequelize.sync();


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});