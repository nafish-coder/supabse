const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'db.peutsnrbxjjhcsaqrpyg.supabase.co',
  database: 'postgres',
  password: 'Nafish@7131',
  port: 5432,
});
const express = require('express')
const app = express()
const port = 2410
app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:2410');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});
app.get("/users", function (req, res, next) 
{ console.log("Inside /users get api"); 
const query =`SELECT * FROM users`;
pool.query(`SELECT * FROM users`, function (err, result) {
if (err) { res.status(400).send(err);}
console.log("Inside /users get api", res.send(result)); 
console.log(result); 
res.send(result.rows)

pool.end();
});
});
app.post("/user", function (req, res, next) { 
  console.log("Inside post of user");
var values = Object.values(req.body);
console.log(values);
const query =`INSERT INTO users (email, firstname, lastname, age)
VALUES ($1,$2,$3,$4)`;
pool.query(`insert into users (email, firstname, lastname, age)
VALUES ($1,$2,$3,$4)`, values, function (err, result) {
if (err) {
res.status(400).send(err);
}
//console.log(result);
res.send(`${result.rows} insertion successful`);
});
});
app.put("/user/:id", function (req, res, next) {
   console.log("Inside put of user"); let userId = req.params.id;
let age= req.body.age;
let values = [age, userId]
const query =`UPDATE users SET age= $1
WHERE id= $2`;
pool.query(query, values, function (err, result) { if (err) {
  
    res.status(400).send(err);
    }
    //console.log(result);
    res.send(`${result.rows} update successful`);
    });
    });
app.listen(port, () => {
console.log(`App running on port ${port}.`)
})