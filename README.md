"I Like You" (v.2) -- A friending app  (I like you-Express API)

A full-stack application created using HTMl, CSS, Javascript, jquery AJAX, Express API, Mongoose/MongoDB, and json.

Additional installation requirements: npm install

Links to github repositories:
https://github.com/xanderj22/I-like-you-v.2-Client
https://github.com/xanderj22/I-like-you-v.2-Express-API

Links to deployed sites:
https://thawing-headland-69785.herokuapp.com
https://xanderj22.github.io/I-like-you-v.2-Client

Initial project ERD located here:
https://github.com/xanderj22/I-like-you-v.2-Express-API/public/ERD

Routes that the API expects: 

| Prefix | Verb   | URL Pattern        | Action         |   |
|--------|--------|--------------------|----------------|---|
| User   | POST   | '/sign-up'         | user#signup    |   |
|        | POST   | '/sign-in'         | user#signin    |   |
|        | PATCH  | '/change-password' | user#changepw  |   |
|        | DELETE | '/sign-out'        | user#signout   |   |
|        | PATCH  | '/users'           | user#create    |   |
|        | PATCH  | '/users'           | user#update    |   |
|        | GET    | '/users'           | user#showInfo  |   |
|        | DELETE | '/users'           | user#delete    |   |
| likes  | POST   | '/likes'           | likes#create   |   |
|        | GET    | '/likes'           | likes#showInfo |   |

User stories:

-A user should be able to sign-up/create account with email and password.

-A user should be able to sign-in with that account each time.

-A user should be able to enter and store user profile data.

-A user should be able to update/change current profile data.

-A user should be able to show/display current user profile.

-A user should be able to delete account and user profile data.

-A user should be able to change password.

-A user should be able to sign-out.


Future versions and improvements might include:


  -Better user experience
  
  -
  


My process involved referencing WDI course materials, reviewing online resources such as w3schools.com, reviewing the full-stack project issue queue, collaborating with other developers in training, and getting help from the amazing WDI instructors.

My greatest struggles centered around storing and retrieving data, and figuring out how all of the front-end and back-end files were interacting.
