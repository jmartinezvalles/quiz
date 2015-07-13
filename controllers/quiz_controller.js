/**
 * @return {string}
 */
function GetAnswer(req) {
    if (req.query.respuesta === req.quiz.respuesta) {
        return 'Correcto';
    }
    return 'Incorrecto';
}

/**
 * @return {string}
 */
function ReplaceSpacesByPercentage(search) {
    search = search.split(" ");
    search = search.join('%');
    return search;
}

/**
 * @return {string}
 */
function AddDelimiters(search) {
    return '%' + search + '%';
}
function GetQueryFormatted(req) {
    var search = req.query.search;
    search = ReplaceSpacesByPercentage(search);
    search = AddDelimiters(search);
    return search;
}

var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
    models.Quiz.find(quizId).then(
        function(quiz){
            if(quiz){
                req.quiz = quiz;
                next();
            }
            else{
                next(new Error('No existe quizId='+ quizId));
            }
        }
    ).catch(function(error){ next(error)});
};

exports.index = function(req, res) {
    var query = {};

    if (req.query.search) {
        query = {where: ["lower(pregunta) like lower(?)", GetQueryFormatted(req)], order: 'pregunta ASC'}
    }

    models.Quiz.findAll(query).then(
        function (quizes) {
        res.render('quizes/index', {quizes: quizes});
        }
    ).catch(function(error){ next(error)});
};

exports.show = function(req, res) {
    res.render('quizes/show', {quiz: req.quiz});
};


exports.answer = function(req, res) {
    res.render('quizes/answer', { quiz:req.quiz, respuesta: GetAnswer(req) });
};
