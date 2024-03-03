import { Router } from 'express';
import { check } from 'express-validator';

import {existingCoperexById} from "../helpers/db-validators.js";

import{coperexGet, coperexPut, coperexPost, getCoperexById} from "./coperex.controller.js"  
import{ validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();


router.get("/",
validarJWT,
coperexGet);


router.get(
    "/",
    [
        validarJWT,
    check("id", "This id is not valid").isMongoId(),
    check("id").custom(existingCoperexById),
    validarCampos,
],getCoperexById);


router.put(
    "/",
    [
        validarJWT,
        check("id", "This id is invalid").isMongoId(),
        check("id").custom(existingCoperexById),
        validarCampos,
    ],coperexPut);

router.post(
    "/",
    [
        validarJWT,
        check("name", "The name cannot be empty").not().isEmpty(),
        check("levelOfImpact", "The level of Impact cannot be empty").not().isEmpty(),
        check("yearsOfExperience", "The years of Trayectory cannot be empty").not().isEmpty(),
        check("category", "The category cannot be empty").not().isEmpty(),
        validarCampos,
    ], coperexPost);



export default router;