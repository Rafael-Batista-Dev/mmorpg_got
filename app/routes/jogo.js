module.exports = function(application) {
  application.get("/jogo", function(req, res) {
    application.app.controllers.jogo.playGamer(application, res, req);
  });

  application.get("/sair", function(req, res) {
    application.app.controllers.jogo.sair(application, res, req);
  });

  application.get("/suditos", function(req, res) {
    application.app.controllers.jogo.suditos(application, res, req);
  });

  application.get("/pergaminhos", function(req, res) {
    application.app.controllers.jogo.pergaminhos(application, res, req);
  });

  application.post("/ordenar_acao_suditos", function(req, res) {
    application.app.controllers.jogo.ordenar_acao_suditos(
      application,
      res,
      req
    );
  });
};
