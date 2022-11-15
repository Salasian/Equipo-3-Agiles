import { Client } from '../data/models/Client.model.js';
import {
    deleteOne,
    findAll,
    findOne,
    register,
    update
} from '../data/repositories/client.repository.js';

const registerClient = async (req, res, next) => {
    try {
        if (!req.body) {
            const error = new Error('Bad Request');
            error.httpStatusCode = 400;
            next(error);
            return;
        }

        const { userName, name, lastName, address, email, password } = req.body;
        // if (!userName || !name || !lastName || !address || !email || !password) {
        //     const error = new Error('Error');
        //     error.httpStatusCode = 400;
        //     next(error);
        //     return;
        // }

        const newClient = Client.build({
            userName, name, lastName, address, email, password
        });

        const result = await register(newClient);
        res.status(201).send({
            userName: result.userName,
            name: result.name,
            lastName: result.lastName,
            address: result.address,
            email: result.email
        });

    } catch (error) {
        next(error);
    }
}

const findAllClients = async (req, res, next) => {
    try {
        const clients = await findAll();
        if (!clients) {
            const error = new Error('Error');
            error.httpStatusCode = 400;
            next(error);
        }
        res.send(clients);
    } catch (error) {
        next(error)
    }
}

const findOneClient = async (req, res, next) => {
    try {
        // if (!req.body || !req.params) {
        //     const error = new Error('Client not found');
        //     error.httpStatusCode = 400;
        //     next(error);
        // }

        const { idClient } = req.params;
        //no tiene ningún parámetro para buscar
        if (!idClient) {
            const error = new Error('Client not found');
            error.httpStatusCode = 400;
            next(error);
        }

        const client = await findOne({ idClient });

        res.send(client);
    } catch (error) {
        next(error);
    }
}

const deleteOneClient = async (req, res, next) => {
    try {
        // if (!req.params) {
        //     const error = new Error('Bad request');
        //     error.httpStatusCode = 400;
        //     next(error);
        // }

        const { idClient } = req.params;
        // if (!idClient) {
        //     const error = new Error('Client not found');
        //     error.httpStatusCode = 400;
        //     next(error);
        // }

        const client = await findOne({ idClient });
        if (!client) {
            const error = new Error('Client not found');
            error.httpStatusCode = 400;
            next(error);
        }

        const result = await deleteOne({ idClient: client.idClient });
        
        if (result === 0) {
            const error = new Error('Client not deleted');
            error.httpStatusCode = 400;
            next(error);
        }

        res.send({
            msg: "Deleted Client",
            client
        });
    } catch (error) {
        next(error);
    }

}

const updateClient = async (req, res, next) => {
    try {
        // if (!req.body || !req.params) {
        //     return res.send('Error 1');
        // }
        //mesa: mesa que 
        const { idClient } = req.params;
        const data = req.body;
        //fieldStripping
        const client = await findOne({idClient});

        if (!client) {
            const error = new Error('Client not found');
            error.httpStatusCode = 400;
            next(error);
            return;
        }
        console.log(client.dataValues);
        //mesa
        const newClient = { ...client.dataValues, ...data };

        const result = await update(newClient);

        if (result === 0) {
            const error = new Error('Client not found');
            error.httpStatusCode = 400;
            next(error);
        }

        return res.send({
            idClient: newClient.idClient,
            userName: newClient.userName,
            name: newClient.name,
            address: newClient.address,
            email: newClient.email
        });
    } catch (error) {
        next(error);
    }
}

export default {
    registerClient,
    findAllClients,
    findOneClient,
    deleteOneClient,
    updateClient,
};
