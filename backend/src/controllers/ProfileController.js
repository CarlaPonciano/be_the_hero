//perfil - caso específico de uma única ong, pois o controller não pode ter mais que 5 métodos (list, retorno de 1 único item, 
//create, put, delete) - MVC

const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        const ong_id = request.headers.authorization 

        //busca todos os incidents da ong
        const incidents = await connection('incidents').where('ong_id', ong_id).select('*')

        return response.json(incidents)
    }
}