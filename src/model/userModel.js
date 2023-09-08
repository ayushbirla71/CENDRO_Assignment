const mongoose=require('mongoose')

/////////////////////////~User Module Schema~/////////////////////////
const UserSchema = new mongoose.Schema({
   name:{type:String, require:true},
   email:{type:String, require:true},
   mobile:{type:Number},
   profileImg:{type:String},
   password:{type:String}
},{timestamps:true});

//////////////////////////~Exports Module~////////////////////////
module.exports=mongoose.model('User',UserSchema)