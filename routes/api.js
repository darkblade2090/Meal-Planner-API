const express = require('express');
const router = express.Router();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mealModel=require('../database/models/meal');
const userModel= require('../database/models/user');
const calorieModel= require('../database/models/calorieChart');
const createMeal= require('../mealPlanner/createMeal');
const updateMeal= require('../mealPlanner/updateMeal');


router.post('/meal',function(req,res,next){
    if(!req.body.id)
    {   
        res.status(400).send("Enter meal id");
    }
    else
    {mealModel.find({_id:req.body.id}).then(function(user){
        res.send(user);
    }).catch(next);
}
});

router.post('/food',function(req,res,next){
    if(!req.body.name)
    {   
        res.status(400).send("Enter All details");
    }
    else{
    calorieModel.create(req.body)
      .then(function(food){
        res.status(201);
        res.send("Data saved");
    }).catch(next);
}
});

router.post('/user', function(req,res,next){
    if(!req.body.name)
    {   
        res.status(400).send("Enter All details");
    }
    else{
        //console.log(req.body)
     userModel.create(req.body)      
    .then(function(user){
       
    //Creating user meal    
    var itemList=[];
    //JSON.parse(calorieModel.find())
    calorieModel.find()
    .then(function(item){
        
        itemList=item;
    }).then(function(){
        
        var data={
            user:user,
            food:itemList
        }
        
        //res.send(data);
        var meal=createMeal.newMeal(data);
        //console.log(meal);
        mealModel.create(meal).catch(next);
    
        res.status(201).send( meal);
    
    })
    
    
    }).catch(next);
}
});

router.patch('/update/:id/:cal',function(req,res,next){
    
    //console.log(req)
    var id=req.params.id;
    var cal=req.params.cal;

    userModel.findOne({_id:id})
    .then(function(user){

        //To update userModel updatedAt
        var name=user.name;
        user.name=name;

        //Delete old Model
        mealModel.deleteOne({_id:id}).catch(next);

            //Creating user meal    
            var itemList=[];
            //JSON.parse(calorieModel.find())
            calorieModel.find()
            .then(function(item){
                itemList=item;
            }).then(function(){
                
            //Updating calories
            user.calorieRequirement=cal;

                var data={
                    user:user,
                    food:itemList
                }
        //console.log(itemList);
        //res.send(data);
        var updatedMeal= updateMeal.newmealUpdate(data);
        mealModel.create(updatedMeal).catch(next);
    
        res.status(200).send(updatedMeal);
    
    })
        //create Update Model new one
    })
    .catch(next)

})

//router.patch()


module.exports = router;