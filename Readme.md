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
