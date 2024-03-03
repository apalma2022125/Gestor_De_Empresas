import Admin from '../admin/admin.model.js'
import Coperex from '../coperex/coperex.model.js'



export const existingEmail = async (email = '') => {
    const existeEmail = await Admin.findOne({email});
    if (existeEmail){
        throw new Error(`This email ${email} is already registered`);
    }
}

export const existsAdminById = async (id = '') => {
    const existsAdmin = await Admin.findById(id);
    if (!existsAdmin){
        throw new Error(`The id ${id} not exist`);
    }
}

export const existingCoperexById = async (id = '') => {
    const existCoperex = await Coperex.findById(id);
    if (!existCoperex){
        throw new Error(`This ${id} don't exists in database`);
    }
}