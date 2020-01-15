module.exports.playGamer = function(application, res, req) {
  if (req.session.autorizado !== true) {
    res.send("Usuário deve fazer login");
    return;
  }

  var comando_invalido = "N";
  if (req.query.comando_invalido == "S") {
    comando_invalido = "S";
  }
  console.log(comando_invalido);

  var usuario = req.session.usuario;
  var casa = req.session.casa;
  var connection = application.config.dbConexao;
  var JogoDAO = new application.app.models.JogoDAO(connection);

  JogoDAO.initGamer(res, usuario, casa, comando_invalido);
};

module.exports.sair = function(application, res, req) {
  req.session.destroy(function(err) {
    res.render("index", { validacao: {} });
  });
};

module.exports.suditos = function(application, res, req) {
  res.render("aldeoes", { validacao: {} });
};

module.exports.pergaminhos = function(application, res, req) {
  if (req.session.autorizado !== true) {
    res.send("Usuário deve fazer login");
    return;
  }
  var connection = application.config.dbConexao;
  var JogoDAO = new application.app.models.JogoDAO(connection);
  var usuario = req.session.usuario;
  JogoDAO.getAcoes(usuario, res);
};

module.exports.ordenar_acao_suditos = function(application, res, req) {
  if (req.session.autorizado !== true) {
    res.send("Usuário deve fazer login");
    return;
  }
  var dadosForm = req.body;
  req.assert("acao", "Ação deve ser informada!").notEmpty();
  req.assert("quantidade", "Quantidade deve ser informada!").notEmpty();

  var erros = req.validationErrors();

  if (erros) {
    res.redirect("jogo?comando_invalido=S");
    return;
  }
  var connection = application.config.dbConexao;
  //var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
  var JogoDAO = new application.app.models.JogoDAO(connection);
  //UsuariosDAO.iserirUser(dadosForm);
  //JogoDAO.geraParametros(dadosForm.usuario);
  dadosForm.usuario = req.session.usuario;
  JogoDAO.acao(dadosForm);
  res.send("OK");
};
