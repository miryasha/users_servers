
//class TickersForCalling extends Base {
    const Base = require("./base.model");
    const CryptoJS = require("crypto-js");
    const mysql = require("mysql");
 
    require('dotenv').config();
    const key = process.env.ALPHA_KEY;
    const dbKey = process.env.PASS_HASH_DATABASE;
    const baseUrl = process.env.BASE_URL
    
    class TickersForCalling extends Base {
    
        create(strategy_name){
            return this.query(`
            
            CREATE TABLE IF NOT EXISTS strategy_name_tbl
        
          (
            strategy_name_id INT NOT NULL AUTO_INCREMENT,
            strategy_name varchar(50) NOT NULL UNIQUE ,
            description varchar(255) NOT NULL,
            setup varchar(255) NOT NULL,             
            database_name varchar(255) NOT NULL,
            
            host varchar(255) NOT NULL,
            port varchar(40) NOT NULL,
            user varchar(100) NOT NULL,
            password varchar(255) NOT NULL,
                               
            PRIMARY KEY (strategy_name_id)
          );  
       `);
    
        }
        
    
        insert(args){
            return this.query(`INSERT INTO  strategy_name_tbl SET?`, [args]);
        }
    
    
    
        get(strategy_name, args){
    
          return  this.findStrategyDataBaseInfo(strategy_name)
           .then( async (list) => {  
      
                if( list.length !== 0){
                    let i = 0;
                    const strategyNameId = await list.map( sni => sni.strategy_name_id)[i];
                    const strategyName = await list.map( sn => sn.strategy_name)[i];
                    const description = await list.map( d => d.description)[i];
                    const setup = await list.map( s => s.setup)[i];
                                   
                                                       
                    const cryptoDatabase_name = await list.map( dbn => dbn.database_name)[i]; 
                    // Decrypt database_name
                    //const decryptDatabase_name  = await CryptoJS.AES.decrypt(cryptoDatabase_name, dbKey);
                    //const database_name = await decryptDatabase_name.toString(CryptoJS.enc.Utf8);
                   
                    const cryptoHost = await list.map( h => h.host)[i]; 
                    // Decrypt host
                    //const decryptHost  = await CryptoJS.AES.decrypt(cryptoHost, dbKey);
                    //const host = await decryptHost.toString(CryptoJS.enc.Utf8);
    
                    const port = await list.map( p => p.port)[i]; 
                    const user = await list.map( u => u.user)[i]; 
                    const cryptoPassword = await list.map( pass => pass.password)[i]; 
                    // Decrypt pass
                    //const decryptPass  = await CryptoJS.AES.decrypt(cryptoPassword, dbKey);
                    //const password = await decryptPass.toString(CryptoJS.enc.Utf8);
                
    
                    const dbCongig = await mysql.createConnection({
                
                    host: cryptoHost,//host,
                    port: port,//port
                    user: user,//username
                    password: cryptoPassword,//password,//password
                    database: cryptoDatabase_name,//database_name//database
                        
                    });
    
                      const state = args.status;
                      const by = args.by;
                      
                      switch ( state ) {
                         
                          case "all":
                             // get all the data associated
                               return this.getAll(dbCongig, strategyName);
                              break;
                             
                          case "symbol":
                            //  associate data with ticker name with strategy
                                return this.getSymbol(dbCongig, strategyName, by);
                              break;
                          case "tradeduration":
                            //  associate data with ticker name with strategy
                                return this.getCallDuration(dbCongig, strategyName, by);
                              break;
                          
                          default:
                              return {"message" : "check the calling url doc! somthing went wrong!!!!!"}
                      }
                    
                      //here is end for checking if the table is not empty
                    } else {
                        return {"message": "The is no stategy to retrieve!!"}
                    }
                    
                  
          })//endt of then
          
     };
    
        findStrategyDataBaseInfo(strategy_name){
          return this.query(`SELECT * FROM strategy_name_tbl WHERE strategy_name ="${strategy_name}" `);
    
        };
    
    
        getAll(dbCongig, strategy_name){
    
              return new Promise((resolve, reject) => {
                let sql =  `SELECT * FROM  ${strategy_name}`
                dbCongig.query(sql, function(error, results){
                    if(error){ return reject(err.sqlMessage); }
                    else {
                        return resolve(results);
                    }
                })
                dbCongig.end()
            });
    
        }
    
        getSymbol(dbCongig, strategy_name, by){
              return new Promise((resolve, reject) => {
                let sql =  `SELECT * FROM  ${strategy_name} WHERE symbol="${by}"`
                dbCongig.query(sql, function(error, results){
                    if(error){ return reject(err.sqlMessage); }
                    else {
                        return resolve(results);
                    }
                })
                dbCongig.end()
              });
    
        }
    
    
        getCallDuration(dbCongig, strategy_name, by){
          return new Promise((resolve, reject) => {
            let sql =  `SELECT * FROM  ${strategy_name} WHERE trade_duration=${by}`
            dbCongig.query(sql, function(error, results){
                if(error){ return reject(err.sqlMessage); }
                else {
                    return resolve(results);
                }
            })
            dbCongig.end()
          });
    
       }
        
    
    
    
    
        
      }
      module.exports = TickersForCalling;    