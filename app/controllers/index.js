module.exports.home = function(application, res, req) {
  res.render("index", { validacao: {}, dadosForm: {} });
};

module.exports.autenticar = function(application, res, req) {
  var dadosForm = req.body;
  req.assert("usuario", "Usuário não pode ser vazio").notEmpty();
  req.assert("senha", "Senha não pode ser vazio").notEmpty();

  var erros = req.validationErrors();
  if (erros) {
    res.render("index", { validacao: erros });
    return;
  }
  var connection = application.config.dbConexao;
  var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
  UsuariosDAO.autenticar(dadosForm, res, req);
};
