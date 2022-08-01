


/**
 * @param {*} data
 * */

var newMeal= function(data) {

    //considering each item includes 5 items
        var calorie=data.user.calorieRequirement;
        var numberItems=5;
        var maxCarlorie= calorie/numberItems;

        //For max and min protien
        
            //console.log(calorie);
            var itemList=[];
            var items=data.food;
           
            for(var i=0; i<items.length&&numberItems; i++)
            {   
               
                var currentCalorie=items[i].itemWeight*items[i].calories/100;
                //console.log(currentCalorie);

                //Otpimizing protien and calories
                if((currentCalorie>maxCarlorie-100 && currentCalorie<maxCarlorie+100)&&(items[i].protien>0.1*currentCalorie&&items[i].protien<0.3*currentCalorie))
                    {   
                        itemList.push(items[i].name);
                       
                        numberItems--;
                        calorie-=items[i].calories;
                        if(calorie<=0) continue;
                        maxCarlorie=calorie/numberItems;
            
                    }
            }
            //console.log(items)
            while(itemList.length>5)
                itemList.pop();
             var i=0;
            while(itemList.length<2)
                itemList.push(items[i++].name);
      

        var catagory;
        var hour=data.user.createdAt.getHours();
         
            if( hour<=12 && hour > 0)
                catagory='Breakfast';
            else if(hour<=16 && hour > 12)
            catagory='Lunch';
            else if(hour<=19 && hour > 16)
            catagory= 'Evening Snack';
            else if(hour<=23 && hour > 19)
            catagory='Dinner';
            
        
        var mealData = {
            _id: data.user._id,
            name: data.user.name,
            date: data.user.createdAt,
            catagory : catagory,
            foodItems : itemList
        }
        
        return mealData;

    
}

//console.log(newMeal);

var d={
    newMeal : newMeal
}


module.exports = d;