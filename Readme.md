# Starting the project

# 1. SETUP COMLETED
- MONGODB CONNECTED SUCCESSFULLY
- SERVER STARTED USING APP()
- ENV USED 

# 2 Routes and Controllers
- routes -> app.use me '/' ye use karenge
- controller app.use me jo call back use karenge 

# 3 Send otp verification to the user
- register controller and route 
- sendmail middle ware to send otp using nodemailer
- create app from  google account and generated its password for sending email for otp
- received otp on  my user account
- fetched html for email format


# 4 Verify User and complete register
- we created verify controller and its route
- in controller we are taking otp and activatioToken from req.body 
- then creating the user 
- All test dont till here 
- like sending otp --> verifying otp --> user registered successfully --> checked that user already exist 
- All working fine till here
- it was such good process for generating otp and checking and creating user 


# 5 Created  Login Controller
- created login logic and sent the cookie using res.cookie
- Created isAuth to verify user 
- Then create getProfile for user


# 6 Created admin
- created admin route , controller and schema 
- and in  admin route created createCourse controller
- then created route and used is isAuth, created isAdmin and upload multer and createCourse contoller
- Wrote the logic to upload image in disk storage means local storage in upload folder
- accessed the uploads folder image using localhost --> by app.use("/uploads",express.statis("upload"))
- thats all at the end we created upload course logic 


# 7 Create Lecture
- in this we created lecture schema 
- then we created the create lecture controller 
- then we created route in admin.js to upload lecture by verifying token, admin then upload and then the create lecture controller 