const {createConnection} = require('../connection/connections');

const relatorioModel = {
    totalPedidos : async() => {
        try{
            const connection = await createConnection();
            const [rows, fields] = await connection.query( 
                'SELECT COUNT(*) AS Total_Pedidos, SUM(total) AS Total_Vendido, AVG(total) AS Media_Pedido '
                + 'FROM pedido;'
            );
            await connection.end();
            return rows;
        }catch(erro){
        throw erro;
        }
    },

    listarItemQtdeVendidaPorItem: async (idproduto) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT p.idproduto, p.nome, p.preco, SUM(i.qtde) AS qtdeTotal, SUM(i.subtotal) AS valorTotal '
                +'FROM item i '
                +'INNER JOIN produto p ON i.id_produto = p.idproduto '
                +'WHERE p.idproduto = ? '
                +'GROUP BY p.idproduto, p.nome, p.preco;',
                [idproduto] 
            );
            await connection.end();
            return rows;
        } catch (error) {
        throw error;
        }
    },

    listarItensMaisVendidos : async() => {
        try {
            const connection = await createConnection();
            const[rows, fields] = await connection.query(
                'SELECT p.idproduto, p.nome, p.preco, SUM(i.qtde) AS qtdeTotal, SUM(i.subtotal) AS valorTotal '
                + 'FROM item i '
                + 'INNER JOIN produto p '
                + 'ON i.id_produto = p.idproduto '
                + 'GROUP BY p.nome '
                + 'ORDER BY SUM(i.qtde) DESC;'
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    totalPedidosPorMes : async(mes) => {
        try {
            const connection = await createConnection();
            const[rows, fields] = await connection.query(
                'SELECT COUNT(*) AS Total_Pedidos, SUM(total) AS Total_Vendido, AVG(total) AS Media_Pedido '
                + 'FROM pedido '
                + 'WHERE MONTH(data) = ?;',
                [mes]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    listarItensPorPedidoAgrupado : async(id_pedido) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT p.nome, p.preco, SUM(i.qtde) AS qtde, (p.preco*SUM(i.qtde)) AS subtotal '
                + 'FROM item i '
                + 'INNER JOIN produto p '
                + 'ON p.idproduto = i.id_produto '
                + 'WHERE i.id_pedido = ? '
                + 'GROUP BY i.id_produto;',
                [id_pedido]
            );
            if (rows.length === 0){
                return null;
            }
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },

    calcularGorjeta : async() => {
        try {
            const connection = await createConnection();
            const[rows, fields] = await connection.query(
                'SELECT DATE_FORMAT(DATA, \'%m/%Y\') AS MES_ANO,SUM(TOTAL * 0.1) AS GORGETA FROM PEDIDO GROUP BY DATE_FORMAT(DATA, \'%m/%Y\');'
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = relatorioModel;