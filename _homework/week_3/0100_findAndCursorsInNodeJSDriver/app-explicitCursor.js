var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');


MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    var query = {"category_code": "biotech"};

    var cursor = db.collection('companies').find(query);

    var i = 0;

    cursor.forEach(
        function(doc) {
            i++;

            if (i == 5) {
                cursor.close();
            }
            
            console.log(i + "." +  doc.name + " is a " + doc.category_code + " company." );
        },
        function(err) {
            console.log('db will close.');
            assert.equal(err, null);
            return db.close();
        }
    );

});
