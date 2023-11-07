const {createConnection} = require('../connection/connection');

const itemModel = {
    adicionaItens: async (id_pedido, itensDoCarrinho, tentativas = 3) => {
      let insertedItems = [];
  
      const tentarTransacao = async () => {
        try {
          const connection = await createConnection();
          await connection.beginTransaction();
  
          for (const item of itensDoCarrinho) {
            const { id_produto, qtde, observacao } = item;
            const preco = (await connection.query('SELECT preco FROM produto WHERE idproduto = ?', [id_produto]))[0][0].preco;
            const valorTotal = preco * qtde;
  
            await connection.query('INSERT INTO item VALUES (default, ?, ?, ?, ?, ?, default, default);', [id_pedido, id_produto, qtde, valorTotal, observacao]);
  
            insertedItems.push({ id_pedido, id_produto, qtde, valorTotal, observacao });
          }
  
          await connection.commit();
          await connection.end();
  
          return insertedItems;
        } catch (error) {
          if (error.message.includes('Deadlock') && tentativas > 0) {
            // Espera por um curto período (por exemplo, 100ms)
            await new Promise(resolve => setTimeout(resolve, 100));
            return tentarTransacao(tentativas - 1); // Tente a operação novamente com uma tentativa a menos
          } else {
            if (connection) {
              await connection.rollback();
            }
            throw error;
          }
        }
      };
  
      return tentarTransacao();
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

    listarItemDosPedidos : async (idPedido) => {
        try {
            const connection = await createConnection();
            const[rows, fields] = await connection.query(
                'select i.iditem, i.id_pedido, p.nome,i.QTDE,i.subtotal,i.observacao,i.status,i.horapedido ' 
                +'from item i inner join produto p on '
                +'p.IDPRODUTO = i.ID_PRODUTO where id_pedido = ?;',
            [idPedido]
            );
            await connection.end();
            return rows;    
        } catch (error) {
            throw error;
        }
    },

    atualizarItemParaCancelado : async (iditem) => {
        try {
            const connection = await createConnection();
            const sql = 'UPDATE item SET status = \'CANCELADO\' WHERE IDITEM =?;';
            await connection.query(sql, [iditem]);
            await connection.end();
        } catch (error) {
        throw error; 
        }
    },

    atualizaQuantidade : async (qtde, iditem) => {
        try {
            const connection = await createConnection();
            const sql = 'update item set qtde = ? where item.IDITEM = ?;';
            await connection.query(sql, [qtde, iditem]);
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