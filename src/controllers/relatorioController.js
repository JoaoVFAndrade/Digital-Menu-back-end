const express = require('express');
const relatorioModel = require('../models/relatorioModel');
const connection = require('../connection/connections');


exports.totalPedidos = async(req,res) => {
    try {
        const relatorio = await relatorioModel.totalPedidos();
        res.status(200).json(relatorio);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.listarQtdeVendidaPorItem = async(req, res) => {
    const {idproduto} = req.body;

    if(!idproduto){
        return res.status(404).json({message : 'O codigo do item precisa ser informado'})
    }

    try {
        const relatorio = await relatorioModel.listarItemQtdeVendidaPorItem(idproduto);
        res.status(200).json(relatorio);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.listarItensMaisVendidos = async(req, res) => {
    try {
        const relatorio = await relatorioModel.listarItensMaisVendidos();
        res.status(200).json(relatorio);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.totalPedidosPorMes = async(req, res) => {
    const {mes} = req.body;

    try {
        const relatorio = await relatorioModel.totalPedidosPorMes(mes)
        res.status(200).json(relatorio)
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.listarItensPorPedidoAgrupado = async(req, res) => {
    const {id_pedido} = req.body;
    
    try {
        const relatorio = await relatorioModel.listarItensPorPedidoAgrupado(id_pedido);
        if (relatorio === null) {
            return res.status(404).json({ message: 'Nenhum item foi encontrado para o pedido especificado.' });
        }
        res.status(200).json(relatorio)
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.calcularGorjeta = async(req, res) => {
    try {
        const resultado = await relatorioModel.calcularGorjeta();
        res.status(200).json(resultado)
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};


