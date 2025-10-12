module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define('user', {
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING
		},
	}, {
		freezeTableName: true
	});

	user.associate = function (models) {
		// associations can be defined here
		console.log('associate', models);
	};
	return user;
};