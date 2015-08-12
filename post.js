var url = require('url');
exports.getPostContent = function (req, res, uri) {
    var data = "";
    req.on('data', function (chunk) {
        data += chunk;
    });
    req.on('end', function () {
        if (uri === "/result") {
            var mysql = require('mysql');
            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root'
            });
            data = JSON.parse(data);
            data = data.msg;
            var counter = 0;
            function getresult(i) {
                if (i < data.length) {
                    connection.query("select right_option from entlaqa.questions where id = ? ;", (data[i]).id, function (err, rows, fields) {
                        if (err) {
                            console.log('error: ' + err);
                        }
                        else {
                            if (rows[0].right_option == (data[i]).answer) {
                                counter++;

                            }
                            getresult(i + 1);
                        }
                    });
                } else {
                    res.end("your score is " + (counter * 100 / data.length) + "%");
                }
            }
            getresult(0);
        } else {
            res.end();
        }

    });
};