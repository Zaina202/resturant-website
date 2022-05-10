const mysql=require("mysql")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE

})
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets")
const async = require("hbs/lib/async")

exports.deleteOrder=(req,res)=>{

 db.query('DELETE FROM bill WHERE id = (SELECT MAX(id) FROM bill)', (err, rows) => {

     if(err) {
    console.log(err);
   } 
   else {   
    console.log(rows);
    return res.render('menu',{
        message:'Your Order has been cancelled '
    })
    }

  }); 


}
exports.readOrder=(req,res)=>{
  //const{order,bill}=req.body;
  db.query('SELECT your_order,bill FROM bill WHERE id = (SELECT MAX(id) FROM bill)', (err, rows) => {
  
    if (!err) {
      res.render('menu');

      
    } else {
      console.log(err);
      
    }
    let b=rows;
    console.log('The data from bill table: \n',rows);
    
  });
}

/*<div class="col-6">
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="floatingInput" value="{{this.email}}" placeholder="email@email.com" name="email">
      <label for="floatingInput">Email</label>
    </div>
 */


/*{{#if removedUser}}
<div class="alert alert-success alert-dismissible fade show" role="alert">
 Donor has been removed.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
{{/if}}

<div class="row">
  <div class="col-6">
    <h1 >All  Donors </h1>
  </div>
  <div class="col-6 d-flex justify-content-end">
    <a href="/adduser" type="button" class="btn btn-primary align-self-center" style="background-color: rgb(247, 56, 56); ;border:2px solid rgb(255, 254, 254)">+ Add Donors</a>
  </div>
</div><br>

<table class="table table-bordered">
  <thead class="thead-dark">
    <tr>
      <th scope="col" class="text-center" >#</th>
      <th scope="col" class="text-center"> Name</th>
      <th scope="col" class="text-center">Blood Type</th>
      <th scope="col"  class="text-center">Email</th>
      <th scope="col"  class="text-center">Phone</th>
      <th scope="col"  class="text-center">Address</th>
      <th scope="col" class="text-center">Action</th>
    </tr>
  </thead>
  <tbody>

    {{#each rows}}
    <tr>
      <th scope="row">{{this.id}}</th>
      <td>{{this.name}}</td>
      <td>{{this.blood_type}}</td>
      <td>{{this.email}}</td>
      <td>{{this.phone}}</td>
      <td>{{this.address}}</td>

      <td class="text-center">
        <a href="/viewuser/{{this.id}}" type="button" class="btn btn-light btn-small"  style="background-color: darkgrey;"><i class="bi bi-eye"></i> View</a>
        <a href="/edituser/{{this.id}}" type="button" class="btn btn-light btn-small" style="background-color: darkgrey;" ><i class="bi bi-pencil"></i>
          Edit</a>
        <a href="/{{this.id}}" type="button" class="btn btn-light btn-small"  style="background-color: darkgrey;"  ><i class="bi bi-person-x"></i> Delete</a>
      </td>
    </tr>
    {{/each}}

  </tbody>
</table>
Noor
Noor F. Kalboneh
const mysql = require('mysql');
const dotenv=require('dotenv');
const path=require('path');
dotenv.config({path:'./.env'});
// Connection Pool
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'bloodbank'
});



connection.connect(error => {
  if(error) {
    console.log(error);
  }else{
    console.log('MYSQL connected of table user...*!');
  }
});
// View Users
exports.view = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render('home.hbs', { rows, removedUser });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  // Find User by Search
  exports.find = (req, res) => {
    let searchTerm = req.body.search;
    // User the connection
    connection.query('SELECT * FROM user WHERE  blood_type LIKE ?', [ searchTerm ], (err, rows) => {
      if (!err) {
        res.render('home.hbs', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  exports.form = (req, res) => {
    res.render('add-user.hbs');
  }
  exports.create = (req, res) => {
    const { name, blood_type, email, phone, address } = req.body;
    let searchTerm = req.body.search;
    // User the connection
    connection.query('INSERT INTO user SET name = ?, blood_type = ?, email = ?, phone = ?, address = ?', [name, blood_type, email, phone, address], (err, rows) => {
      if (!err) {
        res.render('add-user.hbs', { alert: ${name} added successfully. });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }

  // Edit user
exports.edit = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
      if (!err) {
        res.render('edit-user.hbs', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  // Update User
  exports.update = (req, res) => {
    const { name, blood_type, email, phone, address } = req.body;
    // User the connection
    connection.query('UPDATE user SET  name = ?, blood_type = ?, email = ?, phone = ?, address = ? WHERE id = ?', [name, blood_type, email, phone,address, req.params.id], (err, rows) => {
  
      if (!err) {
        // User the connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
          // When done with the connection, release it
          
          if (!err) {
            res.render('edit-user.hbs', { rows, alert: ${name} has been updated. });
          } else {
            console.log(err);
          }
          console.log('The data from user table: \n', rows);
        });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }

  
 

  
  // Delete User
exports.delete = (req, res) => {
    connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
      if (!err) {
        let removedUser = encodeURIComponent('Volunteer successeflly removed.');
        res.redirect('/?removed=' + removedUser);
      } else {
        console.log(err);
      }
      console.log('The data from beer table are: \n', rows);
    });
  
  }

  // View Users
exports.viewall = (req, res) => {

    // User the connection
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
      if (!err) {
        res.render('view-user', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  
  }*/