function JogoDAO(connection) {
  this._connection = connection();
}

JogoDAO.prototype.geraParametros = function(usuario) {
  this._connection.open(function(err, mongoclient) {
    mongoclient.collection("jogo", function(err, collection) {
      collection.insert({
        usuario: usuario,
        moeda: Math.floor(Math.random() * 1000),
        suditos: Math.floor(Math.random() * 1000),
        temor: Math.floor(Math.random() * 1000),
        sabedoria: Math.floor(Math.random() * 1000),
        comercio: Math.floor(Math.random() * 1000),
        magia: Math.floor(Math.random() * 1000)
      });
      mongoclient.close();
    });
  });
};

JogoDAO.prototype.initGamer = function(res, usuario, casa, comando_invalido) {
  this._connection.open(function(err, mongoclient) {
    mongoclient.collection("jogo", function(err, collection) {
      collection.find({ usuario: usuario }).toArray(function(err, result) {
        res.render("jogo", {
          img_casa: casa,
          jogo: result[0],
          comando_invalido: comando_invalido
        });
        mongoclient.close();
      });
    });
  });
};

JogoDAO.prototype.acao = function(acao, res) {
  this._connection.open(function(err, mongoclient) {
    mongoclient.collection("acao", function(err, collection) {
      var date = new Date();
      var tempo = null;
      switch (acao.acao) {
        case 1:
          tempo = 1 * 60 * 60000;
        case 2:
          tempo = 2 * 60 * 60000;
        case 3:
          tempo = 5 * 60 * 60000;
        case 4:
          tempo = 5 * 60 * 60000;
      }
      acao.acao_termina_em = date.getTime() + tempo;
      collection.insert(acao);
      mongoclient.close();
    });
  });
};

JogoDAO.prototype.getAcoes = function(usuario, res) {
  this._connection.open(function(err, mongoclient) {
    mongoclient.collection("acao", function(err, collection) {
      collection.find({ usuario: usuario }).toArray(function(err, result) {
        res.render("pergaminhos", { acoes: result });
        mongoclient.close();
      });
    });
  });
};

module.exports = function() {
  return JogoDAO;
};
