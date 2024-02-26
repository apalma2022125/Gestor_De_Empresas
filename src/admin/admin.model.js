import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligarorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligaroria"],
  },
  role:{
    type :String,
    default:"ADMIN"
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: true,
  },
});

AdminSchema.methods.toJSON = function(){
  const { __v, password, _id, ...admin} = this.toObject();
  admin.uid = _id;
  return admin;
}

export default mongoose.model('Admin', AdminSchema);