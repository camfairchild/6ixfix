# team46 - 6ixFix

## heroku app

[https://app-6ixfix.herokuapp.com/](https://app-6ixfix.herokuapp.com/)
## Description

The help page includes a contact form which will send the inputted information to the database where the system admins can view the requests/complaints.

Messaging: The messaging page allows for text-based interactions through a messaging interface between clients and mechanics to further discuss any details of the required service(s). 

Search Bar: The search bar allows users of the website to perform a keyword search to search for specific vehicles, services, certifications, etc. The searches will appear in order they were created. When a user searches for something, they will also be able to filter from a menu provided for mechanics within a certain range, whether a mechanic is certified, etc. 

Profile: The profile page allows users to update their profile picture, bio, and possibly other relevant information such as images of their vehicle. The profile page also allows users to update their vehicle information and service they require or their certificates, skills and rate depending on which type of user they are (client or mechanic). 

Login: We have currently implemented the login to follow the hardcoded login as expected in the Phase 1 handout. user1 refers to a client and user2 refers to a mechanic. To login as an admin, use admin for both username and password.

About: The about page displays some FAQs which will allow users to better understand how the website operates.

Admin: The admin page allows admin users to view all users on the website and their corresponding profiles. The admin user is also able to ban users of their choice from the website. 

They can also click browse to view all the users in the system.

## Third Party Libraries
From npm
"bcrypt": "^5.0.1",
"cloudinary": "^1.27.1",
"cookie-parser": "^1.4.6",
"cors": "^2.8.5",
"cross-env": "^7.0.3",
"dotenv": "^10.0.0",
"env-cmd": "^10.1.0",
"express": "^4.17.1",
"express-fileupload": "^1.2.1",
"express-session": "^1.17.2",
"mongoose": "^6.0.13",
"nodemon": "^2.0.15",
"validator": "^13.7.0"

## Routes
### /routes/api/admin.js
    1. The "router.delete('/profiles/:id')" route in admin.js is used to remove a profile by their id in our app. The route expects to be sent the id of the profile which is to be deleted and the returned JSON is the profile document that was deleted.
    * Postman route: delete: /api/admin/profiles/:id

### /routes/api/auth.js
    1. The "router.post('/login')" route in auth.js is used to help a user login to our app using their username and password. The route expectes to be sent the username and password of the user who wants to login and the route will return a json object that includes the username, id, profile of the user, and a message which says "Authenticated" when the login is successful. If the login is not successful, the route will return a json object with an error message saying "Incorrect userName or password".
    * Postman route: post: /api/auth/login

    2. The "router.post('/signup')" route in auth.js is used to create a new user on our app. The route expectes to be sent the username and password, type of user and email of the user who wants to signup and the route will return a json object that includes the id, profile of the newly created user, and a message which says "Account created" when the signup is successful. If the login is not successful, the route will return a json object with the appropriate error message.
    * Postman route: post: /api/auth/signup

### /routes/api/clients.js
    1. The "router.get('/)" route in clients.js is used to get all client profile information from our app. The route does not expect to recieve any data since it simply retrieves all client profile information. The route will return all client profiles if it is successful.
    * Postman route: get: /api/clients/

    2. The "router.post('/:id')" route in clients.js is used to add a car to a client. The route expects to be sent the the carMake, carModel, and carYear of the car to be added and the returned JSON for this route has the updated client database document that the car was added to, and the car subdocument.
    * Postman route: post: /api/clients/:id

    3. The "router.get('/:id/:car_id')" route in clients.js is used get information for one car of a client in our app. The route does not expect to recieve any ancilliary data. The route will return the make, model, year, mileage, and fuel type of the car for this user.
    * Postman route: get: /api/clients/:id/:car_id

    4. The "router.delete('/:id/:car_id')" route in clients.js is used to delete a car from a client in our app. The route expects to recieve the id of the user and the cid of the car that we want to remove. Returned JSON should have the updated client database
    document from which the car was deleted, and the car subdocument deleted.
    * Postman route: delete: /api/clients/:id/:car_id

    5. The "router.patch('/:id/:car_id')" route in clients.js is used to change the car information for a client in our app. The route expects to recieve the carMake, carModel, and carYear. The returned JSON should have the updated restaurant database document in which the car was changed, and the car subdocument changed.
    * Postman route: patch: /api/clients/:id/:car_id

    6. The "router.patch('/pictures/:id/:pict_id')" route in clients.js is used to change a car picture for a particular client in our app. The route expects to recieve the picture and caption for the image we want to upload. The returned JSON has the updated client database document in which the picture was changed, and the picture subdocument.
    * Postman route: patch: /api/clients/pictures/:id/:car_id

### /routes/api/messages.js
    1. The "router.get('/user/:userName/')" route in messages.js is used to get all messages sent between the logged in user and the user with userName in our app. The route does not expect to receive any ancilliary data. The route will return all messages between the logged in user and the user with userName as mentioned before.
    * Postman route: get: /api/messages/user/:userName/

    2. The "router.get('/')" route in messages.js is used to get all messages for the logged in user. The route does not expect to recieve any ancillary data and the route will return all messages that the logged in user has sent or recieved.
    * Postman route: get: /api/messages/

    3. The "router.post('/)" route in messages.js is used to send a message to a user with is in the url. The route does not expect to recieve any ancillary data and the route will return a JSON object of type Message which inclues the id of who the message was sent by, the id of who the message is to, and the message itself.
    * Postman route: post: /api/messages/

    4. The "router.get('/recent')" route in messages.js is used to get the most recent messages for a logged-in user between each person they message (a contact). The route does not expect to receive any ancilliary data. The route will return the most recent messages containing the logged-in user, formatted as an object with keys being the userName for each contact.
    * Postman route: get: /api/messages/recent/

    5. The "router.get('/:checkTime')" route in messages.js is used to get all messages for the logged in user since checkTime. The route expects to recieve a unix timestamp and the route will return all messages that the logged in user has sent or recieved since that timestamp.
    * Postman route: get: /api/messages/:checkTime

    6. The "router.get('/contacts)" route in messages.js is used to get all the contacts of a logged-in user. The route does not expect to recieve any ancillary data and the route will return an array of Profile objects corresponding to the user's contacts (people he has messaged with).
    * Postman route: post: /api/messages/contacts

### /routes/api/profiles.js
    1. The "router.post('/')" route in profiles.js is used to create a profile in our app. The route expects to receive the fullName, userType, userName, location, picture, email, bio for both types of users. If the user is a client, the route also expects to recieve the carMake, carModel, and carYear. If the user is a mechanic, the route will instead also expect the mechType, certified, and rate fields. The route will return the JSON of the profile document we just created.
    * Postman route: post: /api/profiles

    2. The "router.get('/)" route in profiles.js is used to get all profile information in our app. The route does not expect to recieve any ancilliary information. The route will return the JSON of all the profile documents for all users in our app.
    * Postman route: get: /api/profiles/

    3. The "router.get('/:userName)" route in profiles.js is used to get all profile information for one profile by userName in our app. The route does not expect to recieve any ancilliary information. The route will return the JSON of profile document for the user with userName.
    * Postman route: get: /api/profiles/:userName

    4. The "router.delete('/:id')" route in profiles.js is used to remove a profile by their id in our app. The route does not expect to receive any ancilliary information and the returned JSON is the profile document that was deleted.
    * Postman route: delete: /api/profiles/:id

    5. The "router.put('/)" route in profiles.js is used to get replace the entire profile of the user currently logged in. The route expects to recieve all of the required fields of the profile we want to replace. The route will return the JSON of the profile document that was replaced.
    * Postman route: put: /api/profiles/

    6. The "router.put('/:userName)" route in profiles.js is used to get replace the entire profile of the user with userName. The route expects to recieve all of the required fields of the profile we want to replace. The route will return the JSON of the profile document that was replaced.
    * Postman route: put: /api/profiles/:userName

    7. The "router.patch('/:id')" in profiles.js is used to replace the fields and update their values of the user with id in our app. The route expects to receive the fields of the profile that need to be updated and will return the JSON of the profile document that was updated. 
    * Postman route: patch: /api/profiles/:id

### api.js
    1. The "router.get('/mechanics')" route in api.js is used to get all mechanics profile information in our app. The route does not expect any ancilliary information and returns the JSON of the all the mechanic profile documents in our app.
    * Postman route: get: /api/mechanics

    2. The "router.post('/help')" route in api.js is used to send a help query on our app. The route expects ro recieve the uName, email and message of the help query a user wants to send and returns the JSON of the HelpForm document that was created.
    * Postman route: post: /api/help/

    3. The "router.post('/clientPictures/')" route in api.js is used to add a car picture to the clients pictures in our app. The route expects to receive the picture and caption for the image to upload and the route will return a JSON object with the picture and client fields (the client being the profile of the user uploading this picture). 
    * Postman route: post: /api/clientPictures/

    4. The "router.post('/profilePic/')" route in api.js is used to add a profile picture to a clients profile in our app. The route expects to receive the picture to upload and the route will return a JSON object with the picture and client fields (the client being the profile of the user uploading this picture).
    * Postman route: post: /api/profilePic/

    5. The "router.get('/profile')" route in api.js is used to get the profile information of a user whose profile we are currently viewing. The route does not expect to recieve any ancilliary information and the route will return the JSON of the profile document that is currently being viewed.
    * Postman route: get: /api/profile

    6. The "router.get('/user/:id')" route in api.js is used to get the profile information of a user with the specified id in the url. The route does not expect to recieve any ancilliary information and the route will return the JSON of the profile document that is currently being viewed.
    * Postman route: get: /api/user/:id
    
### pictures.js
    1. The "router.get(/picture/:id')" route in pictures.js is used to get a picture for the client with the specified id in the url. The route does not expect any ancilliary information and the route will return a JSON object which has a url and caption field which have the url and the caption for the picture. 
    * Postman route: get: /pictures/picture/:id

### /routes/api/search.js
    1. The "router.get('/search')" route in api.js is used to get the profiles of users which match the search provided by the user. The router expects to recieve the search query that the user provides. The router will return the JSON of the profile documents of all profiles that match the search.
    * Postman route: get: /api/search/

    2. The "router.get('/search/filterOptions')" route in api.js is used to get the profiles based on the search and filter options a user selects. The route expects to recieve the desired fields that the user wants to filter their search by. The route returns the JSON of the profile documents of all profiles that match the search with the specified filters.
    * Postman route: get: /api/search/filterOptions
