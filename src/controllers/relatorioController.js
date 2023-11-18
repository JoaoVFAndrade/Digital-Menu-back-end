const express = require('express');
const relatorioModel = require('../models/relatorioModel');
const connection = require('../connection/connection');


exports.totalPedidos = async(req,res) => {
    try {
        const relatorio = await relatorioModel.totalPedidos();
        res.status(200).json(relatorio);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.produtoMaisFaturado = async(req, res) => {
    const{mes, ano} = req.body;
    try {
        const relatorio = await relatorioModel.produtoMaisFaturado(mes,ano);
        res.status(200).json(relatorio);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.produtoMaisVendido = async(req, res) => {
    const{mes, ano} = req.body;
    try {
        const relatorio = await relatorioModel.produtosMaisVendidos(mes,ano);
        res.status(200).json(relatorio);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

exports.arrecadacaoPedidoNoMes = async(req, res) => {
    const{ano, mes} = req.body;
    try {
        const relatorio = await relatorioModel.arrecadacaoPedidosNoMes(ano,mes);
        res.status(200).json(relatorio);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

