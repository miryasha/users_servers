const Base = require("./base.model");


class Register extends Base {
    insert(data){
      return this.query(`INSERT INTO users_tbl SET?`, [data]);
      
    }

    getAll(){
      return this.query(`SELECT * FROM  users_tbl`)
    }

    geUserByEmail(email){
      return this.query(`SELECT * FROM  users_tbl WHERE email="${email}"`)
    }

    updateById({user_id, username, email,  password, position}){
     
      return this.query(`UPDATE users_tbl SET username="${username}", email="${email}" , password="${password}" , position="${position}" WHERE user_id=${user_id}`);
      
    }

    updateByEmail({ email, password }){
      return this.query(`UPDATE users_tbl SET password="${password}"  WHERE email="${email}"`);
      
    }

    delelteById(user_id){
      return this.query(`DELETE FROM users_tbl WHERE user_id=${user_id}`)
    }



  }
  module.exports = Register;