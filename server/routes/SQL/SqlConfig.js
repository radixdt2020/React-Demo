// JavaScript source code

var mysql = require("mssql");

//var config = {
//    user: 'rxOnboard',
//    password: 'rxOnboard',
//    server: '192.168.100.193\\MSSQLSERVER2017',
//    database: 'OnboardedToll'
//};

//// connect to your database

//var sql = {

//    sqlData: function sqlDataFunction() {
//        sqlServer.connect(config, function (err) {

//            if (err) console.log(err);

//            // create Request object
//            var request = new sqlServer.Request();

//            // query to the database and get the records
//            request.query('select * from getUrl(5000)', function (err, recordset) {

//                if (err) console.log(err)

//                // send records as a response
//                return recordset;

//            });
//        });
//    }
//};

//module.exports = sql;

var dbConfig = {
    //user: 'rxOnboard',
    //password: 'rxOnboard',
    //server: '192.168.100.193\\MSSQLSERVER2017',
    //database: 'OnboardedToll'

    user: 'SA_local',
    password: 'Radixweb123',
    server: 'PC0610',
    database: 'EmployeeData'
};

function executeQuery(query, callback) {
    mysql.close();
    mysql.connect(dbConfig, function (err) {
        var request = new mysql.Request();
        //console.log(request);
        request.query(query, function (err, result) {
            //console.log(request);
            //console.log(query);
            // console.log(dbConfig);
            // console.log(result);
            return callback(null, result);
              res.render('index', {count: JSON.parse(JSON.stringify(result.rowsAffected))});
        });
    });
}



function query(sql, callback) {
    executeQuery(sql, function (err, data) {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
}




module.exports = {
    query: query
}


//var config = {
//    server: '192.168.100.193\\MSSQLSERVER2017',
//    authentication: {
//        type: 'default',
//        options: {
//            user: 'rxOnboard',
//            password: 'rxOnboard',
//        }
//    },
//    options: {
//        database: 'OnboardedToll',
//        instanceName: 'Sqlexpress',
//        rowCollectionOnDone: true,
//        useColumnNames: false
//    }
//}
//var connection = new Connection(config);
//connection.on('connect', function (err) {
//    if (err) {
//        console.log(err);
//    } else {
//        console.log('Connected');
//    }
//});

//function spGetExecute(qry, callback) {
//    var data = [];
//    var dataset = [];
//    var resultset = 0;
//    request = new Request(qry, function (err, rowCount) {
//        utility.sendDbResponse(err, rowCount, dataset, callback);
//    });
//    request.on('row', function (columns) {
//        utility.buildRow(columns, data);
//    });
//    request.on('doneInProc', function (rowCount, more, rows) {
//        dataset.push(data);
//        data = [];
//    });
//    connection.callProcedure(request);
//}