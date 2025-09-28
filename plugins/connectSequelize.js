const { Sequelize, DataTypes } = require('sequelize');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
// console.log('DB_INFO',DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'mysql',
});

const User = sequelize.define('User',
	{
		// Model attributes are defined here
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			// allowNull defaults to true
		},
	},
	{
		freezeTableName: true, // 테이블명 단수 고정
	}
);

sequelize.sync({ alter: true });