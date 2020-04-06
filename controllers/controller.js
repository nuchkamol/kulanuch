const fs = require('fs');
var parseString = require('xml2js').parseString;
var path = require('path');
const swig = require('swig');
const constants = require('../constants');
const session = require('express-session');
const xlsxFile = require('read-excel-file/node');
var MongoClient = require('mongodb').MongoClient;
var moment = require('moment');
var urldb = constants.MONGODB_URL;
let pathFiles = constants.PATHFILES;
let pathExcel = constants.PATHEXCEL;
exports.renderLogin = function (req, res) {
    console.log(pathFiles);
    swig.renderFile(pathFiles + '/index.html', {}, function (err, output) {
        if (err) {
            throw err;
        }
        res.send(output)
    });


}


exports.updateRoomService = function(req,response){
console.log("testttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt");
    MongoClient.connect(urldb, function(err, db) {
        if (err){
            rtn ={responseCode:"9999",responseMessage:err};
            response.json(rtn);  
        }else{
            var dbo = db.db("Kulanuch");
            var myquery = { KN_ROOM_NO: req.body.room_no };
            var newvalues = { $set: {KN_DESCRIPTION: req.body.description } };
            dbo.collection("Kulanuch_Rooms").updateOne(myquery, newvalues, function(err, res) {
                if (err){
                    rtn ={responseCode:"9999",responseMessage:err};
                    response.json(rtn);  
                }else{
                    rtn ={responseCode:"0000",responseMessage:"success"};
                    response.json(rtn);  
                } 
            
            });
            
        }
        db.close();
      }); 
    
}

exports.selectCustomerService = function(req,response){
    MongoClient.connect(urldb, function(err, db) { 
    
        if (err){
            rtn ={responseCode:"9999",responseMessage:err};
            response.json(rtn);  
        }else{

            var dbo = db.db("Kulanuch");

            var data = req.body.where!=null?req.body.where:"";
            console.log("data>>>"+data);
            dbo.collection("Kulanuch_Customers").find(data).toArray(function(err, result) {

            
            if (err){
                rtn ={responseCode:"9999",responseMessage:err};
                response.json(rtn);  
            }else{
                console.log(result);
                rtn =result;
                response.json(rtn);  
            } 
            
          
            });

        }
      
       db.close();
           
      }); 
}

exports.selectRoomService = function(req,response){
    MongoClient.connect(urldb, function(err, db) { 
    
        if (err){
            rtn ={responseCode:"9999",responseMessage:err};
            response.json(rtn);  
        }else{

            var dbo = db.db("Kulanuch");

            var data = req.body.where!=null?req.body.where:"";
            console.log("data>>>"+data);
            dbo.collection("Kulanuch_Rooms").find(data).toArray(function(err, result) {

            
            if (err){
                rtn ={responseCode:"9999",responseMessage:err};
                response.json(rtn);  
            }else{
                console.log(result);
                rtn =result;
                response.json(rtn);  
            } 
            
          
            });

        }
      
       db.close();
           
      }); 
}

exports.insertRoomService = function(req,response){
    console.log("insertRoomservice");
    var roomname = req.body.txtRoomName != null ?req.body.txtRoomName:"" ;
    console.log(roomname);
    var roomnumber = req.body.txtRoomNumber != null ? req.body.txtRoomNumber : "";
    console.log(roomnumber);
    var dormbranch = req.body.txtDormBranch != null ?  req.body.txtDormBranch:"";
    console.log(dormbranch);
    var dormfloor = req.body.txtDormFloor != null ? req.body.txtDormFloor:"";
    console.log(dormfloor);
    var dormroom = req.body.txtDormRoom != null ? req.body.txtDormRoom:"";
    console.log(dormroom);
    var status = req.body.ddlStatus != null ?req.body.ddlStatus : "" ;
    console.log(status);
    var description = req.body.txtDescription != null ? req.body.txtDescription : "";
    console.log("description :" +description);
    console.log(urldb);  
    
    var rtn ={responseCode:"9999",responseMessage:""};
    MongoClient.connect(urldb, function(err, db) { 
    
        if (err){
            rtn ={responseCode:"9999",responseMessage:err};
            response.json(rtn);  
        }else{

            var dbo = db.db("Kulanuch");
            var myobj = { KN_Room_Name: roomname, KN_ROOM_NO: roomnumber , KN_DORM_BRANCH:dormbranch , KN_DORM_FLOOR:dormfloor , KN_DORM_ROOM:dormroom , KN_STATUS : status , KN_DESCRIPTION: description };
            dbo.collection("Kulanuch_Rooms").insertOne(myobj, function(err, res) {

            
            if (err){
                rtn ={responseCode:"9999",responseMessage:err};
                response.json(rtn);  
            }else{
                rtn ={responseCode:"0000",responseMessage:"success"};
                console.log("1 document inserted"); 
                response.json(rtn);  
            } 
            
          
            });

        }
      
       db.close();
           
      }); 

}

