const {createConnection} = require('../connection/connection');

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

    produtoMaisFaturado : async(mes, ano) => {
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT produto.imagem, produto.nome AS NomeDoProduto, SUM(item.subtotal) AS QuantidadeVendida '
                +'FROM pedido '
                +'JOIN item ON pedido.idpedido = item.id_pedido '
                +'JOIN produto ON item.id_produto = produto.idproduto '
                +'WHERE MONTH(pedido.data) = ? AND YEAR(pedido.data) = ? '
                +'GROUP BY item.id_produto '
                +'ORDER BY SUM(item.subtotal) DESC;',
                [mes, ano]
                );
            await connection.end();
            return rows;    
        } catch (error) {
            console.error(error);
        }
    },

    produtosMaisVendidos : async(mes,ano) =>{
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                'SELECT produto.imagem, produto.nome AS NomeDoProduto, SUM(item.qtde) AS QuantidadeVendida '
                +'FROM pedido '
                +'JOIN item ON pedido.idpedido = item.id_pedido '
                +'JOIN produto ON item.id_produto = produto.idproduto '
                +'WHERE MONTH(pedido.data) = ? AND YEAR(pedido.data) = ? '
                +'GROUP BY item.id_produto '
                +'ORDER BY SUM(item.QTDE) DESC;',
                [mes,ano]
            );
            await connection.end();
            return rows;
        } catch (error) {
            console.error(error);
        }
    },

    arrecadacaoPedidosNoMes : async(ano, mes) =>{
        try {
            const connection = await createConnection();
            const [rows, fields] = await connection.query(
                // 'SELECT mes, SUM(total) AS total '
                // +'FROM ('
                // +'SELECT DATE_FORMAT(data, "%c/%Y") AS mes, total '
                // +'FROM pedido '
                // +'WHERE YEAR(data) = ? AND MONTH(data) = ? '
                // +') AS subquery '
                // +'GROUP BY mes;',

                'SELECT date_format(data,"%c/%Y") AS mes, SUM(total) AS total, COUNT(*) as quantidade '
                + 'FROM pedido '
                + 'WHERE year(data) = ? and month(data) = ? '
                + 'GROUP BY mes;',


                [ano, mes]
            );
            await connection.end();
            return rows;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = relatorioModel;