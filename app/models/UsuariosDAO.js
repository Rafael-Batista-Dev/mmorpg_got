function UsuariosDAO(connection) {
  this._connection = connection();
}

UsuariosDAO.prototype.iserirUser = function(usuario) {
  this._connection.open(function(err, mongoclient) {
    mongoclient.collection("usuarios", function(err, collection) {
      collection.insert(usuario);
      mongoclient.close();
    });
  });
};

UsuariosDAO.prototype.autenticar = function(usuario, res, req) {
  this._connection.open(function(err, mongoclient) {
    mongoclient.collection("usuarios", function(err, collection) {
      collection.find(usuario).toArray(function(err, result) {
        if (result[0] != undefined) {
          req.session.autorizado = true;
          req.session.usuario = result[0].usuario;
          req.session.casa = result[0].casa;
        }
        if (req.session.autorizado) {
          res.redirect("jogo");
        } else {
          res.redirect("/");
        }
      });
      mongoclient.close();
    });
  });
};

module.exports = function() {
  return UsuariosDAO;
};
