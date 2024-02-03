// models/contact.js
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        contactNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Contact;
};