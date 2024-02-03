// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, {
            tableName: 'User', // Explicitly set the table name
            timestamps: true,
            underscored: true, // Use underscores in the column names (e.g., created_at instead of createdAt)
        }
    );

    return User;
};