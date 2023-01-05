let express = require("express");
let app = express();
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'db.peutsnrbxjjhcsaqrpyg.supabase.co',
  database: 'postgres',
  password: 'Nafish@7131',
  port: 5432,
});
app.use(express.json());
app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
res.header(
"Access-Control-Allow-Methods",
"GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
);
res.header(
"Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept"
);
next();
});
const port = 2410;
app.listen(port, () => console.log(`Listening on port ${port}!`));




app.get("/svr/Employees", function (req, res, next) 
{ console.log("Inside /users get api"); 

pool.query(`SELECT * FROM employees`, function (err, result) {
if (err) { res.status(400).send(err);}
console.log("Inside /users get api"); 
console.log(result); 
res.send(result)

 
});
});
app.get("/svr/Employees/designation/:designation", function (req, res) 
  { 
  let designation= req.params.designation;
  const query=`select * from employees 
where designation='${designation}'`;
pool.query(query, function (err, result) {
if (err) { res.status(400).send(err);}
console.log("Inside /users get api",query); 
console.log(result); 
res.send(result)

 
});
});

app.post("/svr/Employees", function (req, res, next) { 
  console.log("Inside post of user");
var values = Object.values(req.body);
console.log(values);

pool.query(`INSERT INTO employees (name,department,designation,salary,gender)
VALUES ($1,$2,$3,$4,$5)`, values, function (err, result) {
if (err) {
res.status(400).send(err);
}
//console.log(result);
res.send(`${result} insertion successful`);
 
});
});





app.get("/svr/Employees/department/:department", function (req, res) {
    let department= req.params.department;
    const query=`select * from employees 
    where department='${department}'`;
    pool.query(query, function (err, result) {
    if (err) { res.status(400).send(err);}
    console.log("Inside /users get api",query); 
    console.log(result); 
    res.send(result)
     
  })
  
})
app.delete("/svr/Employees/:empCode", function (req, res) { 
    let empCode =req.params.empCode;
    const query=`DELETE FROM  employees 
    where "empCode"=${empCode}`;
    pool.query(query, function (err, result) {
    if (err) { res.status(400).send(err);}
    console.log("Inside /users get api",query); 
    console.log(result); 
    res.send(result)
     
  })
  
})

app.get('/svr/addEmployees/:empCode' ,function(req,res){
    let empCode=req.params.empCode;
    const query=`select * FROM  employees 
    where "empCode"=${empCode}`;
    pool.query(query, function (err, result) {
    if (err) { res.status(400).send(err);}
    console.log("Inside /users get api",query); 
    console.log(result); 
    res.send(result)
     
  })
  
})

  
app.put("/svr/Employees/:empCode", function (req, res, next) {
  console.log("Inside put of user");    
  let empCode= req.params.empCode;
  let body= req.body;
const query =`UPDATE employees SET name='${body.name}',department='${body.department}',
designation='${body.designation}',salary=${body.salary},gender='${body.gender}'
WHERE "empCode"= '${empCode}'`;
pool.query(query,  function (err, result) { if (err) {
 
   res.status(400).send(err);
   }
   //console.log(result);
   res.send(`${result} update successful`);
   pool.end();
   });
   });
