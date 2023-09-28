const {createConnection} = require('../connection/connections');

const produtoModel = {
    criarProduto: async (nome, preco, descricao, categoria) => {
        try {
            const connection = await createConnection();
            const sql = 'INSERT INTO produto (nome, preco, descricao, id_categoria) '
            +'SELECT ?, ?, ?, c.idcategoria '
            +'FROM categoria c '
            +'WHERE c.nome = ?;'
            const a = await connection.query(sql, [nome, preco, descricao, categoria]);
            await connection.end();
        } catch (error) {
            throw error;
        }
    },

    listarProduto : async() => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query( 
            'SELECT p.idproduto, p.nome, c.nome, p.preco, p.descricao, p.status, p.id_categoria '
            + 'FROM produto p '
            + 'INNER JOIN categoria c '
            + 'ON p.id_categoria = c.idcategoria;'
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

    listarProdutoPorNome : async(nome) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT p.idproduto, p.nome, c.nome, p.preco, p.descricao, p.status, p.id_categoria '
                + 'FROM produto p '
                + 'INNER JOIN categoria c '
                + 'ON p.id_categoria = c.idcategoria '
                + 'WHERE p.nome LIKE CONCAT(\'%\',?,\'%\');',
                [nome]
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

    alterarProdutoPeloNome : async(nomeNovo, preco, descricao, categoria, status, nome) => {
        try {
            const connection = await createConnection();
            const sql = 
            'UPDATE produto SET '
            + 'nome = ?, '
            + 'preco = ?, '
            + 'descricao = ?, '
            + 'id_categoria = (SELECT idcategoria FROM categoria WHERE nome = ?), '
            + 'status = ? '
            + 'WHERE nome = ?';
            await connection.query(sql,[nomeNovo,preco,descricao,categoria,status,nome]);
            await connection.end();
        } catch (error) {
            throw error;
        }
    },

    deletarProduto : async(nome) => {
        try {
            const connection = await createConnection();
            const sql = 
            'UPDATE produto '
            + 'SET status = \'desativado\' '
            + 'WHERE nome = ?;'
            await connection.query(sql,[nome]);
            await connection.end();
        } catch (error) {
            throw error;
        }
    }
};
    

module.exports = produtoModel;