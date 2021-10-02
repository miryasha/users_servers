    const Base = require("./base.model");


    class CreateUsersTbl extends Base {

    create(){
        return this.query(`
                CREATE TABLE IF NOT EXISTS users_tbl 
                (
                user_id int NOT NULL AUTO_INCREMENT,
                username varchar(20) NOT NULL UNIQUE ,
                email  varchar(20) NOT NULL UNIQUE,
                password varchar(255) NOT NULL,
                position varchar(10) NOT NULL DEFAULT "user",
                
                                                                
                PRIMARY KEY (user_id)
                
                );

                    
         `);

    }




    }
    module.exports = CreateUsersTbl;    