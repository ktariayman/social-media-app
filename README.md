# Social Media Application Development

##Project Overview

DevBook is an advanced social media application , embodying the features and functionalities akin to Facebook. 
I'm proud of this project because it highlights how I practice great technologies such as React.js, Node.js, Express.js, and MongoDB, coupled with a diverse toolset ensuring an optimal user experience.

## Key Features

## Authentication and User Management
- Developed a robust authentication system for secure user registration, login, and password reset.
- Implemented Formik and Yup for precise form validation, ensuring adherence to specific criteria.
- Automated the generation of unique usernames with validation for uniqueness.
## Email Communication
- Established a mailing system for sending verification links and password reset codes.
- Integrated HTML emails for effective communication and user engagement.
- Enabled immediate account activation through a post-registration verification link.
## Homepage and Post Management
- Created a dynamic homepage displaying posts from followed users and friends, chronologically ordered.
- Implemented a feature-rich post creation system supporting text, emojis, backgrounds, and images.
## Reactions and Comments
- Developed a comprehensive system for real-time user reactions, comments, and post engagement.
- Supported text, emojis, and image comments with live updates.
- Media Handling
- Implemented file upload validation for post images, including size and type checks.
- Leveraged the Cropper library for image manipulation, allowing users to crop, zoom, and select specific areas.
## Profile Customization
- Enabled users to update cover and profile pictures with advanced image manipulation options.
- Leveraged Cloudinary for efficient and creative image upload processes.
## User Profiles Details & stories ( 24h only) 
- Developed individual user profiles displaying cover pictures, profile pictures, and personal details.
- Ensured live updates for any changes made to user details.
## Friendship System
- Created a comprehensive friendship system covering friend requests, acceptances, unfriending, following, and unfollowing.
- display people we may know for suggestions to add friends.
## Search Functionality
- Implemented live search functionality with dynamic results based on user input.
- Maintained a search history for users, organized by the latest interactions.
## Technical Growth
- Incorporated skeleton loaders for seamless page loading and data retrieval.
- Implemented protected routes to enhance security.
- Utilized React Redux store for global state management.
- Integrated React Router DOM v6 for efficient navigation.
- Leveraged cookies and JSON web tokens for temporary data storage.
- Applied various React.js functions, including useState, useEffect, useReducer, useRef, useCallback, and event listeners, alongside creating custom hooks.
This self-initiated project underscores my ability to conceive, design, and implement a complex, feature-rich application independently.
It showcases my technical proficiency and problem-solving and refactoring skills in the realm of modern web development.

## Feature to-do

- feature 1 : realtime chat app (messenger )
- feature 2 :  video call app 
- feature 3 : integrate spotify to listen to music from your spotify account where we will make this app all-in-one application for the user.
- feature 4 : we will integrate your details from your github account & charts
- feature 5 : add admin to the system with their dashboard 
-  enhancement for create stories where we can add texts + music in background if possible 
-  enhancement in posts to add pdf & pdfReader & video
-  feature 6 : add devBook shorts like youtube shorts
-  feature 7 : add groups with posts & members same to friendship system 
-  feature 8 : add pages & the system behing 
-  feature 9 : add RH user that he can recrute & filter users. RH will have special dashboard for dashboard based on users roles & what the RH is looking for. 
- feature 10 : have all infos in one place for the user ( not his profile but like a custom portfolio or CV where he need to make sure to add everything in a form & then generate the portfolio or CV ) , we will use this to help RH search for users later-on
- feature 11 : add youtube clone for the app from youtube videos api where we will have some videos related on the tags that user will enter from the register , also the user can modify the tags only from settings not from youtube clone page.
- feature : notification system 
- for code now : refactor as possible & add unit test & automated test using postman , build a pipeline for the app asap also

# ENDPOINTS

- [API AUTHENTIFICATION](https://www.github.com/ktariayman)

  - - [Register](https://www.github.com/ktariayman)
  - - [login](https://www.github.com/ktariayman)

## Run Locally

Clone the project

```bash
  git clone
```

Install dependencies
   npm or yarn
```bash
  cd server
  npm install
  cd ..
  cd client
  npm install
```

Start the project

```bash
  npm run start
```


## Environment Variables for the client (add /api at the end please ) (example : http://localhost:5000/api) 
  
  REACT_APP_BACKEND_URL= 

## Environment Variables for server 
all envFile that I Used :
PORT= 
MONGODB_URL=
TOKEN_SECRET=
BASE_URL=
EMAIL=
MAILING_ID=
MAILING_SECRET=
MAILING_REFRESH
`MAILING_ACCESS`=
`CLOUD_NAME`=
`CLOUD_KEY`=
`CLOUD_SECRET`=
