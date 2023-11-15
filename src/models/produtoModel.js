const {createConnection} = require('../connection/connection');
const fs = require('fs');
const util = require('util');
const multer = require('multer');

const produtoModel = {
    criarProduto: async (nome, preco, descricao, categoria, imagem) => {
        try {
            const connection = await createConnection();

            
            const sql = 'INSERT INTO produto (NOME, PRECO, DESCRICAO, ID_CATEGORIA, imagem) ' +
            'SELECT ?, ?, ?, c.idcategoria, ? ' +
            'FROM categoria c ' +
            'WHERE c.nome = ?;';

            const a = await connection.query(sql, [nome, preco, descricao, imagem, categoria]);
            await connection.end();
        } catch (error) {
            throw error;
        }
    },

    listarProduto : async() => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query( 
                'SELECT p.idproduto, p.nome, p.preco, p.descricao, p.status, c.nome as categoria ' 
                +'FROM produto p ' 
                +'INNER JOIN categoria c ' 
                +'ON p.id_categoria = c.idcategoria '
                +'ORDER BY idproduto;'
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarProdutosComImagens : async() => {
        try {
            const connection = await createConnection();
            const [ rows, fields] = await connection.query(
                'SELECT p.idproduto, p.nome, p.preco, p.descricao, p.imagem, p.status, c.nome as categoria ' 
                +'FROM produto p ' 
                +'INNER JOIN categoria c ' 
                +'ON p.id_categoria = c.idcategoria '
                +'Where p.Status = \'ATIVADO\' '
                +'ORDER BY idproduto;'
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarProdutoAtivo : async() => {
        try {
            const connection = await createConnection();
            const [rows,fields] = await connection.query(
                'SELECT p.idproduto, p.nome, c.nome, p.preco, p.descricao, p.status, p.id_categoria '
                + 'FROM produto p '
                + 'INNER JOIN categoria c '
                + 'ON p.id_categoria = c.idcategoria '
                + 'WHERE p.status = \'ativado\';'
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarProdutoPorId : async(idProduto) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT p.idproduto, p.nome, c.nome, p.preco, p.descricao, p.status, p.id_categoria '
                + 'FROM produto p '
                + 'INNER JOIN categoria c '
                + 'ON p.id_categoria = c.idcategoria '
                + 'WHERE p.idproduto = ?;',
                [idProduto]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarPorStatus : async(status) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT p.idproduto, p.nome, c.nome, p.preco, p.descricao, p.status, p.id_categoria '
                + 'FROM produto p '
                + 'INNER JOIN categoria c '
                + 'ON p.id_categoria = c.idcategoria '
                + 'WHERE p.status = ?;',
                [status]
            );
            await connection.end();
            return rows
        } catch (error) {
            throw error;
        }
    },

    listarProdutoPorFaixaDePreco : async(valorInicial, valorFinal) =>{
        try {
            const connection = await createConnection();
            const [rows, field] = await connection.query(
                'SELECT p.idproduto, p.nome, c.nome, p.preco, p.descricao, p.status, p.id_categoria '
                + 'FROM produto p '
                + 'INNER JOIN categoria c '
                + 'ON p.id_categoria = c.idcategoria '
                + 'WHERE p.preco BETWEEN ? AND ? '
                + 'ORDER BY p.preco;',
                [valorInicial,valorFinal]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarProdutoPorDescricao : async(descricao) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
            'SELECT p.idproduto, p.nome, c.nome, p.preco, p.descricao, p.status, p.id_categoria '
            + 'FROM produto p '
            + 'INNER JOIN categoria c '
            + 'ON p.id_categoria = c.idcategoria '
            + 'WHERE p.descricao LIKE CONCAT(\'%\', ?, \'%\');',
                [descricao]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarProdutoPorCategoria : async(categoria) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT p.idproduto, p.nome, c.nome, p.preco, p.descricao, p.status, p.id_categoria '
                + 'FROM produto p '
                + 'INNER JOIN categoria c '
                + 'ON p.id_categoria = c.idcategoria '
                + 'WHERE c. nome = ?;',
                [categoria]
            );
            await connection.end();
            return rows
        } catch (error) {
            throw error;
        }
    },

    alterarProduto : async(nome, preco, descricao, categoria, status, idproduto) => {
        try {
            const connection = await createConnection();
            const sql = 
            'UPDATE produto SET '
            + 'nome = ?, '
            + 'preco = ?, '
            + 'descricao = ?, '
            + 'id_categoria = (SELECT idcategoria FROM categoria WHERE nome = ?), '
            + 'status = ? '
            + 'WHERE idproduto = ?;';
            await connection.query(sql,[nome,preco,descricao,categoria,status,idproduto]);
            await connection.end();
        } catch (error) {
            throw error;
        }
    },

    alterarPrecoDoProduto : async(nome,preco) => {
        try{
            const connection = await createConnection();
            const sql = 
            'UPDATE produto SET '
            +'preco = ? '
            +'WHERE nome = ?;';
            await connection.query(sql,[preco,nome]);
            await connection.end();
        }catch(error){
            throw error;
        }
    },

    deletarProduto : async(idproduto) => {
        try {
            const connection = await createConnection();
            const sql = 
            'UPDATE produto '
            + 'SET status = \'desativado\' '
            + 'WHERE idproduto = ?;'
            await connection.query(sql,[idproduto]);
            await connection.end();
        } catch (error) {
            throw error;
        }
    }
};
    

module.exports = produtoModel;