exports.insertCustomerService = function(req,response){
    console.log("insertCustomerservice");
    var cus_title = req.body.ddlTitle != null ?req.body.ddlTitle:"" ;
    console.log(cus_title);
    var cus_name = req.body.txtFirstName != null ?req.body.txtFirstName:"" ;
    console.log(cus_name);
    var cus_lastname = req.body.txtLastName != null ? req.body.txtLastName : "";
    console.log(cus_lastname);
    var cus_idcard = req.body.txtIDcard != null ? req.body.txtIDcard : "";
    console.log(cus_idcard);
    var cus_startdate = req.body.txtStartDate != null ? req.body.txtStartDate : "";
    console.log(cus_startdate);
    var cus_enddate = req.body.txtExpireDate != null ? req.body.txtExpireDate : "";
    console.log(cus_enddate);
    var cus_email = req.body.txtEmail != null ?  req.body.txtEmail:"";
    console.log(cus_email);
    var cus_mobile = req.body.txtMobile != null ? req.body.txtMobile:"";
    console.log(cus_mobile);
    var cus_lineid = req.body.txtLineID != null ? req.body.txtLineID:"";
    console.log(cus_lineid);
    var cus_address = req.body.txtAddress != null ?req.body.txtAddress : "" ;
    console.log(cus_address);
    var cus_district = req.body.txtDistrict != null ? req.body.txtDistrict : "";
    console.log(cus_district);
    var cus_area = req.body.txtArea != null ? req.body.txtArea : "";
    console.log(cus_area);
    var cus_country = req.body.ddlCountry != null ? req.body.ddlCountry : "";
    console.log(cus_country);
    var cus_zipcode = req.body.txtZipcode != null ? req.body.txtZipcode : "";
    console.log(cus_zipcode);
    var cus_desc = req.body.txtDesc != null ? req.body.txtDesc : "";
    console.log(cus_desc);
    var cus_selectroom = req.body.ddlSelectRoom != null ? req.body.ddlSelectRoom : "";  
    console.log(cus_selectroom);
    var cus_status = req.body.ddlSelectStatus != null ? req.body.ddlSelectStatus : "";  
    console.log(cus_status);
    var cus_image = req.body.dataImage != null ? req.body.dataImage : "";  
    console.log(cus_image);
    console.log(urldb);  
    
    var rtn ={responseCode:"9999",responseMessage:""};
    MongoClient.connect(urldb, function(err, db) { 
    
        if (err){
            rtn ={responseCode:"9999",responseMessage:err};
            response.json(rtn);  
        }else{

            var dbo = db.db("Kulanuch");
           
            var myobj = { dateregister:moment().format('LLLL'),customer_title:cus_title,customer_firstname: cus_name, customer_lastname: cus_lastname ,customer_idcard:cus_idcard , customer_startdate:cus_startdate, customer_expiredate:cus_enddate, customer_email:cus_email , customer_mobile:cus_mobile , customer_lineid:cus_lineid , customer_address : cus_address , customer_district: cus_district,customer_area:cus_area , customer_country:cus_country,customer_zipcode:cus_zipcode,customer_description:cus_desc,customer_selectroom:cus_selectroom , customer_status:cus_status,customer_image:cus_image };
            dbo.collection("Kulanuch_Customers").insertOne(myobj ,{ useUnifiedTopology: true } , function(err, res) {

            
            if (err){
                rtn ={responseCode:"9999",responseMessage:err};
                response.json(rtn);  
            }else{
                rtn ={responseCode:"0000",responseMessage:"success"};
                console.log("1 document inserted" + res); 
                response.json(rtn);  
            } 
            
          
            });

        }
      
       db.close();
           
      }); 

}

exports.checkAccountID =function(req,res){

    var  headLogArray =["Method","AccountID","Title" ,"Name" , "Lastname" , "IP" , "UA" , "Error"];
    var  LogArray = [];
    try{
       LogArray.push("checkAccountID");
       
       console.log("in to check account id");
       console.log("in node " + req.body.txtAccountID);
       LogArray.push(req.body.txtAccountID);
       LogArray.push(req.body.selectedOption);
       LogArray.push(req.body.txtName);
       LogArray.push(req.body.txtLastname);
       var ipAddress = req.connection.remoteAddress;
       var ipArr = ipAddress.split(":"); 
       var ipUse = ipArr[Object.keys(ipArr).length-1] != null ? ipArr[Object.keys(ipArr).length-1] :"" ;
       LogArray.push(ipUse);
       LogArray.push(req.headers['user-agent']);

       
        var result = xlsxFile(pathExcel).then((rows) => {
    
            console.log(rows);
            console.table(rows);
            var rtn = {
                accountID :  "",
                isData: false
                };
            for (i in rows){
                if(req.body.txtAccountID == rows[i][0]){
                        rtn = {
                        accountID :  rows[i][0],
                        isData: true
                        };
                     break;
                }
        
            }   
            
            console.log(rtn);
            res.json(rtn);
            
        });
    }catch(ex){
        console.log(ex);
        LogArray.push(ex);
    }finally{

        result.then(data => { 
           
            InsertLogDB(headLogArray,LogArray);
      });
    }
        
}


