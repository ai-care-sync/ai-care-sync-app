Requirements:

- Docker
- Tunnelmole (https://github.com/robbie-cahill/tunnelmole-client)

### Start your TunnelMole (reverse proxy)

Zoom Apps do not support localhost, and must be served over https.  To develop locally, you need to tunnel traffic to this application via https, because the application runs in Docker containers serving traffic from `http://localhost`. You can use Ngrok to do this. Once installed you may run this command from your terminal:

```bash
tmole 3000 as https://ai-sync-care-front.tunnelmole.net
```

tunnelmole will output the origin it has created for your tunnel, eg `https://ai-sync-care-front.tunnelmole.net`.
Please copy the https origin from the Ngrok terminal output and paste it in the `PUBLIC_URL` value in the `.env` file.

### Run Application

- Use the `docker-compose` tool from the root directory to start both the backend and frontend containers:

```
docker-compose up
```
  - Now, you should be getting logs from both the express server/backend and the webpack-dev-server that serves the frontend.

### Install the app

Before proceeding, make sure to:
  - Log in to zoom.us on the web (if not already signed in there)
  - Make sure the user matches the user you've used to log in to the Zoom client 
  - While developing, make sure the user is in the developer account

To install your app and open it the Zoom client's embedded browser, visit:

```
https://ai-sync-care-front.tunnelmole.net/api/zoomapp/install
```

#### Database

Redis:
- Stores session data (cookie-based sessions using the express-session npm library)
- Stores application data (users, access tokens for Zoom API and 3rd Party OAuth provider)

## What do I do next?

Start building your app! You can check out the [Zoom Apps developer docs](https://marketplace.zoom.us/docs/beta-docs/zoom-apps/overview#overview-of-zoom-apps) for more information on the JS SDK. You can also explore the [Zoom REST API](https://devepmp.zoomdev.us/docs/api-reference/introduction) or use the third party OAuth to call a different API.
