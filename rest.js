//https://codeforgeek.com/2015/03/restful-api-node-and-express-4/
var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
           res.json({"Message" : "Hello World !"});
    });
    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";
        var table = ["users","name","email",req.body.name,req.body.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });

    router.get("/users",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["users"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.get("/users/:recordno",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["users","recordno",req.params.recordno];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.put("/users",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["users","name",req.body.name,"email",req.body.email, "recordno",req.body.recordno];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                //res.json({"Error" : false, "Message" : "Updated the email for name "+req.body.email});
                res.json({"Error" : false, "Message" : "Updated all fields for recordno "+req.body.recordno});
            }
        });
    });

    //alttaki daha kolay kulanıma sahip
    router.put("/users/:recordno",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE recordno = ?";
        var table = ["users","name",req.body.name,"email",req.body.email, req.params.recordno];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                //res.json({"Error" : false, "Message" : "Updated the email for name "+req.body.email});
                res.json({"Error" : false, "Message" : "Updated all fields for recordno "+req.params.recordno});
            }
        });
    });    

    router.delete("/users/:recordno",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["users","recordno",req.params.recordno];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with recordno "+req.params.recordno});
            }
        });
    });

}

module.exports = REST_ROUTER;