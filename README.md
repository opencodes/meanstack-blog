# meanstack-blog
## MongoDB ##
### Set up the MongoDB environment. ###

MongoDB requires a data directory to store all data. MongoDB’s default data directory path is \data\db. You can specify an alternate path for data files using the --dbpath option to mongod.exe, for example:

> C:\mongodb\bin\mongod.exe --dbpath d:\test\mongodb\data

Note: If your path includes spaces, enclose the entire path in double quotes, for example:

> C:\mongodb\bin\mongod.exe --dbpath "d:\test\mongo db data"

Start MongoDB   
> C:\mongodb\bin\mongod.exe

Connect to MongoDB  
> C:\mongodb\bin\mongo.exe

### Create a Windows Service for MongoDB ###

You can set up the MongoDB server as a Windows Service that starts automatically at boot time.
Open a command prompt as administrator.
Create directories for your database and log files:

> mkdir c:\data\db
> mkdir c:\data\log

Create a configuration file

The file must set systemLog.path. Include additional configuration options as appropriate.
For example, create a file at "C:\mongodb\mongod.cfg" that specifies both systemLog.path and storage.dbPath:

    systemLog:
    destination: file
    path: c:\data\log\mongod.log
    storage:
    dbPath: c:\data\db

Create the MongoDB service

> sc.exe create MongoDB binPath= "C:\mongodb\bin\mongod.exe --service --config=\"C:\mongodb\mongod.cfg\"" DisplayName= "mongodb" start= "auto"

Note: sc.exe requires a space between “=” and the configuration values (eg “binPath= ”), and a “\” to escape double quotes.

If successfully created, the following log message will display:

> [SC] CreateService SUCCESS

Start the MongoDB service.

> net start MongoDB


To stop the MongoDB service, use the following command:

> net stop MongoDB

To remove the MongoDB service, first stop the service and then run the following command:

>sc.exe delete MongoDB

## Server Programming with Node.js & Express JS ##

### Node.js Installation ###

1. Download Node.js from [https://nodejs.org/en/download/][1]
2. Run the installer, A set of screens will appear to guide you through the installation process.
3. To check open cmd and run
  > node –v  // it will return installed node.js version.

### Express Setup ###
1. Create directory blogapp for application 

 > mkdir meanstack-blog

2. Locate to directory

 > cd meanstack-blog

3. Install express-generator globally

 > npm install express-generator –g

4. Create express application with default template at current location 

 > express . // dot for current directory

5. Install dependencies 

 > npm install

6. Run app 

 > npm start 

7. View application

   Open url [http://localhost:3000/][2] in your browser to access the app. 


  [1]: https://nodejs.org/en/download/
  [2]: http://localhost:3000/


### MongoDB connection ###

1. Install MongoDb driver
 
 > npm install mongodb –save 

2. Update app.js to import mongodb module and initialize MongoClient


    // Mongo Db Connection
    
    > var MongoClient = require('mongodb').MongoClient;
    
    // Connection URL
    
    > var url = 'mongodb://localhost:27017/blog'; 


    // Make our db accessible to our router 
    
    > app.use(function(req, res, next){
    
    // Use connect method to connect to the Server   
    > MongoClient.connect(url, function(err, db) {  		  
    >    if(err){  
    >		console.log(null, err); }  
    >	  else{    
    >	       console.log("Connected to server");    
    >	       req.db = db;   
    >	  }  
    >	next();    
    >	 });  
    >}); 

 
