CREATE TABLE IF NOT EXISTS users_tbl 
(
	`user_id` int NOT NULL AUTO_INCREMENT,
	`username` varchar(20) NOT NULL UNIQUE ,
    `email`  varchar(20) NOT NULL UNIQUE,
    `password` varchar(255) NOT NULL,
	`position` varchar(4) NOT NULL DEFAULT `user`,
	
                                    
	PRIMARY KEY (`user_id`)
      
);
