var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
    {
        dialect: protocol,
        protocol: protocol,
        port: port,
        host: host,
        storage: storage,  // solo SQLite (.env)
        omitNull: true      // solo Postgres
    }
);

// Importar definicion de la tabla Quiz
var quiz_path = path.join(__dirname,'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz;

function DatabaseIsEmpty(count) {
    return count === 0;
}
function CreateQuestions() {
    Quiz.bulkCreate(
        [
            {
                pregunta: 'Capital de Italia', respuesta: 'Roma'
            },
            {
                pregunta: 'Capital de Portugal', respuesta: 'Lisboa'
            }
        ]
    ).then(function () {
            console.log('Base de datos inicializada')
        });
}
sequelize.sync().then(function(){
    Quiz.count().then(function(count){
        if(DatabaseIsEmpty(count)){
            CreateQuestions();
        }
    });
});