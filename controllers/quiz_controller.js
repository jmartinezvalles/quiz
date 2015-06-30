// GET /quizes/question

exports.question = function(res, req) {
  res.render('quizes/question', {pregunta: 'Capital de Italia'});
}

// GET /quizes/answer

exports.answer = function(res, req) {
  if (res.query.respuesta === 'Roma') {
    res.render('quizes/answer', {respuesta: 'Correcto'});
  } else {
    res.render('quizes/answer', {respuesta: 'Incorrecto'});
  }
}
