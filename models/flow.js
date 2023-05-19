const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
try {
const Flow = sequelize.define('Flow', {
    operationType: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
        isIn: [[2200, 2400]],
    },
    },
    messageId: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
    validate: {
        isNumeric: true,
    },
    },
    sourceBank: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    sourceAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    destinationBank: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    destinationAccount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    publishtime: {
    type: DataTypes.DATE,
    allowNull: false,
    },
});

return Flow;
} catch (error) {
console.error('Error defining the model:', error);
// Handle the error appropriately (e.g., throw an error, return a default value, etc.)
throw error;
}
};
