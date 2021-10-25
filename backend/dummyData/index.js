const fs = require('fs'); 
const csv = require('csv-parser');


fs.createReadStream(inputFilePath)
.pipe(csv())
.on('data', function(data){
    try {
        console.log("Name is: "+data.item_name);
        console.log("Code is: "+data.item_code);

        //perform the operation
    }
    catch(err) {
        //error handler
    }
})
.on('end',function(){
    //some final operation
    p.exec()
    r.quit()
});  
