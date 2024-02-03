// models/spamReport.js
module.exports = (sequelize, DataTypes) => {
    const SpamReport = sequelize.define('SpamReport', {
        reporterId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        reportedNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return SpamReport;
};