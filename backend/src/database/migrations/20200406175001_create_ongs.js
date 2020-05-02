//criação da tabela
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.string('city').notNullable()
        //tamanho do texto - ,2
        table.string('uf', 2).notNullable()
    })
};

//desfaz a criação da tabela
exports.down = function(knex) {
    return knex.schema.dropTable('ongs')
};
