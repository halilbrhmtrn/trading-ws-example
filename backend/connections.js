const mongoose = require('mongoose');

// Connect to DB1
const db1 = mongoose.createConnection('mongodb+srv://sample:JDiiwHH6HArIZ1Eo@db1.rfnhl.mongodb.net/user_1', { useNewUrlParser: true, useUnifiedTopology: true });
db1.on('error', console.error.bind(console, 'connection error:'));
db1.once('open', function() {
  console.log("we're connected to DB1!")
});

// Connect to DB2
const db2 = mongoose.createConnection('mongodb+srv://sampledb2:JDiiwHH6HArIZ1Eo@db2.rfnhl.mongodb.net/user_1', { useNewUrlParser: true, useUnifiedTopology: true });
db2.on('error', console.error.bind(console, 'connection error:'));
db2.once('open', function() {
  console.log("we're connected to DB2!")
});


module.exports = {
    db1,
    db2
}

