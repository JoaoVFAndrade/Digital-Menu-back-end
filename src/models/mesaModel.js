const {createConnection} = require('../connection/connections');

const mesaModel = {
    criarMesa : async(idMesa) =>{
        try{
            const connection = await createConnection();
            const sql = 'INSERT INTO mesa (idMesa,status) VALUES (?,default)'
            await connection.query(sql,[idMesa]);
            await connection.end();
        }catch(err){
            throw err;    
        }
    },

    listarTodasMesas : async() =>{
        try{
            const connection = await createConnection();
            const [rows,fields] = await connection.query(
                'SELECT idmesa, status FROM mesa;'
            );
            await connection.end();
            return rows;    
        }catch(err){
            throw err; 
        }
    },

    checkMesa : async (idMesa) => {
        try {
            const connection = await createConnection();
            const [rows,fields] = await connection.execute( 
                'SELECT idmesa, status FROM mesa WHERE idmesa = ? AND status = \'ATIVADO\';',
                [idMesa]    
            );
            await connection.end();
            if(rows.length > 0){
            return rows
            }else{ 
                return null;
            }    
        } catch (err) {
            throw err;
        }
    },

    listarTodasMesasPorStatus : async(status) =>{
        try{
            const connection = await createConnection();
            const [rows,fields] = await connection.query(
                'SELECT idmesa, status FROM mesa WHERE status = ?;',
                [status]
            );
            await connection.end();
            if(rows.length > 0){
            return rows;
            }else return 'Status nao encontrado'; 
        }catch(err){
            throw err;
        }
    },
    
    listarMesaPorId : async(id) =>{
        try {
            const connection = await createConnection();
            const [rows,fields] = await connection.query(
                'SELECT idmesa, status FROM mesa WHERE idmesa = ?;',
                [id]
            );
            await connection.end();
            if(rows.length > 0){
                return rows[0];
            }else return null;
        }catch (err) {
            throw err;
        }
    },
    
    atualizarMesa : async(idNovo,status,id) =>{
        try {
            const connection = await createConnection();
            const sql = 'UPDATE mesa SET idmesa = ?, status = ? WHERE idmesa = ?';
            await connection.query(sql,[idNovo,status,id]);
            await connection.end();
        }catch (err) {
            throw err;
        }
    },
    
    deletarMesa: async (idMesa) => {
        try{
            const connection = await createConnection();
            const sql = 'UPDATE mesa SET status = \'DESATIVADO\' WHERE idmesa = ?;';
            await connection.query(sql, [idMesa]);
            await connection.end();
        }catch(err){
            throw err;
        }
    }
}

module.exports = mesaModel;