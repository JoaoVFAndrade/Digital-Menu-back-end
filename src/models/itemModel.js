const {createConnection} = require('../connection/connections');

const itemModel = {
    adicionaItem : async( id_pedido, id_produto,qtde, observacao) =>{
        try {
            const connection = await createConnection();
            const sql = 'insert into item values(default, ? , ?, ?, (select preco from produto where idproduto = id_produto) * qtde ,? ,default,default);'
            await connection.query(sql, [id_pedido, id_produto, qtde,observacao]);
            await connection.end();
        } catch (error) {
            throw error;
        }
    },

    listarItemPorPedido: async (id_pedido) => {   
        try {
            const connection = await createConnection();
            const [rows,fields] = await connection.query(
                'select item.iditem,item.id_produto,produto.nome,produto.preco,item.qtde,item.SUBTOTAL,item.HORAPEDIDO,item.status from item join produto on item.id_produto = produto.idproduto where item.ID_PEDIDO = ?;',
            [id_pedido]
            );
            await connection.end();
            return rows;
        } catch (error) {
            throw error;
        }
    },
    listarItensPorId : async (id_pedido) => {
        try {
            const connection = await createConnection();
            const [rows,fields] = await connection.query(
            'SELECT id_pedido, id_produto, qtde, subtotal, horapedido, status FROM item WHERE id_pedido = ?;',
            [id_pedido]
            );
            await connection.end();
            return rows
        } catch (error) {
            throw error; 
        }
    },

    atualizarItem : async (iditem) => {
        try {
            const connection = await createConnection();
            const sql = 'UPDATE item SET status = \'CANCELADO\' WHERE IDITEM =?;';
            await connection.query(sql, [iditem]);
            await connection.end();
        } catch (error) {
        throw error; 
        }
    },

    adicionarItemAdm : async (item) => {
        try {
            const connection = await createConnection();
            const sql = 
            'INSERT INTO item (id_pedido, id_produto, qtde, subtotal) VALUES (?, (SELECT idproduto FROM produto WHERE nome = ?), ?, (SELECT (preco * ?) FROM produto WHERE nome = ?));'
            const values = [item.id_pedido, item.nome_produto, item.qtde, item.preco_produto, item.nome_produto];

            const [rows, fields] = await connection.query(sql, values);
            await connection.end();
            return rows; 
        }catch (error) {
        throw error; 
        } 
    },

    listarItensConfirmadoPorPedido : async (id_pedido) => {
        try {
            const connection = await createConnection();
            const [rows,fields] = await connection.query(
                'SELECT i.iditem, p.idproduto, p.nome, p.preco, i.qtde, i.subtotal, i.horapedido AS horacomanda, i.status '
                + 'FROM item i '
                + 'INNER JOIN produto p '
                + 'ON p.idproduto = i.id_produto '
                + 'WHERE id_pedido = ? '
                + 'AND i.status = \'CONFIRMADO\';',
                [id_pedido]
            );
            await connection.end();
            return rows;
        } catch (error) {
        throw error;    
        }
    }
}

module.exports = itemModel;