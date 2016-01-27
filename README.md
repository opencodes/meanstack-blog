# meanstack-blog
## Set up the MongoDB environment. ##

MongoDB requires a data directory to store all data. MongoDB’s default data directory path is \data\db. You can specify an alternate path for data files using the --dbpath option to mongod.exe, for example:

> C:\mongodb\bin\mongod.exe --dbpath d:\test\mongodb\data

Note: If your path includes spaces, enclose the entire path in double quotes, for example:

> C:\mongodb\bin\mongod.exe --dbpath "d:\test\mongo db data"

Start MongoDB   
> C:\mongodb\bin\mongod.exe

Connect to MongoDB  
> C:\mongodb\bin\mongo.exe
> 
## Create a Windows Service for MongoDB ##

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
    
    net start mongodb
    net stop mongodb
    sc.exe delete mongodb
