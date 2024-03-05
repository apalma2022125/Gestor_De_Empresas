import { request, response } from 'express';
import Coperex from './coperex.model.js';
import ExcelJS from 'exceljs';



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
    const query = { estado: true, yearsOfExperience: years }; 

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

export const coperexGetBYCategory = async (req, res) => {
    const { cat } = req.params; 
    const {limite, desde } = req.query;
    const query = { estado: true, category: cat }; 

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

export const coperexGetByAz = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, coperexs] = await Promise.all([
        Coperex.countDocuments(query),
        Coperex.find(query)
            .collation({ locale: 'en', strength: 2 }) 
            .sort({ name: 1 }) 
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        coperexs
    });
};


export const coperexGetByZa = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, coperexs] = await Promise.all([
        Coperex.countDocuments(query),
        Coperex.find(query)
            .collation({ locale: 'en', strength: 2 }) 
            .sort({ name: -1 }) 
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        coperexs
    });
};

export const coperexGenerateExcel = async (req, res) => {
    try {
        const coperexs = await Coperex.find({ estado: true });


        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Coperex Data');


        worksheet.columns = [
            { header: 'Name', key: 'name', width: 15 },
            { header: 'Level of Impact', key: 'levelOfImpact', width: 15 },
            { header: 'Years of Experience', key: 'yearsOfExperience', width: 15 },
            { header: 'Category', key: 'category', width: 15 },
        ];


        coperexs.forEach((coperex) => {
            worksheet.addRow({
                name: coperex.name,
                levelOfImpact: coperex.levelOfImpact,
                yearsOfExperience: coperex.yearsOfExperience,
                category: coperex.category,
            });
        });


        const buffer = await workbook.xlsx.writeBuffer();


        res.setHeader('Content-Disposition', 'attachment; filename=coperex_data.xlsx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        res.status(200).send(buffer);

        console.log('Excel file sent in response');
    } catch (error) {
        console.error('Error generating Excel:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





