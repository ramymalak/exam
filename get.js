var url = require('url');

exports.getURLParam = function(req, res,file) {
	params = url.parse(req.url, true);
	var paramsArr = params.query;

		res.writeHead(200);
		res.write(file, "binary");
		res.end();

	res.end();
};

exports.doservice = function(req, res,uri) {
if(uri==="/questions"){
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: 'root'
	});
	connection.query("select id,body,option1,option2,option3,option4 from entlaqa.questions;", function(err, rows,fields){
		if (err) throw err;
                var comming_list=rows;
		var fs=require("fs");
		fs.writeFile('variable.js',"var comming_list="+JSON.stringify(comming_list)+';', function (err) {
			if (err) throw err;
                        fs.readFile('index.html', "binary", function(err, file) {
				if (err) {

					res.write(err + "\n");
					res.end();
					return;
				}
				res.write(file);
                                connection.end();
                                res.end();
				});
			});
		});
                
		
                        
}else {
	res.end();
}
};
