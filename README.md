# The Pipe — Azure App Service + Cosmos DB

This is a plain Node.js/Express application. It does not use Cloudflare D1,
Wrangler, Vite, or ChatGPT Sites build scripts.

## Azure App Service settings

In the Azure portal, open:

**App Service → Settings → Environment variables → App settings**

Add these settings (names must match exactly):

| Name | Value |
| --- | --- |
| `COSMOS_ENDPOINT` | Cosmos DB account **URI**, such as `https://myaccount.documents.azure.com:443/` |
| `COSMOS_KEY` | Cosmos DB **PRIMARY KEY** |
| `COSMOS_DATABASE` | Database name, recommended: `thepipe` |
| `COSMOS_CONTAINER` | Container name, recommended: `server-config` |
| `COSMOS_VALHEIM_ITEM_ID` | `valheim` |

Click **Apply**, then restart the App Service. Do not add `PORT`; Azure supplies
that value automatically. Do not put any of these secrets in GitHub.

Find the endpoint and key at:

**Cosmos DB account → Settings → Keys**

## Cosmos DB record

In the Cosmos DB account, open **Data Explorer**, select the database and
container, choose **Items → New Item**, and save:

```json
{
  "id": "valheim",
  "type": "game-server",
  "serverAddress": "YOUR-SERVER-DNS-NAME-OR-IP",
  "serverPort": 2456,
  "status": "online",
  "message": "Server online — password available from the host"
}
```

If the container requires a partition-key property, add it to the record using
the path chosen when the container was created. For example, if the partition
key is `/type`, the sample already contains the required `type` value.

Never put the Valheim password in this item; the page is publicly reachable.

## Deploy

Upload the *contents* of this folder to the root of the GitHub repository. The
repository root should show `package.json`, `server.js`, and `public/`.

Azure App Service settings:

- Runtime stack: Node
- Node version: 20 LTS or newer
- Startup command: leave blank (`npm start` is provided)

The app listens on Azure's `PORT` automatically. Test these URLs after deploy:

- `/health` — confirms the Node app is running and whether Cosmos settings exist
- `/api/valheim` — shows the public Cosmos-backed Valheim configuration
- `/valheim` — displays the instructions page

## Local test

```powershell
npm install
npm start
```

Then open `http://localhost:3000`. Without Cosmos variables, the website still
runs and displays “Server details coming soon.”
