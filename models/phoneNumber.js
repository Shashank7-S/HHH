// models/phonenumber.js
module.exports = (sequelize, DataTypes) => {
    const PhoneNumber = sequelize.define('PhoneNumber', {
        number: {
            type: DataTypes.STRING,
            unique: true,
        },
        is_spam: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        owner_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,

        },
    });

    return PhoneNumber;
};