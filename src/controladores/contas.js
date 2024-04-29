let bancodedados = require("../bancodedados")

const listarContas = (req,res) => {
    res.send(bancodedados.contas)
}

const criarConta = (req,res) => {
    const conta = req.body
    let novaConta = {
        numero: bancodedados.identificadorConta++,
        saldo: 0,
        usuario: {...conta}
    }
    bancodedados.contas.push(novaConta)
    return res.status(201).send()
}

const atualizarUsuario = (req,res) => {
    const {numeroConta} = req.params
    const usuarioAtualizado = req.body
    const conta = bancodedados.contas.find((conta) => {return conta.numero === Number(numeroConta)})
    conta.usuario = usuarioAtualizado
    return res.status(200).send()
}

const excluirConta = (req,res) => {
    const {numeroConta} = req.params
    const conta = bancodedados.contas.find((conta) => {return conta.numero === Number(numeroConta)})
    if(conta.saldo != 0){
        return res.status(403).json({mensagem: 'Conta só pode ser excluída se o saldo for zero'})
    }
    bancodedados.contas.splice(bancodedados.contas.indexOf(conta),1)
    return res.status(200).send()
}

const saldo = (req,res) => {
    const {numero_conta} = req.query
    const conta = bancodedados.contas.find((conta) => {return conta.numero === Number(numero_conta)})
    res.json({saldo: conta.saldo}).send()
}

const extrato = (req,res) => {
    const {numero_conta} = req.query
    
    const extrato = {
        depositos: bancodedados.depositos.filter((a) => {return a.numero_conta === numero_conta}),
        saques: bancodedados.saques.filter((a) => {return a.numero_conta === numero_conta}),
        transferenciasEnviadas: bancodedados.transferencias.filter((a) => {return a.numero_conta_origem === numero_conta}),
        transferenciasRecebidas: bancodedados.transferencias.filter((a) => {return a.numero_conta_destino === numero_conta})
    }
    
    return res.status(200).send(extrato)
}


module.exports = {listarContas,criarConta,atualizarUsuario,excluirConta,saldo,extrato}