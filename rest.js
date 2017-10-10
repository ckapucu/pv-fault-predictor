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
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
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
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
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
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.put("/users",function(req,res){
        var query = "UPDATE ?? SET ?? = ?, ?? = ? WHERE ?? = ?";
        var table = ["users","name",req.body.name,"email",req.body.email, "recordno",req.body.recordno];
        query = mysql.format(query,table);
        console.log("Query " + query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
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
        console.log("Query " + query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
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
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with recordno "+req.params.recordno});
            }
        });
    });




    //PANEL_DATA pandat diye kısaltalım http verb olarak
	
    //panel verisi ekleme 
    router.post("/pandat",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        var table = ["panel_data","pvs_id","panel_id","voc","isc","irradiation","cell_temp","amb_temp","humidity","cell_temp0","cell_temp1","cell_temp2","cell_temp3","cell_temp_avg", 
        			req.body.pvs_id, req.body.panel_id, req.body.voc, req.body.isc, req.body.irradiation, req.body.cell_temp, req.body.amb_temp, req.body.humidity, req.body.cell_temp0, req.body.cell_temp1, req.body.cell_temp2, req.body.cell_temp3, req.body.cell_temp_avg];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Panel verisi eklendi !"});
            }
        });
    });

    //tüm sistemlere ait panel verilerini çekme
    router.get("/pandat",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["panel_data"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Pandat" : rows});
            }
        });
    });


    //fotovoltaik sistem ID'si ve panel ID'sine göre toplanmış verileri çekme
    router.get("/pandat/:pvs_id/:panel_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? AND ??=? ORDER BY pvs_id, panel_id, created DESC";
        var table = ["panel_data","pvs_id",req.params.pvs_id,"panel_id",req.params.panel_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Pandat" : rows});
            }
        });
    });


    //sadece fotovoltaik sistem ID'sine göre o sistemdeki tüm panellerin verilerini çekme
    router.get("/pandat/:pvs_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? ORDER BY panel_id, created";
        var table = ["panel_data","pvs_id",req.params.pvs_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Pandat" : rows});
            }
        });
    });    

    //pvs idsine ve panel idsine göre panele ait tüm toplanmış verileri silme
    router.delete("/pandat/:pvs_id/:panel_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=? AND ??=?";
        var table = ["panel_data","pvs_id",req.params.pvs_id,"panel_id",req.params.panel_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Silinen panel verileri pvsid: "+req.params.pvs_id+" panel id: "+req.params.panel_id});
            }
        });
    }); 

    //fotovoltaik sistem ekleme 
    router.post("/pvsdat",function(req,res){
        var query = "INSERT INTO ??(??) VALUES (?)";
        var table = ["pvs_data","pvs_name",req.body.pvs_name];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "PV sistem verisi eklendi !"});
            }
        });
    });

    //tüm fotovoltaik sistemler
    router.get("/pvsdat",function(req,res){
        //var query = "SELECT * FROM ??";
        var query = "SELECT recordno, pvs_name, (SELECT count(DISTINCT panel_id) FROM panel_data WHERE pvs_id=pvs_data.recordno) as panel_count FROM ??";
        var table = ["pvs_data"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Pvsdat" : rows});
            }
        });
    });    

    //pvs idsine göre tüm fotovoltaik sistemler
    router.get("/pvsdat/:recordno",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=? ORDER BY recordno";
        var table = ["pvs_data","recordno",req.params.recordno];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Pvsdat" : rows});
            }
        });
    });


    //pvs idsine göre tüm fotovoltaik paneller
    router.get("/pvspan/:pvs_id",function(req,res){
        //var query = "SELECT * FROM ?? WHERE ??=? ORDER BY panel_id";
        var query = "SELECT DISTINCT panel_id FROM ?? WHERE ??=? ORDER BY panel_id";
        var table = ["panel_data","pvs_id",req.params.pvs_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Pvspan" : rows});
            }
        });
    });

    //pvs idsine göre fotovoltaik sistem silme
    /* BENCE BU OLMASIN çünkü altında paneller olan fotovoltaik silinmemeli yada hemen ardından panellerin verileri de silinmeli
    router.delete("/pvsdat/:pvs_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["pvs_data","pvs_id",req.params.pvs_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted all panel data with panel id "+req.params.panel_id});
            }
        });
    });     
    /**/

    //pvs_id'sine göre istenilen alanı güncelleme
    //curl -i -H "Accept: application/json" -X PUT -d "field=latitude&value=37.215" https://serene-depths-19169.herokuapp.com/api/pvsdat/1
    //curl -i -H "Accept: application/json" -X PUT -d "field=longitude&value=28.363" https://serene-depths-19169.herokuapp.com/api/pvsdat/1
    router.put("/pvsdat/:recordno",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE recordno = ?";
        var table = ["pvs_data",req.body.field,req.body.value,req.params.recordno];
        query = mysql.format(query,table);
        console.log("Query " + query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                //res.json({"Error" : false, "Message" : "Updated the email for name "+req.body.email});
                res.json({"Error" : false, "Message" : "Guncellenen alan "+req.body.field+" to "+req.body.value+" recordno "+req.params.recordno});
            }
        });
    });
	
    //pvs_id'sine göre belirtilen alanı güncelleme
    //curl -i -H "Accept: application/json" -X PUT -d "value=37.215" https://serene-depths-19169.herokuapp.com/api/pvsdat/1/latitude
    //curl -i -H "Accept: application/json" -X PUT -d "value=28.363" https://serene-depths-19169.herokuapp.com/api/pvsdat/1/longitude
    router.put("/pvsdat/:recordno/:field",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE recordno = ?";
        var table = ["pvs_data",req.params.field,req.body.value,req.params.recordno];
        query = mysql.format(query,table);
        console.log("Query " + query);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                //res.json({"Error" : false, "Message" : "Updated the email for name "+req.body.email});
                res.json({"Error" : false, "Message" : "Guncellenen alan "+req.params.field+" to "+req.body.value+" recordno "+req.params.recordno});
            }
        });
    });

    router.post("/room",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??) VALUES (?,?,?,?)";
        var table = ["room_data","temp_in","hum_in","temp_out","hum_out",req.body.temp_in,req.body.hum_in,req.body.temp_out,req.body.hum_out];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Room and outer conditions added to Heroku!"});
            }
        });
    });

    router.get("/room",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["room_data"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Room" : rows});
            }
        });
    });	
	
	router.post("/battery",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??) VALUES (?,?,?,?,?)";
        var table = ["battery_data","bus_v","shunt_v","load_v","current","power",req.body.bus_v,req.body.shunt_v,req.body.load_v,req.body.current,req.body.power];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Battery conditions added to Heroku!"});
            }
        });
    });

    router.get("/battery",function(req,res){
        var query = "SELECT * FROM ?? ORDER BY recordno DESC";
        var table = ["battery_data"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Battery" : rows});
            }
        });
    });		
	
    router.get("/battery/:limit",function(req,res){
        var query = "SELECT * FROM ?? ORDER BY recordno DESC LIMIT ?";
		var table = ["battery_data",limit];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "SQL sorgusunda hata"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Battery" : rows});
            }
        });
    });	
}

module.exports = REST_ROUTER;