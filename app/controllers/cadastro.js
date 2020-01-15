module.exports.cadastro = function(application, res, req) {
  res.render("cadastro", { validacao: {}, dadosForm: {} });
};

module.exports.cadastrar = function(application, res, req) {
  var dadosForm = req.body;
  req.assert("nome", "Nome não pode ser vazio").notEmpty();
  req.assert("usuario", "Usuário não pode ser vazio").notEmpty();
  req.assert("senha", "Senha não pode ser vazio").notEmpty();
  req.assert("casa", "Casa não pode ser vazio").notEmpty();

  var erros = req.validationErrors();
  if (erros) {
    res.render("cadastro", { validacao: erros, dadosForm: dadosForm });
    return;
  }
  var connection = application.config.dbConexao;
  var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
  var JogoDAO = new application.app.models.JogoDAO(connection);
  UsuariosDAO.iserirUser(dadosForm);
  JogoDAO.geraParametros(dadosForm.usuario);
};
