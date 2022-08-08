const mongoose=require('mongoose');



const userSchema = new mongoose.Schema({
name: {
  type: String,
  required: true,
},
calorieRequirement: {
  type: Number,
  required: true,
},
mealPlan : 
   {
    date : Date,
    mealReference : String
   
}

},
{timestamps:true}
);


const userModel=mongoose.model('user',userSchema);

module.exports=userModel;