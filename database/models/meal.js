const mongoose=require('mongoose');

const meal=require('./user');
const food=require('./calorieChart');

const mealSchema = new mongoose.Schema({

  _id: {
    type: String,
    required: true
  },

name: {
  type: String,
  required: true,
},
catagory: {
  type: String,
  enum: ['Breakfast', 'Lunch', 'Evening Snack', 'Dinner']
  
},
protien: {
  type: Number,
  
},
foodItems: {
  type: [],
  }
},

{timestamps:true}
);


const mealModel=mongoose.model('meal',mealSchema);

module.exports=mealModel;