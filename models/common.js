var common = {
    insert: function(callback) {
        this.collection.insert(this.obj,
            function(err, doc) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, doc);
            })
    },
    find: function(obj, callback) {
        this.collection.find(obj,
            function(err, docs) {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, docs);
            })
    },
    findOne: function(obj, callback) {
        this.collection.findOne(obj).on('success',
            function(doc) {
                callback(doc);
            });
    },
    findAndModify: function(src, dst, callback) {
        this.collection.findAndModify(src, dst,
            function() {
                if (callback) callback()
            });
    },
    remove:function(obj,callback){
        this.collection.remove(obj,function(err){
            callback(err);
        });
    }
}
module.exports = common;