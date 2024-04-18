var db = require('../models/index');
var depts = db.dept;
var roles = db.role;
const role = async (req, res) => {
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
    
    await res.render('role', { alldeptname,alldeptrole })
}

const adddepts = async (req, res) => {
    // var dapt_input = req.body.department;
    var dept_input = req.body.department;
    var role_input = req.body.role;
    try {
        const isdept = await depts.findOne({ where: { dept_name: dept_input } });
        const isrole= await roles.findOne({ where: { role_name: role_input } });
        if(isdept){
            if(isrole){

            }else{
                isdept_id = isdept.id;
                var datas = await roles.create({ role_name: role_input, dept_id: isdept_id });
            }
        }else{
            // if(isrole){
            //     var data = await depts.create({ dept_name: dept_input });
            // }else{
                var data = await depts.create({ dept_name: dept_input });
                var datas = await roles.create({ role_name: role_input, dept_id: data.id });
            // }
        }


        // if(isdept){
        //     isdept_id = isdept.id;
        //     var datas = await roles.create({ role_name: role_input, dept_id: isdept_id });
        // }else{
        //     var data = await depts.create({ dept_name: dept_input });
        //     var datas = await roles.create({ role_name: role_input, dept_id: data.id });
        // }
        
        // if(isrole){
        //     var data = await depts.create({ dept_name: dept_input });
        // } else{
        //     var data = await depts.create({ dept_name: dept_input });
        //     var datas = await roles.create({ role_name: role_input, dept_id: data.id });
        // }
        // if(isdept){
        //     await res.redirect('/role');
        // }else{
            
            
            await res.redirect('/role');
        // }
        // res.send(data);
    } catch (error) {
        console.log(error);
    }
}

const addrole = async (req,res) => {
    // var dapt_input = req.body.department;
    var dept_input = req.body.department;
    var role_input = req.body.role;
    try {
        const isrole= await roles.findOne({ where: { role_name: role_input } });
        if(isrole){
        }else{
            var data = await depts.findAll({where: { dept_name: dept_input} });
            var datas = await roles.create({ role_name: role_input, dept_id: data[0].id });
        }
        // res.send(data);
        // console.log(data.id);
        await res.redirect('/role');
    } catch (error) {
        console.log(error);
    }
}
module.exports = { role, addrole,adddepts }
