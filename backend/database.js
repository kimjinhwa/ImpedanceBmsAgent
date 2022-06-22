var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/impedancedb');
console.log("mongodb connection...");

var mongoosedb = mongoose.connection;
mongoosedb.on('error', function () {
    console.log('mongodb connetion Failed!');
})

mongoosedb.once('open', function () {
    console.log('mongodb conneted!');
    var cursor = mongoosedb.collection('bms_a').find();
    //cursor.forEach(console.dir);
    cursor.forEach((doc) => {
        console.log(doc);
        console.log(doc.cellValue[0][1]);
        console.log(doc.logDate);
        console.log(doc.cellValue.length);
    });
})
module.exports = mongoosedb;