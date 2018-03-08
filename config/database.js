module.exports = function(){
  switch(process.env.NODE_ENV){
    case 'local':
      return{
        'url': 'mongodb://localhost:27017/MyMusic',
         options : {
           useMongoClient: true
         }
      }
  }
}

//SET NODE_ENV=local
