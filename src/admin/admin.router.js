import { Router } from 'express';
import { check } from 'express-validator';

import {existingEmail,existsAdminById} from "../helpers/db-validators.js";
import {adminsGet, getAdminById, adminPut, adminDelete, adminsPost} from "./admin.controller.js";

import { validarCampos } from '../middlewares/validar-campos.js';
import {validarJWT} from '../middlewares/validar-jwt.js';


const router = Router();

router.get("/", adminsGet);

    router.get(
        "/:id",
        [
            check("id","This id is not valid").isMongoId(),
            check("id").custom(existsAdminById),
            validarCampos,            
        ],getAdminById);

        
        
router.put(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsAdminById),
        validarCampos,
    ],adminPut);


router.post(
     "/",
     [
         check("name", "The name cannot be empty").not().isEmpty(),
         check("password", "The password cannot be empty").not().isEmpty(),
         check("password", "The password must have minimmum 6 characters").isLength({min:6}),
         check("email", "The email cannot be empty").not().isEmpty(),           
         check("email", "Enter a valid email address").isEmail(),
         check("email").custom(existingEmail),
          validarCampos,
    ],adminsPost);


router.delete(
    "/:id",
    [
        check("id", "This id is not valid").isMongoId(),
        check("id").custom(existsAdminById),
        validarCampos,
    ],adminDelete);

    export default router;