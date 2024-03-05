import { Router } from 'express';
import { check } from 'express-validator';

import {existingCoperexById} from "../helpers/db-validators.js";

import{coperexGet, coperexPut, coperexPost, getCoperexById, coperexGetBYYear, coperexGetBYCategory, coperexGetByAz, coperexGetByZa, coperexGenerateExcel} from "./coperex.controller.js"  
import{ validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();


router.get(
    "/",
validarJWT,
coperexGet);


router.get(
    "/:id",
    [
        validarJWT,
    check("id", "This id is not valid").isMongoId(),
    check("id").custom(existingCoperexById),
    validarCampos,
],getCoperexById);


router.put(
    "/:id",
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


    router.get("/byYears/:years",
    validarJWT,
    coperexGetBYYear
  );

  
  router.get("/byCategory/:cat",
  validarJWT,
  coperexGetBYCategory
);


router.get("/byAZ/az",
validarJWT,
coperexGetByAz
);


router.get("/byZA/za",
validarJWT,
coperexGetByZa
);


router.get("/byExcel/ex",
validarJWT,
coperexGenerateExcel
);


  export default router;