function getAllEmployees(req,res){
    res.send("getting all the employees")
}


function getEmployeeById(req,res){
    res.send(`getting employee by ${req.params.id}`)
}


function addEmployee(req,res){
    res.send("adding an employee")
}


function updateEmployee(req,res){
    res.send(`updating employee of ${req.params.id}`)
}


function deleteEmployee(req,res){
    res.send(`deleting employee of ${req.params.id}`)
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    addEmployee,
    updateEmployee,
    deleteEmployee
}