const express = require('express');
const UserModel = require('../models/userModel');
const connection = require('../connection/connections');
const jwt = require('jsonwebtoken');
const secretKey = 'chave'; 

const validarNome = /^[a-zA-ZÀ-ú]+([ '-][a-zA-ZÀ-ú]+)*$/
const validartipoAcesso = ["administrador","atendente"]

exports.login = async (req, res) => {
    const { nome, senha } = req.body;

    if(!nome|| !senha){
        return res.status(400).json({message : 'Todos os campos devem ser preenchidos'});
    }
  
    try {
      const user = await UserModel.autenticar(nome, senha);
  
      if (user.length > 0) {
        // Se as credenciais estiverem corretas, ira gerar o token
        const token = jwt.sign({ username: nome }, secretKey, { expiresIn: '40m' });
  
        // Envie o token JWT como parte da resposta
        res.status(200).json({ message: 'Login bem-sucedido', token: token });
      } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
      }
    } catch (err) {
      console.error('Erro ao autenticar', err);
      res.status(500).json({ error: 'Erro ao autenticar usuário' });
    }
  };

exports.register = async (req, res) => {
    const {nome, senha, tipoAcesso} = req.body;

    if(!nome || !senha || !tipoAcesso) {
        return res.status(400).json({ message: 'Todos os campos devem ser preenchidos'});
    }

    if(nome.length > 30 || senha.length > 30){
        return res.status(400).json({ message: 'Quantidade de caracteres para nome e/ou senha inválidos' });
    }

    if(!validarNome.test(nome)){
        return res.status(400).json({ message: 'Nome deve conter apensas letras e espaços'});
    }

    if(!validartipoAcesso.includes(tipoAcesso)){
        return res.status(400).json({ message: 'Tipo de acesso inválido'});
    }

    try{
        const existUser = await UserModel.verificaExistencia(nome);

        if(existUser.length > 0){
            res.status(404).json({message : 'Usuario ja existe'});
        }else{
            await UserModel.registrar(nome,senha, tipoAcesso);
            res.status(201).json({message : 'Registro bem-sucedido'});
        }
    }catch(err){
        console.log('Erro ao registrar',err);
        res.status(500).json({message : 'Erro ao registrar user'});
    }    
};

exports.getByName = async(req,res)=>{
    const {nome} = req.body;

    try{
        const usuario = await UserModel.buscarPorUsuario(nome);
        res.json(usuario);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Usuario nao esta cadastrado'});
    }
};

exports.getAllUsersActives = async(req,res)=>{
    
    try{
        const usuarios = await UserModel.listarUsuarioAtivos();
        res.json(usuarios);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Erro ao pesquisar usuarios ativos'});
    }
};

exports.getAll = async(req,res)=>{

    try{
        const usuario = await UserModel.listarTodosUsuarios();
        res.json(usuario);
    }catch(err){
        console.log(err);
        res.status(500).json({message:'Erro ao listar todos os usuarios'});
    }    
};

exports.getCategoriaPorNome = async(req,res)=>{
    const {nome} = req.body;
    try{
        const usuario = await UserModel.listarCategoriaPorNome(nome);
        res.json(usuario);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:'Erro ao buscar usuario'});
    }
};

exports.put = async (req, res) => {
    const { nome } = req.body;
    const { senha } = req.body; 

    if(!nome || !senha){
        return res.status(400).json({message: 'Todos os campos devem ser enviados'});
    }
    
    if(nome.length > 30 || senha.length > 30){
        return res.status(400).json({ message: 'Quantidade de caracteres para nome e/ou senha inválidos' });
    }

    if(!validarNome.test(nome)){
        return res.status(400).json({ message: 'Nome deve conter apensas letras e espaços'});
    }

    
    try {
        const usuario = await UserModel.buscarPorUsuario(nome);
        if (!usuario) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }

        await UserModel.atualizarSenha(nome, senha);
        res.status(200).json({ message: "Senha atualizada com sucesso!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao atualizar senha do usuário" });
    }
};

exports.delete = async(req,res)=>{
    const {nome} = req.body;
    const existUser = await UserModel.verificaExistencia(nome);
    
    try{
        if(!existUser){
            res.status(404).json({message : 'Usuario nao existe'});     
        }else{
            await UserModel.delete(nome);
            res.status(200).json({message : 'Usuário deletado com sucesso!'});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Erro ao deletar usuário'});
    }
};

exports.verificaToken = async(req, res)=>{
    return res.status(200).json({message : true});
};