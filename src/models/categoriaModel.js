const {createConnection} = require('../connection/connections');

const categoriaModel = {
    listarCategoria: async () => {
        try {
            const connection = await createConnection();
            const [rows] = await connection.query('SELECT idcategoria, nome, status FROM categoria');
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarCategoriaPorId : async(idcategoria)=>{
        try {
            const connection = await createConnection();
            const [rows,fields] = await connection.query(
                'SELECT idcategoria, nome, status FROM categoria WHERE idcategoria = ?;',
                [idcategoria]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarPorNome : async(nome)=>{
        try {
            const connection = await createConnection();
            const [rows,fields] = await connection.query(
                'SELECT idcategoria, nome, status FROM categoria WHERE nome LIKE CONCAT(\'%\', ?, \'%\');',
                [nome]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarCategoriaAtivas : async() =>{
        try {
            const connection = await createConnection();
            const[rows,fields] = await connection.query(
                'SELECT idcategoria, nome, status FROM categoria WHERE status = \'ATIVADO\';'
            );
            await connection.end();
            return rows
        } catch (error) {
            throw error;
        }
    },

    listarCategoriasPorstatus : async(status) =>{
        try {
            const connection = await createConnection();
            const[rows,fields] = await connection.query(
                'SELECT idcategoria, nome, status FROM categoria WHERE status = ?;',
                [status]
            );
            await connection.end();
            return rows
        } catch (error) {
            throw error;
        }
    },

    criarCategoria: async (nome) => {
        try {
            const connection = await createConnection(); 
            const sql = 'INSERT INTO categoria (nome, status) VALUES (?, DEFAULT)';
            const [result] = await connection.query(sql, [nome]);
            await connection.end(); 
            return result.insertId; 
        } catch (error) {
            throw error;
        }
    },


    updateCategoria : async(nome,status,idcategoria) =>{
        try {
            const connection = await createConnection(); 
            const sql = await connection.query(
                'UPDATE categoria SET nome = ?, status = ? WHERE idcategoria = ?;',
                [nome,status,idcategoria]
            );
            await connection.end();
        } catch (error) {
            throw error;
        }
    },

    deleteCategoria : async(idcategoria) =>{
        try {
            const connection = await createConnection(); 
            const sql = await connection.execute(
                'UPDATE categoria '
                + 'SET status = \'DESATIVADO\' '
                +'WHERE idcategoria = ?;',
                [idcategoria]
            );
            await connection.end();
            return sql;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = categoriaModel;