exports.InsertLogDB = function(header,row){ 
     
    var nowDate =date.format(new Date(), "YYYY/MM/DD HH:mm:ss");
    var datefile =date.format(new Date(), "YYYYMMDD_HH");
    var path = constants.LOGPATH+ "log_"+datefile+".txt";
    var headerStr = "Datetime|";
    var rowStr = nowDate+"|";
    header.forEach(elementH => {
        
        headerStr += elementH + "|";
    });

    row.forEach(elementR => {
        console.log(elementR);
        rowStr += elementR + "|";
    });
    if(!fs.existsSync(path)){
           var stream = fs.createWriteStream(path);
           stream.once('open', function(fd) {
                stream.write(headerStr+"\r\n");
                stream.write(rowStr+"\r\n");
                stream.end();
              });
              stream.once('open', function(fd) {
                
                stream.end();
              });
    }else{

        fs.appendFile(path, rowStr+"\r\n", function (err) {
            if (err) {
              // append failed
            } else {
             console.log("log success");
            }
          })

    }
    
};

exports.callsoapservice= async function(url,xml,sampleHeaders) {
    try{

    
    const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
        // console.log(headers);
        // console.log(body);   
        // console.log(statusCode);    
        return  { statusCode, body };
    }catch(ex){
        throw new Error(ex);
    }
    
  
 }



