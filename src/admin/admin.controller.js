import {response, request } from"express";
import bcryptjs from 'bcryptjs';
import Admin from './admin.model';


export const adminsGet = async (req = request, res = response)=>{
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, admins]= await Promise.all([
        Admin.countDocuments(query),
        Admin.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        admins
    });
}



export const getAdminById = async (req = request, res = response) =>{
    const {id} = req.params;
    const admin = await Admin.findOne({_id: id});

    res.status(200).json({
        admin
    })
}


export const adminPut = async (req = request, res = response) => {
    const {id} = req.params;
    const {_id, password, google,email,...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await Admin.findByIdAndUpdate(id, resto);
    const admin = await Admin.findOne({_id: id});

    res.status(200).json({
        msg: 'The admin has been update',
        admin
    });
 }


export const adminsPost = async (req, res)=>{

    const {nombre, correo,password}= req.body;
    const admin = new Admin({nombre,correo,password});

    const salt = bcryptjs.genSaltSync(); 
    admin.password = bcryptjs.hashSync(password, salt);    

    await admin.save();

    res.status(200).json({
        admin
    });
}


export const adminDelete = async (req = request, res = response) =>{

    const {id} = re.params;

    const admin = await Admin.findByIdAndUpdate(id, {estado: false});
    const adminAuthenticated = req.admin;

    res.status(200).json({msg:'admin has been removed',admin,adminAuthenticated});

}