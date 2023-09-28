const express = require('express');
const categoriaModel = require('../models/categoriaModel');
const connection = require('../connection/connections');

const validStatus = ["ATIVADO", "DESATIVADO"];

exports.listarCategoria = async(req, res) => {
    
    try {
        const listarCategoria = await categoriaModel.listarCategoria();
        res.status(200).json(listarCategoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarPorId = async(req,res) => {
    const idcategoria = req.body.idcategoria;

    if(!idcategoria){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const listarId = await categoriaModel.listarCategoriaPorId(idcategoria);
        res.status(200).json(listarId);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarPorNome = async(req,res) => {
    const nome = req.body.nome;

    if(!nome){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    if(nome.length > 30 || senha.length > 30){
        return res.status(400).json({ message: 'Quantidade de caracteres para nome e/ou senha inválidos' });
    }

    try {
        const listarNome = await categoriaModel.listarPorNome(nome);
        res.status(200).json(listarNome);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarCategoriaAtivas = async(req, res) => {
    try {
        const listarCategoriaAtivas = await categoriaModel.listarCategoriaAtivas();
        res.status(200).json(listarCategoriaAtivas);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarCategoriaPorStatus = async(req, res) => {
    const status =  req.body.status;

    if(!status){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    if(!validStatus.includes(status)){
        return res.status(400).json({message : 'Status invalid'});
    }

    try {
        const listarCategoriaPorStatus = await categoriaModel.listarCategoriasPorstatus(status);
        res.status(200).json(listarCategoriaPorStatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.criarCategoria = async(req,res) => {
    const nome = req.body.nome;

    if(!nome){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    if(nome.length > 30){
        return res.status(400).json({ message: 'Quantidade de caracteres para nome e/ou senha inválidos' });
    }

    try {
        const criarCategoria = await categoriaModel.criarCategoria(nome);
        res.status(200).json(criarCategoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.updateCategoria = async(req,res) => {
    const nome = req.body.nome;
    const status = req.body.status;
    const idcategoria = req.body.idcategoria;

    if(!nome || !status || !idcategoria){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    if(nome.length > 30 || senha.length > 30){
        return res.status(400).json({ message: 'Quantidade de caracteres para nome e/ou senha inválidos' });
    }

    if(!validStatus.includes(status)){
        return res.status(400).json({message : 'Status invalid'});
    }

    try {
        const updtadecategoria = await categoriaModel.updateCategoria(nome, status, idcategoria);
        res.status(200).json(updtadecategoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.deleteCategoria = async(req, res) => {
    const idcategoria = req.body.idcategoria;

    if(!idcategoria){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const deleteCategoria = await categoriaModel.deleteCategoria(idcategoria);
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};