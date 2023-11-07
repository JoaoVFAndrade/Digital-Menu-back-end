const express = require('express');
const itemModel = require('../models/itemModel');
const connection = require('../connection/connection');

exports.insertItem = async (req, res) => {
    const { numeroPedido, itensDoCarrinho } = req.body;
    if (!numeroPedido || !itensDoCarrinho || !Array.isArray(itensDoCarrinho)) {
      return res.status(400).json({ message: 'Campos obrigatórios não preenchidos corretamente' });
    }
  
    try {
      const insertedItems = await itemModel.adicionaItens(numeroPedido, itensDoCarrinho);
      res.status(201).json(insertedItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno' });
    }
  };
  

exports.listarItemPorPedido = async (req, res) => {
    const { id_pedido } = req.body;

    if(!id_pedido){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const items = await itemModel.listarItemPorPedido(id_pedido);
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarPorId = async (req, res) => {
    const {id_pedido} = req.body;

    if(!id_pedido){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }
    
    try {
        const pedido = await itemModel.listarItensPorId(id_pedido);
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarItemDosPedido = async (req, res) => {
    const {idPedido} = req.params;

    if(!idPedido){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const itens = await itemModel.listarItemDosPedidos(idPedido);
        res.status(200).json(itens);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
}

exports.atualizarItemParaCancelado = async (req, res) => {
    const {iditem} = req.params;

    if(!iditem){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const item = await itemModel.atualizarItemParaCancelado(iditem);
        res.status(204).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.atualizaQuantidade = async(req, res) => {
    const {iditem,qtde} = req.body;

    if(!iditem || !qtde){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const atualizado = await itemModel.atualizaQuantidade(qtde, iditem);
        res.status(204).json({message: 'Atualizado com sucesso! com a quantidade: '+ qtde + ' e no id:' + iditem});
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
}

exports.addItemAdmin = async (req, res) => {
    const item = req.body;
    
    if(!item){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const result = await itemModel.adicionarItemAdm(item);
        res.status(200).json({ message: 'Item adicionado com sucesso!' });
    }catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarItensConfirmadosPorPedido = async (req, res) => {
    const id_pedido = req.body;

    if(!id_pedido){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const result = await itemModel.listarItensConfirmadoPorPedido(id_pedido);
        if(result !== null){
        res.status(200).json(result);
        }else{
        res.status(400).json({message : 'Nenhum dado retornado'});    
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};