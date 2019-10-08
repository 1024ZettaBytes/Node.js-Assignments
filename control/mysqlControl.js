var file = require("fs");
class controlSql {
    constructor(server, usr, pass, dbName) {
        this.mysql = require("mysql");
        this.dataConn = {
            host: server,
            user: usr,
            password: pass,
            database: dbName
        }
    }

    connect() {

        this.conn = this.mysql.createConnection({
            host: this.dataConn.host,
            user: this.dataConn.user,
            password: this.dataConn.password,
            database: this.dataConn.database
        });
        return new Promise((res, rej) => {
            console.log("[*] Connecting to database...");
            this.conn.connect(err => {
                if (err)
                    rej("[*] ERROR while trying to connect to database.");
                else
                    res("[*] Connected!");
            });
        });
    }

    writeJSON() {
        return new Promise((res, rej) => {
            console.log("[*] Fetching students data...");
            var data = this.conn.query("SELECT * FROM student", (err, queryresult, cols) => {
                if (!err) {
                    console.log("[*] Writing data into txt file...");
                    file.writeFile("./data.txt", JSON.stringify(queryresult), (err) => {
                        if (!err)
                            return res("[*] Done! Students data has been writen into 'data.txt' file.");
                        else
                            return rej("[*] ERROR while trying to write data into file.");
                    });
                }
                else {
                    return rej("[*] ERROR while fetching students data from database.");
                }
            });
        });

    }
    disconnect() {
        this.conn.end();
    }

}
module.exports = controlSql;