import Admin from '../users/user.model.js'



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