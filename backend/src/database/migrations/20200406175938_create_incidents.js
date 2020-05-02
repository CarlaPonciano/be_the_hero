exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        //cria a chave primário auto increment
        table.increments()
        table.string('title').notNullable()
        table.string('description').notNullable()
        table.decimal('value').notNullable()

        //cria o relacionamento com a tabela de ongs
        table.string('ong_id').notNullable()
        table.foreign('ong_id').references('id').inTable('ongs')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents') 
};