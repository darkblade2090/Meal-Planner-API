const mealModel=require('../database/models/meal');
const foodItems=require('../database/models/calorieChart');

/**
 * @param {*} data-food List and current user data
 * */

var newmealUpdate= function(data) {

    
        //considering each item includes 5 items
        var calorie=data.user.calorieRequirement;
        var numberItems=5;
        var maxCarlorie= calorie/numberItems;

        //For max and min protien
        
            //console.log(calorie);
            var itemList=[];
            var items=data.food;
            //console.log(items[0]);
            for(var i=items.length-1; i>=0; i--)
            {   
               
                var currentCalorie=(items[i].itemWeight)*((items[i].calories)/100);
                //console.log(currentCalorie);

                //Otpimizing protien and calories
                if((currentCalorie>maxCarlorie-100 && currentCalorie<maxCarlorie+100)&&(items[i].protien>0.1*currentCalorie&&items[i].protien<0.3*currentCalorie))
                    {   //console.log(items[i]);
                        itemList.push(items[i].name);
                       
                        numberItems--;
                        calorie-=items[i].calories;
                        if(calorie<=0) continue;
                        maxCarlorie=calorie/numberItems;
            
                    }
            }
            //For fixing max 2-5 items
            while(itemList.length>5)
                itemList.pop();
            var i=0;
            while(itemList.length<2)
                itemList.push(items[i++].name);
      

        var catagory;
        var hour=data.user.updatedAt.getHours();
         
            if( hour<=12 && hour > 0)
                catagory='Breakfast';
            else if(hour<=16 && hour > 12)
            catagory='Lunch';
            else if(hour<=19 && hour > 16)
            catagory= 'Evening Snack';
            else if(hour<=23 && hour > 19)
            catagory='Dinner';
            
        //console.log(itemList);
        var mealData = {
            _id: data.user._id,
            name: data.user.name,
            date: data.user.updatedAt,
            catagory : catagory,
            foodItems : itemList
        }
        
        return mealData;
    
}


var data={
    newmealUpdate : newmealUpdate
}

module.exports = data;