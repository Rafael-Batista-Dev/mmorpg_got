module.exports = function(application) {
  application.get("/cadastro", function(req, res) {
    application.app.controllers.cadastro.cadastro(application, res, req);
  });

  application.post("/cadastrar", function(req, res) {
    application.app.controllers.cadastro.cadastrar(application, res, req);
  });
};
