
var settings = require('../settings.js');
var mongojs = require('mongojs');
var db;

(function() {
    var host = (settings.db && settings.db.host) || 'localhost';
    var port = (settings.db && settings.db.port) || 27017;
    var name = (settings.db && settings.db.name) || 'club';
    var url = 'mongodb://' + host + ':' + port + '/' + name;
    db = mongojs(url);
})();

function Model(collectionName) {
    this.db = db;
    this.collection = db.collection(collectionName);
}

['insert','find', 'findOne','remove'].forEach(function(method){
    Model.prototype[method] = function(){
        this.collection[method].apply(this.collection, arguments);
    }
})

Model.prototype.update = function(query, setVal, callback) {
    this.collection.update(query, setVal, function(err, doc) {
        callback(err, doc);
    });
}
Model.prototype.close = function() {
    this.db.close();
}

module.exports = Model;