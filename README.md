
# Jobify
This is a job seeker MERN app using Express.js, React, MongoDB, and Node.js.<br>
Deployed via Render https://mern-app-jobify.onrender.com.

<img src="https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/48a8552f-fc68-4443-8019-bb41fe250055" alt="Register Page" width="300" height="300">
<img src="https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/c3a7d1e2-970a-464a-bcd2-5e5da7acdcd9" alt="Login Page - Users can also Reset their password and Login with GoogleOauth" width="300" height="300">
<img src="https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/7a03a559-b5a1-4142-a623-979bf66e9851" alt="Job Searching Page" width="300" height="300">
<img src="https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/02ed98ea-7639-4382-aaaa-98d22799f41c" alt="Job Status Page" width="300" height="300">
<img src="https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/e9be95be-2869-4505-b35c-63ebb0cc5a5f" alt="Reset Password Page" width="300" height="300">
<img src="https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/5d235a57-c3b8-493a-87a0-c6566dda42e9" alt="Survey Email Page" width="300" height="300">
<img src="https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/8681c9e6-48a9-4367-a510-60397e8baf67" alt="Add Job Page" width="300" height="300">
<img src="https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/ced1dcd7-1e0d-4163-9b7d-210558a23ff4" alt="Update User Page" width="300" height="300">
<img src="https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/dd5e5e08-d9fa-4a60-8710-b1f979708a9c" alt="Jon Status Bar Chart Page" width="300" height="300">

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Project Background](#project-background)
- [New Features](#new-features)

## Installation

1. Clone the repository: `git clone https://github.com/maryamalsadat-tabatabaei/Jobify.git`
2. Navigate to the project directory: `cd Jobify`
3. Install dependencies: `npm run setup-production`

## Usage

To run the project, use the following command:

<pre><code>npm run dev</code></pre>

## Configuration

To configure the project, create .env file and add the following variables:

- PORT
- GOOGLE_MAP_API_KEY
- MONGO_DB_PASSWORD
- MONGO_DB_USER
- MONGO_DB_COLLECTION
- MONGO_DB_PORT
- JWT_SECRET
- GOOGLE_OAUTH_CLIENT_ID
- GOOGLE_OAUTH_CLIENT_SECRE
- SESSION_COOKIE_KEY
- SENDGRID_API_KEY
- STRIPE_SECRET_KEY
- STRIPE_PUBLISHABLE_KEY
- AWS_ACCESS_KEY
- AWS_SECRET_ACCESS_KEY

To configure the client, open the client folder and .env.development file and modify the following variables:

`const config` = {
  stripeKey: `Your-stripe-key`,
  googleClientID: `Your-google-client-id-key`
};

## API Documentation

`POST /api/v1/auth/register`: Register user by name, email, password, and image.<br>
`POST /api/v1/auth/login`: Login user by email and password.<br>
`PATCh /api/v1/auth/updateUser`: Update user information. Requires a JWT in the request headers.<br>
`GET /api/v1/auth/logout`: Logout the user.<br>
`GET /auth/google`: Use Google-passport-authentication.<br>
`GET /auth/callback`: Use the Google-passport-authentication response and create JWT and redirect the user.<br>
`GET /api/v1/jobs`: Retrieves a list of jobs. Requires a JWT in the request headers.<br>
`POST /api/v1/jobs`: Create a job by company location and name. Requires a JWT in the request headers.<br>
`GET /api/v1/jobs/status`: Show the status of jobs. Requires a JWT in the request headers.<br>
`DELETE /api/v1/jobs/:id`: Delete the job. Requires a JWT in the request headers.<br>
`PATCH /api/v1/jobs/:id`: Update the job. Requires a JWT in the request headers.<br>
`POST /api/v1/user/resetPassword`: Create reset-password-token and reset-password-expiration-token for the existing user and send an email link     to the user email for changing the password.<br>
`GET /api/v1/user/resetPassword/:token`: Check the existing user by its token. <br> 
`POST /api/v1/user/new-password`: Save a new password for the user.<br>
`POST /api/v1/surveys`: Create a new survey email notifier by title, subject, body, and recipients. Requires a JWT in the request headers. Also, require credits above 5$.<br>
`POST /api/v1/surveys/webhooks`: Check the feedback based on the sent survey email.<br>
`POST /api/v1/stripe/charge"`: Charge the credit of the user. Requires a JWT in the request headers.<br>
`POST /api/v1/upload`: Upload the image to the AWS S3 bucket. Requires a JWT in the request headers and the rate limit of 10 pic per 15 min.

## Project Background

This project is based on the work of [John Smilga](https://github.com/john-smilga/mern-course-jobify), and I would like to acknowledge their contributions. I have made modifications and added new features to extend the functionality of the original project and I built upon that foundation to extend the project's functionality and address specific requirements. However, the core concept and initial implementation were inspired by the course and the work of the original author.

## New Features

1. **Reset Password Functionality**: Implemented the ability for users to reset their passwords if they forget or need to update them.

2. **Uploading Image Functionality**: Added the feature that allows users to upload images to enhance their profiles.

3. **Stripe Integration for Credit Charging**: Integrated Stripe payment processing to enable users to charge and manage credit on their accounts.

4. **Google-OAuth Authentication**: Introduced Google-OAuth as an additional authentication option, allowing users to sign in with their Google accounts.

5. **Email Functionality**: Integrated email functionality to send important notifications, updates, and notifications to users.

These additional features enhance the capabilities of the original project and provide added value in terms of functionality, performance, or user experience. They were implemented based on the requirements and insights gained from the course, as well as personal experimentation and problem-solving.

I would like to express my gratitude to the John Smilga course instructors for their teachings and inspiration, which played a significant role in the development of this project. Please note that this project is not affiliated with or endorsed by John Smilga, and any issues or inquiries regarding this modified version should be directed to my GitHub repository.
