'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import adminRoutes from '../src/admin/admin.router.js';
import authRoutes from '../src/auth/auth.routes.js';
import copereRoutes from '../src/coperex/coperex.routes.js';

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.adminsPath = '/GestorApi/v1/admins'
        this.authPath = '/GestorApi/v1/auth'
        this.coperexPath = '/GestorApi/v1/coperex'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.adminsPath, adminRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.coperexPath, copereRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;