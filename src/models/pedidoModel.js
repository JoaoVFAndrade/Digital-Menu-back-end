const {createConnection} = require('../connection/connections');

const pedidoModel = {
    adicionarPedido : async(idMesa) => {
        try{
            const connection = await createConnection();
        const sql = 
                'INSERT INTO pedido (idpedido, id_mesa, total, data, status) '
                + 'VALUES (DEFAULT, ?, DEFAULT, DEFAULT, DEFAULT);'
                await connection.query(sql, [idMesa]);
                await connection.end();
        }catch(erro){
        throw erro;
        }
    },

    listarPedido : async() => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT idpedido, id_mesa, total, DATE_FORMAT(data, \'%d/%m/%Y\') AS data, '
                + 'DATE_FORMAT(data, \'%H:%i:%s\') AS horario, status '
                + 'FROM pedido;'
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarPedidoPorMesa : async(idMesa) => {
        try {
            const connection = await createConnection();
            const[rows, fields] = await connection.query(
                'SELECT idpedido, id_mesa, total, DATE_FORMAT(data,\'%d/%m/%Y\') AS data, '
                + 'DATE_FORMAT(data,\'%H:%i:%s\') AS horario, status '
                + 'FROM pedido '
                + 'WHERE id_mesa = ?;',
                [idMesa]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarPedidoPorStatus : async(status) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT idpedido, id_mesa, total, DATE_FORMAT(data,\'%d/%m/%Y\') AS data, '
                + 'DATE_FORMAT(data,\'%H:%i:%s\') AS horario, status '
                + 'FROM pedido '
                + 'WHERE status = ?',
                [status]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarProdutoPorFaixaDePreco : async(valorInicial,  valorFinal) => {
        try{
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                    'SELECT idpedido, id_mesa, total, DATE_FORMAT(data, \'%d/%m/%Y\') AS data, '
                    + 'DATE_FORMAT(data,\'%H:%i:%s\') AS horario, status '
                    + 'FROM pedido '
                    + 'WHERE total BETWEEN ? AND ? '
                    + 'ORDER BY total',
                    [valorInicial, valorFinal]
            );
            await connection.end();
            return rows;
        }catch(error){
            throw error;
        }
    },

    listarProdutoPorDia : async(data) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT idpedido, id_mesa, total, DATE_FORMAT(data, \'%d/%m/%Y\') AS data, '
                + 'DATE_FORMAT(data,\'%H:%i:%s\') AS horario, status '
                + 'FROM pedido '
                + 'WHERE DATE_FORMAT(data, \'%d/%m/%Y\') = ?;',
                [data]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarProdutoPorFaixaDia : async(dataInicial, dataFinal) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT idpedido, id_mesa, total, DATE_FORMAT(data, \'%d/%m/%Y\') AS data, '
                + 'DATE_FORMAT(data,\'%H:%i:%s\') AS horario, status '
                + 'FROM pedido '
                + 'WHERE DATE_FORMAT(data, \'%d/%m/%Y\') >= ? AND DATE_FORMAT(data, \'%d/%m/%Y\') <= ?;',
                [dataInicial, dataFinal]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarVendasPorDia : async() => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT sum(total) AS total, DATE_FORMAT(data, \'%d/%m/%Y\') AS Data '
                +'FROM pedido '
                +'GROUP BY DATE_FORMAT(data, \'%d/%m/%Y\');',
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    atualizaPedido : async(idPedidoNovo, status, idPedio) => {
        try {
            const connection = await createConnection();
            const sql = await connection.query(
                'UPDATE pedido p INNER JOIN item i '
                + 'ON p.idpedido = i.id_pedido '
                + 'SET p.total = (SELECT SUM(subtotal) '
                + 'FROM item WHERE id_pedido = ?), p.status = ? '
                + 'WHERE p.idpedido = ? AND i.status = \'confirmado\';',
                [idPedidoNovo, status, idPedio]
            );
            await connection.end();
        } catch (error) {
            throw error;
        }
    },

    atualizaPedidoItemAlterado : async(numeroPedido1, numeroPedido2) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'UPDATE pedido p INNER JOIN item i ON p.idpedido = i.id_pedido '
                + 'SET p.total = IFNULL((SELECT SUM(i.subtotal) '
                + 'FROM item i '
                + 'WHERE i.id_pedido = ? AND i.status = \'confirmado\'), 0.0) '
                + 'WHERE p.idpedido = ?;',
                [numeroPedido1, numeroPedido2]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    verificaStatus : async(idpedido) => {
        try {
            const connection = await createConnection();
            const [rows] = await connection.query(
                'SELECT status FROM pedido WHERE idpedido = ?;',
                [idpedido]
            );
            if (rows.length > 0 && rows[0].status === 'ENCERRADO') {
                return true;
            }else{
                return false;
            }  
            await connection.end();  
        } catch (error) {
            throw error;
        }
    },

    atualizarPedidoVazio : async(idpedido) => {
        try {
            const connection = await createConnection();
            const sql = await connection.query(
                    'UPDATE pedido '
                    +'SET status = \'encerrado\' '
                    +'WHERE idpedido = ?;',
                    [idpedido]
                );
                await connection.end();
        } catch (error) {
            throw error;
        }
    },

    cancelarPedido : async(status, numeroPedido) => {
        try {
            const connection = await createConnection();
            const sql = await connection.query(
                'UPDATE pedido '
                +'SET status = ? '
                +'WHERE idpedido = ?;',
                [status, numeroPedido]
            );
            await connection.end();
        } catch (error) {
            throw error;
        }
    },

    deletarPedido : async(idPedido) => {
        try {
            const connection = await createConnection();
            const sql = await connection.query(
                'DELETE FROM pedido '
                +'WHERE idpedido = ?;',
                [idPedido]
            );
            await connection.end();
        } catch (error) {
            throw error;
        }
    }
};

module.exports = pedidoModel;