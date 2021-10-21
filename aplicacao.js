var app = require('express'); //importando a lib express
var mysqlImporte = require('mysql'); //importando a lib que se conecta ao banco de dados
var appExe = app(); //executando a função
appExe.use(app.json());//método do express para efetuar a leitura do corpo da requisição (body)


appExe.get('/rotaTeste', function(req, res) { //criando rota com método GET (pegar)
    console.log("A rota foi criada"); //exibe no terminal a mensagem servindo para teste
    res.send("Sua rota foi criada com sucesso"); //mensagem de resposta para o usuário solicitante pela URL
});

appExe.get('/noticias', function(req, res) { //criando rota com método Get para noticias
    var conexaoBanco = mysqlImporte.createConnection({ //criando a conexão com o banco de dados
        host : "localhost", //chaves obrigatórias para a lib se conectar ao banco
        user : "root",
        password : "1234",
        database : "portal_noticias"
    });
    conexaoBanco.query('select * from noticias', function(error, result) { //busca no banco de dados o conteúdo selecionado podendo realizar outros comandos Sql
        res.send(result)// exibe mensagem de resposta para o usuário na url
    });
});


appExe.post('/noticias', function(req, res) {//criando rota com método Post para noticias
    var conexaoBanco = mysqlImporte.createConnection({
        host : "localhost",
        user : "root",
        password : "1234",
        database : "portal_noticias"
    });
    conexaoBanco.query(`insert into noticias (titulo, noticia) values ('${req.body.titulo}', '${req.body.noticia}')`, function(error, result) {//template literals concatenando com string externa enviada pelo usuário
        res.send(result)
    });
});

appExe.put('/noticias/:id', function(req, res) {
    var conexaoBanco = mysqlImporte.createConnection({
        host : "localhost",
        user : "root",
        password : "1234",
        database : "portal_noticias"
    });
    conexaoBanco.query(`update noticias set titulo = '${req.body.titulo}', noticia = '${req.body.noticia}' where id_noticia = '${req.params.id}' `, function(error, result) {
        res.send(result)
    });
});

appExe.delete('/noticias/:id', function(req, res) {
    var conexaoBanco = mysqlImporte.createConnection({
        host : "localhost",
        user : "root",
        password : "1234",
        database : "portal_noticias"
    });
    conexaoBanco.query(`delete from noticias where id_noticia =  '${req.params.id}'`, function(error, result) {
        res.send(result)
    });
});

appExe.listen(3000, function() { //método listen que "cria" a porta do servidor
    console.log("A porta é 3000"); //verificando se funcionou corretamente
})




