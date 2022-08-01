module.exports.init=function()
{
  const mongoose=require('mongoose');
  mongoose.connect('mongodb+srv://Yash:Yash123@cluster0.pyn52.mongodb.net/Calorie_Calculator?retryWrites=true&w=majority').then(function()
  {
    console.log("db is live");
  })
  .catch(function()
  {
    console.log("Error in db connection");
  })
}