let bancodedados = require("../bancodedados")

const depositar = (req,res) => {
    const {numero_conta, valor} = req.body
    const contaEncontrada = bancodedados.contas.find((conta) => {return conta.numero === Number(numero_conta)})

    if(valor<=0){
        return res.status(400).json({mensagem: 'O valor do depósito precisa ser positivo.'})
    }

    contaEncontrada.saldo += valor
    bancodedados.depositos.push({
        data: new Date(),
        numero_conta,
        valor
    })
    return res.status(200).send()
}

const sacar = (req,res) => {
    const {numero_conta, valor} = req.body
    const contaEncontrada = bancodedados.contas.find((conta) => {return conta.numero === Number(numero_conta)})

    if(valor<0){
        return res.status(400).json({mensagem: 'O valor do saque precisa ser positivo.'})
    }
    if(valor>contaEncontrada.saldo){
        return res.status(400).json({mensagem: 'Saldo insuficiente.'})
    }

    contaEncontrada.saldo -= valor
    bancodedados.saques.push({
        data: new Date(),
        numero_conta,
        valor
    })
    return res.status(200).send()
}

const transferir = (req,res) => {
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body

    if(!numero_conta_origem){
        return res.status(400).json({mensagem: 'Conta de origem não informada'})
    }
    if(!numero_conta_destino){
        return res.status(400).json({mensagem: 'Conta de destino não informada'})
    }

    const contaOrigem = bancodedados.contas.find((conta) => {return conta.numero === Number(numero_conta_origem)})
    const contaDestino = bancodedados.contas.find((conta) => {return conta.numero === Number(numero_conta_destino)})
    if(!contaOrigem){
        return res.status(404).json({mensagem: 'Conta de origem não existe'})
    }
    if(!contaDestino){
        return res.status(404).json({mensagem: 'Conta de destino não existe'})
    }

    if(!senha){
        return res.status(400).json({mensagem: 'Senha não informada'})
    }
    if (senha != contaOrigem.usuario.senha){
        return res.status(401).json({mensagem: 'Senha incorreta'})
    }

    if(valor<0){
        return res.status(400).json({mensagem: 'O valor da transferência precisa ser positivo.'})
    }
    if(valor>contaOrigem.saldo){
        return res.status(400).json({mensagem: 'Saldo insuficiente.'})
    }

    contaOrigem.saldo -= valor
    contaDestino.saldo += valor
    bancodedados.transferencias.push({
        data: new Date(),
        numero_conta_origem,
        numero_conta_destino,
        valor
    })
    return res.status(200).send()
}


module.exports = {depositar, sacar, transferir}