var db = null;

var app = {
    init: function () {
        db = window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'});

        db.sqlBatch([
            'CREATE TABLE IF NOT EXISTS DemoTable (name, score)',
            ['INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]],
            ['INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]],
        ], function () {
            console.log('Populated database OK');
        }, function (error) {
            console.log('SQL batch ERROR: ' + error.message);
        });

        app.loadData();

    },
    
    loadData: function () {
        db.executeSql('SELECT name, score FROM DemoTable', [], function (rs) {
            var div = document.getElementById('list');
            var result = '<ul class="list-group">';
            for (var x = 0; x < rs.rows.length; x++) {
                result = result + "<li class='list-group-item'> <span class='badge'>"+rs.rows.item(x).score+"</span>"+ rs.rows.item(x).name +"</li>";
                console.log("name: " + rs.rows.item(x).name + ", score: " + rs.rows.item(x).score);
            }
            result = result + "</ul>";
            div.innerHTML = result;
        }, function (error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
        });
    }
    
    

};







document.addEventListener('deviceready', function () {
    window.sqlitePlugin.echoTest(function () {
        app.init();
    });
});