var sqlControl = require("./control/mysqlControl")
var ctrl = new sqlControl("localhost", "root", "sesamo", "mynodedb");
ctrl.connect().then((result) => {
    console.log(result);

    ctrl.writeJSON().then((result) => {
        console.log(result);
    }).catch((err) => {
        console.log(err);
    });
    ctrl.disconnect();
}).catch((err) => {
    console.log(err);
});
