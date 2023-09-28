const express = require('express');
const pedidoModel = require('../models/pedidoModel');
const connection = require('../connection/connections');

const validStatus = ["ABERTO", "CANCELADO", "ENCERRADO"];

exports.adicionaPedido = async(req,res) => {
    const {idMesa} = req.body;

    if (!idMesa) {
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const pedido = await pedidoModel.adicionarPedido(idMesa);
        res.status(201).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarPedido = async(req, res) => {
    try {
        const pedido = await pedidoModel.listarPedido();
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarPedidoPorMesa = async(req, res) => { 
    const{idMesa} = req.body;

    if(!idMesa){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const pedido = await pedidoModel.listarPedidoPorMesa(idMesa);
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarPedidoPorStatus = async(req, res) => {
    const{status} = req.body;

    if(!status){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    if(!validStatus.includes(status)){
        return res.status(400).json({ message: 'Status inválido'});
    }

    try {
        const pedido = await pedidoModel.listarPedidoPorStatus(status);
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarProdutoPorFaixaDePreco = async(req, res) => {
    const{valorInicial, valorFinal} = req.body;

    if(!valorInicial || !valorFinal) {
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const pedido = await pedidoModel.listarProdutoPorFaixaDePreco(valorInicial, valorFinal);
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarProdutoPorDia = async(req, res) => {
    const{data} = req.body;

    if(!data) {
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const pedido = await pedidoModel.listarProdutoPorDia(data);
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarProdutoPorFaixaDia = async(req, res) => {
    const{dataInicial, dataFinal} = req.body;

    if(!dataInicial || !dataFinal) {
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }
    try {
        const pedido = await pedidoModel.listarProdutoPorFaixaDia(dataInicial, dataFinal);
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarVendasPorDia = async(req, res) => {
    try {
        const pedido = await pedidoModel.listarVendasPorDia();
        res.status(200).json(pedido)
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.atualizaPedidoItemAlterado = async(req, res) => {
    const {numeroPedido1, numeroPedido2} = req.body;

    if(!numeroPedido1 || !numeroPedido2){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }
    
    try {
        const pedido = await pedidoModel.atualizaPedidoItemAlterado(numeroPedido1, numeroPedido2);
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.atualizarPedidoVazio = async(req, res) => {
    const {idpedido} = req.body;

    if(!idpedido){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
            const verificaStatus = await pedidoModel.verificaStatus(idpedido);
        if(verificaStatus === true){
            res.status(200).json({message : 'Este pedido ja esta encerrado'});
        }else{
            const pedido = await pedidoModel.atualizarPedidoVazio(idpedido);
            res.status(200).json(pedido);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.cancelarPedido = async(req, res) => {
    const {status, numeroPedido} = req.body;

    if(!status || !numeroPedido){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    if(!validStatus.includes(status)){
        return res.status(400).json({ message: 'Status inválido'});
    }

    const existePedido = await pedidoModel.listarPedido(numeroPedido);

    try {
        if(!existePedido){
            return res.status(400).json({message : 'Este pedido nao existe'});
        }else{
            const pedido = await pedidoModel.cancelarPedido(status, numeroPedido);
            res.status(200).json(pedido);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.deletarPedido = async(req, res) => {
    const {idPedido} = req.body;
        
    if(!idPedido) {
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    const existePedido = await pedidoModel.listarPedido(idPedido);
    try {
        if(!existePedido) {
            return res.status(400).json({message : 'Este pedido nao existe'});
        }else{
            const pedido = await pedidoModel.deletarPedido(idPedido);
            res.status(200).json({sucess : 'Pedido deletado com sucesso'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};


