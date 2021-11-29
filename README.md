# team46 - 6ixFix

The help page includes a contact form which will send the inputted information (as well as the user info if they are logged in) as an email to the site admins after implementation in the next phase.

Settings; The settings page allows any user to modify their personal information, location, payment information and features of the website itself such as the theme they want to be displayed. Currently, the settings a user changes are not permanently saved as this will require a server call. We instead display mock data for Phase 1. 

Messaging: The messaging page allows for text-based interactions through a messaging interface between clients and mechanics to further discuss any details of the required service(s). Currently, the messaging feature only shows hardcoded data for Phase 1 as we will need to implement server calls to support the full functionality. 

Search Bar: The search bar allows users of the website to perform a keyword search to search for specific vehicles, services, certifications, etc. The searches will appear in order they were created. When a user searches for something, they will also be able to filter from a menu provided for mechanics within a certain range, whether a mechanic is certified, etc. The search bar does not currently support its full implementation and displays hardcoded data for now as it needs to perform a server call to operate fully. 

Profile: The profile page allows users to update their profile picture, bio, and possibly other relevant information such as images of their vehicle. Currently, the profile page is not fully implemented for Phase 1 since we will require server calls to store the changes a user makes in their profile (hardcoded data has been used instead for Phase 1).

Login: We have currently implemented the login to follow the hardcoded login as expected in the Phase 1 handout. user1 refers to a client and user2 refers to a mechanic.

About: The about page displays some FAQs which will allow users to better understand how the website operates.
Profile pt2: The profile page also allows users to update their vehicle information and service they require or their certificates, skills and rate depending on which type of user they are (client or mechanic). Currently, these changes require a server call to be stored and we use hardcoded values in Phase 1.

Admin: The admin page allows admin users to view all users on the website and their corresponding profiles. The admin user is also able to ban users of their choice from the website. Currently, the admin page will require server calls to fully implement this functionality so hardcoded data has been used for Phase 1. They can also click browse to view all the users in the system.

## Third Party Libraries
From npm
"email-validator": "^2.0.4",
"lodash": "^4.17.21",
"bcryptjs": "^2.4.3",
"cookie-parser": "^1.4.6",
"cors": "^2.8.5",
"express": "^4.17.1",
"express-fileupload": "^1.2.1",
"express-session": "^1.17.2",
"mongoose": "^6.0.13",
"validator": "^13.7.0"