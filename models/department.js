module.exports = (sequelize, DataTypes) => {
    const department = sequelize.define('department',{
        dept_name:{type: DataTypes.STRING, allowNull: true}
    },{
        tableName: 'department',
        timestamps: false,
    })
    return department
}