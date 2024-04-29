let bancodedados = require("../bancodedados")

const validarSenhaBanco = (req,res,next) => {
    const {senha} = req.query
    if(!senha){
        return res.status(400).json({mensagem: 'Senha não informada.'})
    }
    if(senha != 'Cubos123Bank'){
        return res.status(401).json({mensagem: 'Senha inválida.'})
    }
    next()
}

const validacaoUsuario = (req,res,next) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body
    if(!nome){
        return res.status(400).json({mensagem: 'Nome não informado.'})
    }
    if(!cpf){
        return res.status(400).json({mensagem: 'CPF não informado.'})
    }
    if(!data_nascimento){
        return res.status(400).json({mensagem: 'Data de nascimento não informada.'})
    }
    if(!telefone){
        return res.status(400).json({mensagem: 'Telefone não informado.'})
    }
    if(!email){
        return res.status(400).json({mensagem: 'email não informado.'})
    }
    if(!senha){
        return res.status(400).json({mensagem: 'Senha não informada.'})
    }
    
    if(bancodedados.contas.find((conta) => {return conta.usuario.cpf === cpf})){
        return res.status(400).json({mensagem: 'CPF já cadastrado'})
    }
    if(bancodedados.contas.find((conta) => {return conta.usuario.email === email})){
        return res.status(400).json({mensagem: 'email já cadastrado'})
    }
    next()
}

const validarNumeroConta = (req,res,next) => {
    const {numeroConta} = req.params
    const conta = bancodedados.contas.find((conta) => {return conta.numero === Number(numeroConta)})
    if(!conta){
        return res.status(404).json({mensagem: 'Conta não existe'})
    }
    next()
}

const validarQuery = (req,res,next) => {
    const {senha, numero_conta} = req.query
    if(!senha){
        return res.status(400).json({mensagem: 'Senha não informada'})
    }
    if(!numero_conta){
        return res.status(400).json({mensagem: 'Número da conta não informado.'})
    }
    const conta = bancodedados.contas.find((conta) => {return conta.numero === Number(numero_conta)})
    if(!conta){
        return res.status(404).json({mensagem: 'Conta não existe'})
    }
    if (senha != conta.usuario.senha){
        return res.status(401).json({mensagem: 'Senha incorreta'})
    }
  
    next()
}

const validarNumeroConta2 = (req,res,next) => {
    const {numero_conta} = req.body
    if(!numero_conta){
        return res.status(400).json({mensagem: 'Número da conta não informado.'})
    }
    const conta = bancodedados.contas.find((conta) => {return conta.numero === Number(numero_conta)})
    if(!conta){
        return res.status(404).json({mensagem: 'Conta não existe'})
    }
    next()
}

const verificarValor = (req,res,next) => {
    const {valor} = req.body
    if(!valor){
        return res.status(400).json({mensagem: 'Valor não informado'})
    }
    next()
}

const verificarSenhaUsuario = (req,res,next) => {
    const {senha, numero_conta} = req.body
    if(!senha){
        return res.status(400).json({mensagem: 'Senha não informada'})
    }
    const conta = bancodedados.contas.find((conta) => {return conta.numero === Number(numero_conta)})
    if (senha != conta.usuario.senha){
        return res.status(401).json({mensagem: 'Senha incorreta'})
    }
    next()
}

module.exports = {
    validarSenhaBanco,
    validacaoUsuario,
    validarNumeroConta,
    validarNumeroConta2,
    verificarValor,
    verificarSenhaUsuario,
    validarQuery
}