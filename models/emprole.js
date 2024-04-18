module.exports = (sequelize,DataTypes) => {
    const emprole = sequelize.define('emprole',{
        role_name:{type:DataTypes.STRING, allowNull: true}
    },{
        tableName:'emp_role',
        timestamps: false,
    })
    return emprole;
}