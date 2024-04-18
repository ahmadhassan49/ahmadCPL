const db = require('../models/index');
var employee = db.signin;
var depts = db.dept;
var roles = db.role;

const register = async (req, res) => {
    var alldeptname = [];
    var alldept = await depts.findAll();
    alldept.forEach(deptdata => {
        alldeptname.push(deptdata.dept_name)
    });
    
    var alldeptrole = [];
    var deptrole = await roles.findAll();
    deptrole.forEach(roledata =>{
        alldeptrole.push(roledata.role_name)
    });

    await res.render('register',{alldeptname,alldeptrole})
}

const alluser = async (req,res) => {
    await res.render('alluser');
}
module.exports = { register,alluser }
