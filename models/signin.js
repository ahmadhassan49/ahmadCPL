module.exports = (sequelize, DataTypes) => {
    const signin = sequelize.define('signin', {
        first_name: { type: DataTypes.STRING, allowNull: true },
        last_name: { type: DataTypes.STRING, allowNull: true },
        department: { type: DataTypes.STRING, allowNull: true },
        designation: { type: DataTypes.STRING, allowNull: true },
        leaveBank: { type: DataTypes.STRING, allowNull: true },
        joiningdate: { type: DataTypes.DATE, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        picture: { type: DataTypes.STRING, allowNull: true },
        address: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        role:{type:DataTypes.STRING,allowNull:true}
    }, {
        tableName: 'signin',
        timestamps: false,
    })
    return signin
}