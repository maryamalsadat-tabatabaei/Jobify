
# Jobify
This is a job seeker MERN app using Express.js, React, MongoDB, and Node.js.
Deployed via Render https://mern-app-jobify.onrender.com.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Credits](#credits)
- [Contact](#contact)

## Installation

1. Clone the repository: `git clone https://github.com/maryamalsadat-tabatabaei/Jobify.git`
2. Navigate to the project directory: `cd Jobify`
3. Install dependencies: `npm run setup-production`

## Usage

To run the project, use the following command:

``bash
npm run dev

## Configuration

To configure the project, open the config.js folder and dev.js file and modify the following variables:

  - googleClientID,
  - googleClientSecret,
  - mongoURI,
  - cookieKey,
  - stripePublishableKey,
  - stripeSecretKey,
  - sendGridKey,
  - redirectDomain,

To configure the client, open the client folder and .env.development file and modify the following variables:

const config = {
  stripeKey: `Your-stripe-key`,
  googleClientID: `Your-google-client-id-key`
};

## API Documentation

`POST /api/v1/auth/register`: Register user by name, email, password, and image.
`POST /api/v1/auth/login`: Login user by email and password.
`PATCh /api/v1/auth/updateUser`: Update user information. Requires a JWT in the request headers.
`GET /api/v1/auth/logout`: Logout the user.
`GET /auth/google`: Use Google-passport-authentication.
`GET /auth/callback`: Use the Google-passport-authentication response and create JWT and redirect the user.
`GET /api/v1/jobs`: Retrieves a list of jobs. Requires a JWT in the request headers.
`POST /api/v1/jobs`: Create a job by company location and name. Requires a JWT in the request headers.
`GET /api/v1/jobs/status`: Show the status of jobs. Requires a JWT in the request headers.
`DELETE /api/v1/jobs/:id`: Delete the job. Requires a JWT in the request headers.
`PATCH /api/v1/jobs/:id`: Update the job. Requires a JWT in the request headers.
`POST /api/v1/user/resetPassword`: Create reset-password-token and reset-password-expiration-token for the existing user and send an email link     to the user email for changing the password.
`GET /api/v1/user/resetPassword/:token`: Check the existing user by its token.  
`POST /api/v1/user/new-password`: Save a new password for the user.  
`POST /api/v1/surveys`: Create a new survey email notifier by title, subject, body, and recipients. Requires a JWT in the request headers. Also, require credits above 5$.
`POST /api/v1/surveys/webhooks`: Check the feedback based on the sent survey email.
`POST /api/v1/stripe/charge"`: Charge the credit of the user. Requires a JWT in the request headers.
`POST /api/v1/upload`: Upload the image to the AWS S3 bucket. Requires a JWT in the request headers and the rate limit of 10 pic per 15 min.

## Credits

 Passport: Used for Google authentication
 Stripe: Used for charging the credit 
 SendGrid: Used for email 
 John Smilga: The mern-jobify course

<img src="https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/48a8552f-fc68-4443-8019-bb41fe250055" alt="Register Page" width="200" height="300">


![Login Page - Users can also Reset their password and Login with GoogleOauth](https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/c3a7d1e2-970a-464a-bcd2-5e5da7acdcd9)

![Job Searching Page](https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/7a03a559-b5a1-4142-a623-979bf66e9851)

![Job Status Page](https://github.com/maryamalsadat-tabatabaei/Jobify/assets/87692864/02ed98ea-7639-4382-aaaa-98d22799f41c)



