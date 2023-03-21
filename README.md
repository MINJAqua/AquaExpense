# AquaExpense


## Introduction

This is a project to help users track their expenses. The project utilizes the Plaid API and securely connects a user's bank accounts to the app and retrieves transactions from their accounts and sends it back to our MongoDb database. This project also helps visualize their spending so that they are able to see their spending in an organized matter.


## Technologies
This project was made using the MERN stack:
* Mongo DB
* Express 
* React
* Node JS
* Plaid API
* Material UI


## To-Do Functionality 
* Currently uses dummy data from the Plaid API, will change in the future for real data from user's bank
* Have more pages and tabs
* Add more styling and less white space

## How to use
* Sign up or login if you have an account already. There is no email verification so any email could work
* After logging in, there are two buttons to create a profile, either through plaid or manually creating an account yourself

### If creating a profile through Plaid
* Click on any institution, any institution you click will always lead you to Platypus bank
* Continue going through the Plaid application, no actual info is needed to proceed through the application
* Upon reaching the "Connect account information", you can click on any amount of accounts to add to your profile
* Then click the box to agree that you accepted the terms and conditions and after that it will lead you back to the dashboard with all the accounts you connected to

### If creating a profile manually
* Just fill out the form, adding a name, a starting balance, and the type of profile

### Upon finishing creating a profile with accounts
* Add a transaction by clicking on the button and filling the form out. After having a single transaction the user should be able to see graphs about their transactions.

## Credit
* Max Zhao
* Stacey Ali
* Junyi Li
