# Emaily

Sends emails to clients and recieve their responds.

_[The Client side code for this project here.](https://github.com/zeyadetman/emaily-client)_

## Technology Stack and Integrations.

1. NodeJS.
2. ExpressJS.
3. MongoDB.
4. passportJS.
5. Stripe.
6. Sendgrid.

## How to run the app?

1. `npm install`
2. Replace `zeyadetmanemaily` in `package.json` by whatever you want.
   _I use it to use the webhook in development._
3. Create a `.env` file from the `.env.example` file
4. `COOKIE_SESSION_KEY` write whatever you want.
5. To set this `GITHUB_CLIENT_SECRET` env you have to create a new application on github
6. The app uses mongodb as a database so you have to create a new one and set this env `MONGODB_URI`
7. The app uses `stripe` as a payment method, so signup to get this env `STRIPE_SECRET_KEY`
8. Run the client side and set the url in this env `CLIENT_SIDE_PATH`.
   _[The Client side code for this project here.](https://github.com/zeyadetman/emaily-client)_
9. The app uses `sendgrid` to send emails, so you have to sign up and set this env `SENDGRID_API_KEY`
10. `npm run dev`
