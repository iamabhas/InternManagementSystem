import mongoose from "mongoose";
import { fieldCannotBeEmpty } from "../../utils/schemaUtils/userSchemaMessage";

const batchSchema =new mongoose.Schema({
   name:{
    type:String,
    unique:true,
    required:[true,fieldCannotBeEmpty('name')]
   },startDate:{
    type:Date,
    required:[true, fieldCannotBeEmpty('startDate')],
    default:Date.now()
   },endDate:{
    type:Date,
    required:[true, fieldCannotBeEmpty('endDate')]
   },interns:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
   }],
   mentor:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'mentor'
   }]

}
)


const Batch = mongoose.model('Batch', batchSchema)

export default Batch