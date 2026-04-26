const viewName = 'vw_user';
const query = `
SELECT 
a.email, 
a.name, 
a.tel, 
a.birth, 
a.sex, 
a.role, 
a.connectedIp,
a.connectedAt, 
a.createdIp, 
a.createdAt, 
a.updatedAt, 
b.id AS photoId, 
b.displayName,
IF(b.id IS NOT NULL, CONCAT('/download/', b.id, '/', b.displayName), NULL) AS photoUrl
FROM user AS a
LEFT JOIN files AS b ON a.email = b.userEmail
`;

module.exports = async (sequelize, DataTypes) => {
	await sequelize.query(`DROP VIEW IF EXISTS ` + viewName);
	// await sequelize.query(`ALTER TABLE chatOnline CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci`);
	await sequelize.query('CREATE VIEW ' + viewName + ' AS ' + query);

	const vw_user = sequelize.define('vw_user', {
		email: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		name: DataTypes.STRING,
		tel: DataTypes.STRING,
		birth: DataTypes.DATEONLY,
		sex: DataTypes.CHAR,
		role: DataTypes.STRING,
		connectedIp: DataTypes.STRING,
		connectedAt: DataTypes.DATE,
		createdIp: DataTypes.STRING,
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE,
		photoId: DataTypes.INTEGER,
		displayName: DataTypes.STRING,
		photoUrl: DataTypes.STRING,
	}, {
		tableName: viewName,
		timestamps: false,
	});

	return vw_user;
};