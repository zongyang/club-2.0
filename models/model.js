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

['insert', 'find', 'findOne', 'remove', 'save', 'update','fineAndModify'].forEach(function(method) {
    Model.prototype[method] = function() {
        this.collection[method].apply(this.collection, arguments);
    }
})

//按时间的倒序输出
Model.prototype.sortByDate = function(callback) {
    this.collection.find({}, {
        content: false
    }).sort({
        date: -1
    }, function(err, docs) {
        callback(err, docs);
    })
}
Model.prototype.delPathPrefix=function(docs,property) {
    var pos;
    docs.forEach(function(doc) {
        pos = doc[property].indexOf('/');
        doc[property] = doc[property].substr(pos);
    });
}

Model.prototype.close = function() {
    this.db.close();
}



module.exports = Model;