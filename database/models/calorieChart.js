const mongoose=require('mongoose');

const calorieSchema = new mongoose.Schema({
name: {
  type: String,
  required: true,
  unique: true
},
calories: {
  type: Number,
  required: true,
},
protien: {
  type: Number,
  
},
crab: {
  type: Number,
  
},
fat: {
  type : Number,
  
},
acceptedUnits : {
  type: String,
  enum : ['ml', 'liter', 'kg', 'gram', 'piece', 'ounce', 'cup']
  
},
itemWeight: {
  type : Number,
  required: true,
}
},

{timestamps:true}
);



const calorieModel=mongoose.model('calorie',calorieSchema);

module.exports=calorieModel;