const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DBNAME,process.env.DBUSER,process.env.DBPASSWORD,{
    host: process.env.DBHOST,
    logging: false,
    dialect: 'mysql'
});

try{
    sequelize.authenticate();
    console.log("database connected sucessfully")
}catch(error){
    console.log('connection faield', error)
}

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// create table 
db.signin = require('./signin')(sequelize,DataTypes);
db.dept = require('./department')(sequelize,DataTypes);
db.role = require('./emprole')(sequelize,DataTypes);

// relations 
db.signin.belongsTo(db.dept, { as: 'dept', foreignKey: 'dept_id' });
db.role.belongsTo(db.dept, {as: 'dept', foreignKey: 'dept_id'});

db.sequelize.sync({alter:true});
module.exports = db;