//https://codeforgeek.com/2015/03/restful-api-node-and-express-4/
//diğer bir alternatif https://www.npmjs.com/package/mysql-to-rest

//bu adrestede dosyaya ayzdıran ve oradan okuyanı var https://www.tutorialspoint.com/nodejs/nodejs_restful_api.htm

//security için denenebilir https://stormpath.com/blog/tutorial-build-rest-api-mobile-apps-using-node-js
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

    //PANEL_DATA pandat diye kısaltalım http verb olarak
    router.post("/pandat",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?)";
        var table = ["panel_data","panel_id","voc","isc","irradiation","cell_temp","amb_temp","humidity", 
        			req.body.panel_id, req.body.voc, req.body.isc, req.body.irradiation, req.body.cell_temp, req.body.amb_temp, req.body.humidity];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Panel Data Added !"});
            }
        });
    });

    router.get("/pandat",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["panel_data"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Pandat" : rows});
            }
        });
    });

    router.get("/pandat/:panel_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? ORDER BY created";
        var table = ["panel_data","panel_id",req.params.panel_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Pandat" : rows});
            }
        });
    });

    router.delete("/pandat/:panel_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["panel_data","panel_id",req.params.panel_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted all panel data with panel id "+req.params.panel_id});
            }
        });
    });    

}

module.exports = REST_ROUTER;