const express = require('express');
const produtoModel = require('../models/produtoModel');
const connection = require('../connection/connection');
const path = require('path')

const validStatus = ['ATIVADO', 'DESATIVADO'];


exports.criarPoduto = async(req,res) => {
    const {nome, preco, descricao, categoria} = req.body;
    const imagemPath = req.file ? req.file.path : 'Nenhum arquivo enviado';
    const imagemNome = imagemPath ? path.basename(imagemPath) : 'Nenhum arquivo enviado'
    console.log(nome, preco, descricao, categoria, imagemNome)
    if(!nome || !preco || !categoria){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const precoFormatatado = preco.replace(',','.');
        const produto = await produtoModel.criarProduto(nome,precoFormatatado,descricao,categoria, imagemNome);
        res.status(201).json({message : 'Produto criado com sucesso'});
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarProduto = async(req, res) => {
    try {
        const produto = await produtoModel.listarProduto();
        res.status(200).json(produto); 
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarProdutosComImagens = async(req, res) => {
    try {
        const produto = await produtoModel.listarProdutosComImagens();
        res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro interno'});
    }
};

exports.listarProdutoAtivo = async(req, res) => {
    try {
        const produtoAtivo = await produtoModel.listarProdutoAtivo();
        res.status(200).json(produtoAtivo);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarProdutoPorId = async(req, res) => {
    const {idproduto} = req.body;

    try {
        const produto = await produtoModel.listarProdutoPorId(idproduto);
        res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Produto nao  encontrado'});
    }
};

exports.listarProdutoPorStatus = async(req, res) => {
    const{status} = req.body;

    if(!status){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    if(!validStatus.includes(status)){
        return res.status(400).json({ message: 'Status inválido'});
    }

    try {
        const produto = await produtoModel.listarPorStatus(status);
        res.status(200).json(produto)
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarProdutoPorFaixaDePreco = async(req, res) => {
    const{valorInicial, valorFinal} = req.body;

    if (!valorInicial || !valorFinal) {
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const produto = await produtoModel.listarProdutoPorFaixaDePreco(valorInicial, valorFinal);
        res.status(200).json(produto);    
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarProdutoPorDescricao = async(req, res) => {
    const{descricao} = req.body;
        
    if(!descricao){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
        }

    try {
        const produto = await produtoModel.listarProdutoPorDescricao(descricao);
        res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarProdutoPorCategoria = async(req, res) => {
    const{categoria} = req.body;
        if(!categoria){
            return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
        }
    try {
        const produto = await produtoModel.listarProdutoPorCategoria(categoria);
        res.status(200).json(produto);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.alterarProduto = async(req, res) => {
    const{nome, preco, descricao, categoria, status, idproduto} = req.body;
        if(!nome || !preco || !categoria || !status || !idproduto) {
            return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
        }

        const existeProduto = await produtoModel.listarProdutoPorId(idproduto);
        const precoFormatado = preco.replace(',','.');

    try {
        if(!existeProduto){
            res.status(404).json({message : 'Produto nao encontratos'});
        }else{
            const produtoAlterado = await produtoModel.alterarProduto(nome, precoFormatado, descricao, categoria, status, idproduto);
        res.status(201).json({success : 'Produto alterado com sucesso!'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.alterarPrecoDoProduto = async(req,res) =>{
    const {nome, preco} = req.body;
    if(!nome){
        return res.status(404).json({message : 'Campo nome obrigatorio'});
    }

    const existeProduto= await produtoModel.listarPorStatus(nome);

    try {
        if(!existeProduto){
            res.status(404).json({message : 'Produto nao encontratos'});
        }else{
        const produtoAtualizado = await produtoModel.alterarPrecoDoProduto(nome,preco);
        res.status(200).json({succes : 'Produto alterado com sucesso'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
}

exports.deletarProduto = async(req, res) => {
    const{idproduto} = req.params;
        if(!idproduto){
            return res.status(400).json({message : 'Campo nome obrigatorio'});
        }

        const existeProduto = await produtoModel.listarProdutoPorId(idproduto);
    try {
        if(!existeProduto){
            return res.status(404).json({message : 'Produto nao encontratos'});
        }else{
        const produtoDeletado = await produtoModel.deletarProduto(idproduto);
        return res.status(200).json({succes : 'Produto desativado com sucesso'});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({message : 'Erro interno'});
    }
};