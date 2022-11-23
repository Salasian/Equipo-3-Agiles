import {Client} from './Client.model.js';
import {Admin} from './Admin.model.js';

export const execcuteSync = async () => {
    await Client.sync();
    await Admin.sync();
}