import { request, response } from 'express';
import Coperex from './coperex.model.js';


export const coperexGet = async (req = request, res = response) =>{
    const {limite, desde } = req.query;
    const query = {estado: true};

    const [total, coperexs] = await Promise.all([
        Coperex.countDocuments(query),
        Coperex.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        coperexs
    });
}

export const getCoperexById = async (req, res) =>{
    const {id} = req.params;
    const coperex = await Coperex.findOne({_id: id});

    res.status(200).json({
        coperex
    });
}




export const coperexPut = async (req, res) =>{
    const {id} = req.params;
    const {_id, ...resto} = req.body;

    await Coperex.findByIdAndUpdate(id, resto);

    const coperex = await Coperex.findOne({_id: id});

    res.status(200).json({
        msg: 'Company updated',
        coperex
    });
}




export const coperexPost = async (req, res) => {
    const {name, levelOfImpact, yearsOfExperience, category } = req.body;
    const coperex = new Coperex ({name , levelOfImpact, yearsOfExperience: parseInt(yearsOfExperience), category});

    await coperex.save();

    res.status(200).json({
        coperex
    });

}


export const coperexGetBYYear = async (req, res) => {
    const { years } = req.params; 
    const {limite, desde } = req.query;
    const query = { estado: true, tr: years }; 

    const [total, coperexs] = await Promise.all([
        Coperex.countDocuments(query),
        Coperex.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        coperexs
    });
}