exports.Accountlogon = function (req, res) {
    console.log("req.body:" + req.body.txtUsername + "," + req.body.txtPassword);
    // const feedback = req.body.txtUsername;
    // const username = req.body.txtPassword;
    // //res.end("feedback 555:" + feedback +"and" + username);
    // res.json({ result: "success", username: username, feedback: feedback })
    console.log("Accountlogon");
    var  headLogArray =["Method","Username","Password" ,"IPAddress" , "URL" , "ResponseCode" , "ResponseBody" , "UA" , "Error"];
    var  LogArray = [];
    try{
       
        LogArray.push("Accountlogon");
        var username = req.body.txtUsername;
        var password = req.body.txtPassword;
        var ipAddress = req.connection.remoteAddress;
        var ipArr = ipAddress.split(":"); 
        var ipUse = ipArr[Object.keys(ipArr).length-1] != null ? ipArr[Object.keys(ipArr).length-1] :"" ;

        //hardcode
       // ipUse ="10.104.146.199";
        console.log("username+password+ipAddress>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+username+password+ipUse)
        LogArray.push(username);
        LogArray.push(password);
        LogArray.push(ipUse);

        // example data
        const url = constants.URLMCOA;
        console.log("url>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+url)
        LogArray.push(url);
        const sampleHeaders = {
            'user-agent': req.headers['user-agent'],
            'Content-Type': 'text/xml;charset=UTF-8',
            'soapAction': url,
        };

        const xml = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:wifi=\"http://wifi.ais.co.th/\">" +
                    "<soap:Header/>" +
                    "<soap:Body>" +
                    "<wifi:accountLogon>" +
                    //<!--Optional:-->
                    "<username>"+ username +"</username>"+
                    //<!--Optional:-->
                    "<password>"+ password +"</password>" +
                    //<!--Optional:-->
                    "<ipAddress>"+ ipUse +"</ipAddress>"+
                    "</wifi:accountLogon>" +
                    "</soap:Body>"+
                    "</soap:Envelope>";

        // usage of module

          var result = appcode.callsoapservice(url,xml,sampleHeaders).then(data => {

           LogArray.push(data["statusCode"]);
           


            parseString(data["body"], function (err, result) {
                var JOB = result["soap:Envelope"]["soap:Body"][0]["ns2:accountLogonResponse"][0]["return"][0];
                console.log("accountlogon >>>>>>>>>>"+JSON.stringify(JOB));
              
                req.session.username =username;
                // console.log( "logonStatus"+JOB["logonStatus"][0]);
                console.log( "req.session.username"+req.session.username);
                LogArray.push(JSON.stringify(JOB));  
                res.json(JSON.stringify(JOB));
            });


           });






    }catch(ex){
        console.log(ex);
        LogArray.push(ex);

    }finally{

       result.then(data => { 
            LogArray.push(req.headers['user-agent']);
            appcode.InsertLog(headLogArray,LogArray);
      });
    }


}


exports.Accountlogout = function (req, res) {
    var  headLogArray =["Method","Username","Password" ,"IPAddress" , "URL" , "ResponseCode" , "ResponseBody" , "UA" , "Error"];
    var  LogArray = [];
    try{
       
        LogArray.push("Accountlogout");
        var username =  req.session.username;
        var ipAddress = req.connection.remoteAddress;
        var ipArr = ipAddress.split(":"); 
        var ipUse = ipArr[Object.keys(ipArr).length-1] != null ? ipArr[Object.keys(ipArr).length-1] :"" ;
        LogArray.push(username);
        LogArray.push("");
        LogArray.push(ipUse);
        // example data
        const url = constants.URLMCOA;
        console.log("url>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+url)
        LogArray.push(url);
        const sampleHeaders = {
            'user-agent': req.headers['user-agent'],
            'Content-Type': 'text/xml;charset=UTF-8',
            'soapAction': url,
        };

 const xml = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:wifi=\"http://wifi.ais.co.th/\">" +
            "<soap:Header/>" +
            "<soap:Body>" +
                "<wifi:accountLogoff>" +
                "<ipAddress>"+ ipUse +"</ipAddress>" +
                "</wifi:accountLogoff>" +
            "</soap:Body>" +
            "</soap:Envelope>";

 // usage of module

   var result = appcode.callsoapservice(url,xml,sampleHeaders).then(data => {
        LogArray.push(data["statusCode"]);
            


        parseString(data["body"], function (err, result) {
            var JOB = result["soap:Envelope"]["soap:Body"][0]["ns2:accountLogoffResponse"][0]["return"][0];
            console.log("accountLogout >>>>"+JSON.stringify(JOB)); 
          //  LogArray.push(JSON.stringify(JOB)); 
            res.json(JSON.stringify(JOB));
          
        });

   });


    }catch(ex){
        console.log(ex);
        LogArray.push(ex);
    }finally{
        req.session.destroy();
        result.then(data => { 
            LogArray.push(req.headers['user-agent']);
            appcode.InsertLog(headLogArray,LogArray);
      });
    }
}


exports.CheckStatusLogon = function (req, res) {
    var  headLogArray =["Method","Username","Password" ,"IPAddress" , "URL" , "ResponseCode" , "ResponseBody" , "UA" , "Error"];
    var  LogArray = [];
    try{
       
        LogArray.push("CheckStatusLogon");
        var username =  req.session.username;
        var ipAddress = req.connection.remoteAddress;
        var ipArr = ipAddress.split(":"); 
        var ipUse = ipArr[Object.keys(ipArr).length-1] != null ? ipArr[Object.keys(ipArr).length-1] :"" ;
        LogArray.push(username);
        LogArray.push("");
        LogArray.push(ipUse);
        // example data
        const url = constants.URLMCOA;
        console.log("url>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+url)
        LogArray.push(url);
        const sampleHeaders = {
            'user-agent': req.headers['user-agent'],
            'Content-Type': 'text/xml;charset=UTF-8',
            'soapAction': url,
        };

 const xml = "<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:wifi=\"http://wifi.ais.co.th/\">" +
                "<soap:Header/>" +
                "<soap:Body>" +
                "<wifi:accountProfileStatusQuery>" +
                    "<ipAddress>"+ ipUse +"</ipAddress>" +
                "</wifi:accountProfileStatusQuery>" +
                "</soap:Body>" +
            "</soap:Envelope>";

 // usage of module

   var result = appcode.callsoapservice(url,xml,sampleHeaders).then(data => {
        LogArray.push(data["statusCode"]);
            
        console.log("CheckStatusLogon >>>>>>>>>>>>>xml>>>>>>>>>>>>>>>>>>>>> "+data["body"]);

        parseString(data["body"], function (err, result) {
            console.log("CheckStatusLogon >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>result"+result); 
            var JOB = result["soap:Envelope"]["soap:Body"][0]["ns2:accountProfileStatusQueryResponse"][0]["return"][0];
            console.log("CheckStatusLogon >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>job"+JSON.stringify(JOB)); 
            LogArray.push(JSON.stringify(JOB)); 
            res.json(JSON.stringify(JOB));
          
        });

   });


    }catch(ex){
        console.log(ex);
        LogArray.push(ex);
    }finally{
        req.session.destroy();
        result.then(data => { 
            LogArray.push(req.headers['user-agent']);
            appcode.InsertLog(headLogArray,LogArray);
      });
    }
}