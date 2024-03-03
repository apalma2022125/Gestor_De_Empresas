import mongoose from 'mongoose';

const CoperexSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "The name is required"],        
    },

    levelOfImpact: {
        type: String,
        required: [true, "The level of impact is reuired"],        
    },

    yearsOfExperience: {
        type: Number,
        required: [true, "Te yeras of experience is requred"],
    },

    category: {
        type: String,
        required: [true, "The category is required"],    
    },

    estado: {
        type: Boolean,
        default: true,
    }
});

CoperexSchema.method.toJSON = function(){
    const {__v, _id, ...coperex} = this.toObject();
    coperex.uid = _id;
    return coperex;
}

export default mongoose.model('Coperex', CoperexSchema);