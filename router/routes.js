const express = require("express");
const file_system = require("fs");
const path = require("path");
const router = express.Router();
const db_path = path.join(__dirname, "../db/employees.json");

const read_data = () => {
const data = file_system.readFileSync(db_path);

return JSON.parse(data);
};

const write_data = (data) => {
file_system.writeFileSync(db_path, JSON.stringify(data, null, 2));
};

router.get("/", (req, res) => {
const employees = read_data();

res.json(employees);
}

);

router.get("/employees/:employee_id", (req, res) => {
const employees = read_data();
const employee = employees.find(u => u.employee_id === parseInt(req.params.employee_id));

if (employee) {
res.json(employee);
} else {
res.status(404).send("Employee does not exist, please try again.");
}

}

);

router.post("/", (req, res) => {
const employees = read_data();

const new_employee = {
employee_id: employees.length + 1,
employee_name: req.body.employee_name,
position: req.body.position
};

employees.push(new_employee);
write_data(employees);

res.status(201).json(new_employee);
}

);

router.put("/employees/:employee_id", (req, res) => {
const employees = read_data();
const employee_index = employees.findIndex(u => u.employee_id === parseInt(req.params.employee_id));

if (employee_index !== -1) {
employees[employee_index] = {
employee_id: employees[employee_index].employee_id,
employee_name: req.body.employee_name,
position: req.body.position
};

write_data(employees);

res.json(employees[employee_index]);
} else {
    res.status(404).send("Employee does not exist.");
}

}

);

router.delete("/employees/:employee_id", (req, res) => {
const employees = read_data();
const remove_employee = employees.filter(u => u.employee_id !== parseInt(req.params.employee_id));

if (remove_employee.length !== employees.length) {
write_data(remove_employee);

res.status(204).send();
} else {
res.status(404).send("Employee does not exist.");
}
    
}
    
);
    
    module.exports = router;