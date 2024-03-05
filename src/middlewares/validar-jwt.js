import jwt from 'jsonwebtoken'
import Admin from '../admin/admin.model.js'

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No token in the request",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const admin = await Admin.findById(uid);

    if(!admin){
      return res.status(401).json({
        msg: 'Admin does not exist in the database'
      })
    }

    if(!admin.estado){
      return res.status(401).json({
        msg: 'Invalid token - admin with status:false'
      })
    }

    req.admin = admin;

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Invalid Token",
      });
  }
}