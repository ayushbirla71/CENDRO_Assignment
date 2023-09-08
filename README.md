# Project - CENDRO 

## Make sure to check Backend Repository :  

## Installation and Setup
1. Clone the repository to your local machine.
2. Run npm install to install the dependencies.
3. Run npm start to start the app.


## Technologies Used
1. MongoDB: a NoSQL database used for storing and retrieving data
2. Express.js: a web application framework for Node.js
3. Node.js: a JavaScript runtime environment for running server-side code
4. AWS S3: a Amazon Simple Storage Service for storing user profile photo

## About

# user create 
# end point is : localhost:3000/register

Name : Ayush,
Email : ayush1122@gmail.com,
Mobile :1122334455,
Password :12345@,
Profile Image: file

```
{
    "massage": "Successful",
    "data": {
        "name": "Ayush",
        "email": "ayush1122@gmail.com",
        "mobile": 8120123827,
        "profileImg": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/CENDRO_01/IMG_20220811_111259.jpg",
        "password": "$2b$10$AUmpsGyDPieeTkrtWXSxgu0Ivt3G6/L3v1PDVivr1hxkURPil5kjW",
        "_id": "64fb09a1399c93cd13dce16e",
        "createdAt": "2023-09-08T11:46:41.225Z",
        "updatedAt": "2023-09-08T11:46:41.225Z",
        "__v": 0
    }
}
```

# user login
# end point is : localhost:3000/login

Email : ayush1122@gmail.com,
Password :12345@

```
{
    "status": true,
    "message": "User login successfull",
    "data": {
        "userId": "64fb0909399c93cd13dce166",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGZiMDkwOTM5OWM5M2NkMTNkY2UxNjYiLCJpYXQiOjE2OTQxNzM0NTksImV4cCI6MTY5NDI1OTg1OX0.sS7oTC53NnYjmfkS_clQVXjuvfmwu_SH-R-vrhySyj8"
    }
}
```

# user update 
# end point is : localhost:3000/updateUser/64fb0909399c93cd13dce166

Name : pawan,
Email : pawan1122@gmail.com,
Mobile :1122334455,
Password :112233@22,
Profile Image: file

```
{
    "message": "update Successfuly",
    "data": {
        "_id": "64fb0909399c93cd13dce166",
        "name": "pawan",
        "email": "pawan1122@gmail.com",
        "mobile": 8120123827,
        "profileImg": "https://classroom-training-bucket.s3.ap-south-1.amazonaws.com/CENDRO_01/IMG_20220811_111259.jpg",
        "password": "$2b$10$sjM48sTMvnyUCEN3WIJpK.FiUU.DBbU/oaimfa2bUZRDBFZopCG62",
        "createdAt": "2023-09-08T11:44:10.041Z",
        "updatedAt": "2023-09-08T11:45:48.623Z",
        "__v": 0
    }
}
```


# user delete
# end point is : localhost:3000/deleteUser/64fb0909399c93cd13dce166


```
{
    "message": "Deleted Successfuly"
}
```



## Credits
This project uses several open-source libraries and tools:

1. Node.js
2. Express.js
3. AWS S3
