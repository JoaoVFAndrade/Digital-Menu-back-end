const express = require('express');
const mesaModel = require('../models/mesaModel');
const connection = require('../connection/connections');

const validStatus = ["ATIVADO", "DESATIVADO"]

exports.insertMesa = async(req,res) =>{
    const{idMesa} = req.body;
    if(!idMesa){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    const verificaSeExiste = await mesaModel.listarMesaPorId(idMesa);
    if(verificaSeExiste !== null){
        return res.status(400).json({message : 'Essa mesa ja existe'});
    }

    try{
        const mesa = await mesaModel.criarMesa(idMesa);
        console.log("json "+mesa);
        res.status(201).json(mesa);
    }catch(error){
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarTodasMesas = async(req, res) =>{

    try{
        const mesas = await mesaModel.listarTodasMesas();
        res.json(mesas);
    }catch(error){
        console.error(err);
        res.status(500).json({message : 'Erro interno'});;
    }
};

exports.checkMesas = async(req,res) =>{
    const{idMesa} = req.body;

    try {
        const mesa = await mesaModel.checkMesa(idMesa);
        if (mesa !== null) { 
            if (mesa.length > 0) {
                res.status(200).json({ message: 'Login bem-sucedido' });
            } else {
                res.status(401).json({ error: 'Credenciais inválidas' });
            }
        } else {
            return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
        }
    } catch (error) {
        res.status(500).json({message : 'Erro interno'});
        console.error(error);
    }
};

exports.listarPorStatus = async(req, res) =>{
    const {status} = req.body;
    
    if(!status){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    if(!validStatus.includes(status)){
        return res.status(400).json({message : 'Status invalido'});
    }

    try {
        const mesas = await mesaModel.listarTodasMesasPorStatus(status);
        res.json(mesas);
    } catch (error) {
        console.error(error);
        res.status(500).json({message : 'Erro interno'});
    }
};

exports.listarPorId = async(req, res) =>{
    const {id} = req.body;

    if(!id){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }
    
    try {
        const mesaId = await mesaModel.listarMesaPorId(id);
        if(mesaId !== null){
            res.status(200).json(mesaId);
        }else{
            res.status(400).json({message : 'Mesa não encontrada'})
        }
    } catch (error) {
        res.status(500).json({message : 'Erro interno'});;
    }
};

exports.atualizarMesa = async (req, res) => {
    const { id, idNovo, status } = req.body;

    
    if(!id || !idNovo || !status){ 
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const buscarMesa = await mesaModel.listarMesaPorId(id);

        if (!buscarMesa) {
            return res.status(404).json({ message: 'Mesa não encontrada' });
        }

        const mesa = await mesaModel.atualizarMesa(idNovo, status, id);

        res.status(204).json(mesa);
    } catch (error) {
        res.status(500).json({message : 'Erro interno'});
    }
};


exports.desativarMesa =  async(req, res) =>{
    const{idMesa} = req.params;
    
    if(!idMesa){
        return res.status(400).json({message : 'Campo(s) obrigatorio(s) nao preenchido'});
    }

    try {
        const mesa = await mesaModel.listarMesaPorId(idMesa);
        if(!mesa){
            res.status(404).json({message:'Mesa nao encontrada'}); 
            return
        }
        if(mesa.status === 'DESATIVADO'){
            res.status(400).json({message:'Essa mesa já está desativada'});
        }
        await mesaModel.deletarMesa(idMesa);    
        res.status(200).json('Mesa desativada');
    } catch (error) {
        res.status(500).json({message : 'Erro interno'});
    }
};
