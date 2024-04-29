const express = require('express')
const contas = require('./controladores/contas')
const transacoes = require('./controladores/transacoes')
const bancodedados = require('./bancodedados')
const {validarSenhaBanco, validacaoUsuario, validarNumeroConta,validarNumeroConta2, verificarValor, verificarSenhaUsuario, validarQuery} = require('./middlewares/validacoes')

const app = express()

app.use(express.json())

app.get('/contas', validarSenhaBanco, contas.listarContas)
app.post('/contas', validacaoUsuario, contas.criarConta)
app.put('/contas/:numeroConta/usuario', validarNumeroConta, validacaoUsuario, contas.atualizarUsuario)
app.delete('/contas/:numeroConta', validarNumeroConta, contas.excluirConta)

app.get('/contas/saldo', validarQuery, contas.saldo)
app.get('/contas/extrato', validarQuery, contas.extrato)

app.use(verificarValor)
app.post('/transacoes/transferir', transacoes.transferir)
app.use(validarNumeroConta2)
app.post('/transacoes/depositar', transacoes.depositar)
app.use(verificarSenhaUsuario)
app.post('/transacoes/sacar', transacoes.sacar)


app.listen(3000)