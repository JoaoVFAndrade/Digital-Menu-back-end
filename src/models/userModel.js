const {createConnection} = require('../connection/connections');

const UserModel = {
    autenticar: async (nome,senha) => {
        try{
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT * FROM usuario WHERE USUARIO = ? AND SENHA = ?;',
                [nome,senha]
            );
            await connection.end();
            return rows;
        }catch(err){
            throw err;
        }
    },

    listarTodosUsuarios: async () => {
        try{
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT USUARIO, TIPOACESSO, STATUS FROM usuario;'
            );
            await connection.end();
            return rows;
        }catch(err){
            throw err;
        }
    },

    listarUsuarioAtivos : async() =>{
        try{
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT USUARIO, TIPOACESSO, STATUS FROM usuario WHERE STATUS = \'ATIVADO\';'
            );
            await connection.end();
            return rows;
        }catch(err){
            throw err;
        }
    },

    buscarPorUsuario: async (nome) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT USUARIO, TIPOACESSO, STATUS FROM usuario WHERE USUARIO = ?;',
                [nome]
            );
            await connection.end();
            if (rows.length > 0) {
                return rows[0]; 
            } else {
                return null; 
            }
        } catch (err) {
            throw err;
        }
    },

    listarCategoriaPorNome : async (nome) => {
        try{
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT USUARIO, TIPOACESSO, STATUS FROM usuario WHERE usuario LIKE CONCAT(\'%\',?,\'%\');',
                [nome]
            );
            await connection.end();
            if(rows.length > 0) {
            return rows;
            } else {
                return null;
            }    
        }catch(err){
            throw err;
        }
    },

    verificaExistencia: async (nome) => {
        try{
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT * FROM usuario WHERE USUARIO =?;',
                [nome]
            );
            await connection.end();
            return rows.length > 0;
        }catch(err){
            throw err;
        }
    },

    registrar: async (nome,senha,tipoAcesso) => {
        try{
            const connection = await createConnection();
            const sql = 'INSERT INTO usuario (USUARIO,SENHA,TIPOACESSO) VALUES(?,?,?);';
            await connection.query(sql, [nome,senha,tipoAcesso]);
            await connection.end();
        }catch(err){
            throw err;
        }
    },

    delete: async (nome) => {
        try{
            const connection = await createConnection();
            const sql = 'DELETE FROM usuario WHERE USUARIO = ?;';
            await connection.query(sql, [nome]);
            await connection.end();
            return sql;
        }catch(err){
            throw err;
        }
    },
    
    atualizarSenha : async (nome, senha) => {
        try{
            const connection = await createConnection();
            const sql = 'UPDATE usuario SET senha = ? WHERE USUARIO = ?;'
            await connection.query(sql,[senha,nome]);
            await connection.end();
        }catch(err){
            throw err;
        }
    }
};

module.exports = UserModel;