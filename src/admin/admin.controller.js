import {response, request } from"express";
import bcryptks from 'bcryptjs';
import Admin from './admin.model';


export const adminGet = async (req = request, res = response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, admis]= await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        admis
    });
}

export const adminPost = async (req, res)=>{

    const {nombre, correo,password,role}= req.body;
    const admin = new Admin({nombre,correo,password,role});

    const salt = bcryptjs.genSaltSync(); //por default tiene 10 vueltas
    usuario.password = bcryptjs.hashSync(password, salt);    

    await usuario.save();

    res.status(200).json({
        usuario
    });
}