const jwt = require("jsonwebtoken");
const pool = require("./database.js");
module.exports = {
  checkToken: (req, res, next) => {
   
    let token = req.get("authorization");

    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      
       
      jwt.verify(token,"qwe1234", (err, decoded) => {
        if (err) {
          
          return res.json({
        
            message: "Invalid Token..."
          });
        } else {
          
          console.log("code in else");
          req.decoded = decoded;
          console.log(req.decoded);
          req.validateid = req.decoded.result.id;
          req.validate= req.decoded.result.access;
          console.log("this is the id", req.validateid);
          console.log("this is the id", req.validate);

        }

    });
    }

    else {
        return res.json({
          success: 0,
          message: "Access Denied! Unauthorized User"
        });
      }
    next();
}}


         

 /*         pool.query('select * from storeid where id = $1',[req.validateid],(err,results)=>{

            console.log(results.rows);
           if(err)
           res.send(err);
    
           else if(results.rows==null)
           {
           res.send("please login again");
           
           }
           else
            return next();

          });
         
 
        }      
      });

    }
     else {
      return res.json({
        success: 0,
        message: "Access Denied! Unauthorized User"
      });
    }
    
  }
*/