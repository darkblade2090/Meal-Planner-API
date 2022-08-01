const mongoose=require('mongoose');


const userSchema = new mongoose.Schema({
"name": {
  type: String,
  required: true,
},
"calorieRequirement": {
  type: Number,
  required: true,
},
"mealPlan": 
   {
    "date" : {
     type: Date,
      required: true
   },
   "mealReference" : {
    type: [],
    
   }
   
}

},
{timestamps:true}
);


const userModel=mongoose.model('user',userSchema);

module.exports=userModel;