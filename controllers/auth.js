const db = require('../models/index');
var employee = db.signin;
var depts = db.dept;
var roles = db.role;

const signin = async (req, res) => {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;
    var designation = req.body.designation;
    var address = req.body.address;
    var description = req.body.description;
    var department = req.body.department;
    var userroles = req.body.role;
    var leaveBank = '11';
    var joiningdate = '10-11-2020';
    // var departmentname = '';
    try {
        let data;

        var r_id = await roles.findOne({where: {role_name: userroles}});
        await depts.findOne({where: {dept_name: department}}).then(async(res) => {
        if(res) {
           data = await employee.create({ first_name: fname, last_name: lname, email: email, phone: phone, password: password, designation: designation, picture: "", address: address, description: description, department:department,leaveBank:leaveBank,joiningdate:joiningdate, role: r_id.get('id') ,dept_id: res.get("id")});
        }
    });
        // var data = await employee.create({ first_name: fname, last_name: lname, email: email, phone: phone, password: password, designation: designation, picture: "", address: address, description: description, department:department,leaveBank:leaveBank,joiningdate:joiningdate, dept_id: res.get("id")});


        // res.send({ message: "data save" });
        res.redirect('/admin');
    } catch (error) {
        console.log(error)
    }
}


const loginpage = async (req, res) => {
    await res.render('login');
}

const login = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password
    try {
        const emp = await employee.findOne({ where: { email: email } });
        if (emp) {
            if (password === emp.password) {
                req.session.user = {id : emp.id, name: emp.name}  
                res.redirect('/dashboard');
            } else {
                res.send({ message: "incorrect password" })
            }
        } else {
            res.send({ message: 'Email or password is Incorrect' });
        }
    } catch (error) {
        console.log(error);
    }
}

const dashboard = async (req,res) =>{
    await res.render('home');
}

const logout = async (req,res) =>{
    try{
        if(req.session){
            req.session.destroy((err)=>{
                if(err){
                    console.log(err)
                }else{
                  res.redirect('/');
                }
            })
        } else{
            res.redirect('/');
        }
    }catch(error){
        console.log(error);
    }
}

const admin = async (req,res) => {
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
    
    var allaccountrole = [];
    var accountrole = await roles.findAll( {where: {dept_id : 1 }});
    accountrole.forEach(accountdata =>{
        allaccountrole.push(accountdata.role_name)
    });

    var allhrrole = [];
    var hrrole = await roles.findAll( {where: {dept_id : 2 }});
    hrrole.forEach(hrdata =>{
        allhrrole.push(hrdata.role_name)
    });

    var alldsrole = [];
    var dsrole = await roles.findAll( {where: {dept_id : 3 }});
    dsrole.forEach(dsdata =>{
        alldsrole.push(dsdata.role_name)
    });

    var allbdrole = [];
    var bdrole = await roles.findAll( {where: {dept_id : 4 }});
    bdrole.forEach(bddata =>{
        allbdrole.push(bddata.role_name)
    });

    var alloperrole = [];
    var operrole = await roles.findAll( {where: {dept_id : 5 }});
    operrole.forEach(operdata =>{
        alloperrole.push(operdata.role_name)
    });
    // var allrolename = [];
    // var allrole = await roles.findAll(
    //     { order: [['dept_id', 'ASC']] }
    // );
    // allrole.forEach(roledata =>{
    //     allrolename.push(roledata.role_name)
    // });
    // console.log(alldeptname); 
    await res.render('admin',{alldeptname,allaccountrole,allhrrole,alldsrole,allbdrole,alloperrole,alldeptrole
        // allrolename
    });
} 

module.exports = { signin, loginpage, login,dashboard,logout,admin, }