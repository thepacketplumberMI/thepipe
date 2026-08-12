const path = require("node:path");
const express = require("express");
const { CosmosClient } = require("@azure/cosmos");

const app = express();
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "public");

app.disable("x-powered-by");
app.use(express.static(publicDirectory));

function cosmosSettings() {
  const required = [
    "COSMOS_ENDPOINT",
    "COSMOS_KEY",
    "COSMOS_DATABASE",
    "COSMOS_CONTAINER",
  ];
  const missing = required.filter((name) => !process.env[name]);
  return { configured: missing.length === 0, missing };
}

app.get("/api/valheim", async (_request, response) => {
  const settings = cosmosSettings();

  if (!settings.configured) {
    return response.json({
      configured: false,
      status: "coming-soon",
      message: "Server details coming soon",
    });
  }

  try {
    const client = new CosmosClient({
      endpoint: process.env.COSMOS_ENDPOINT,
      key: process.env.COSMOS_KEY,
    });
    const container = client
      .database(process.env.COSMOS_DATABASE)
      .container(process.env.COSMOS_CONTAINER);
    const itemId = process.env.COSMOS_VALHEIM_ITEM_ID || "valheim";

    // This query works regardless of the container's partition-key path.
    const query = {
      query: "SELECT TOP 1 * FROM c WHERE c.id = @id",
      parameters: [{ name: "@id", value: itemId }],
    };
    const { resources } = await container.items.query(query).fetchAll();
    const config = resources[0];

    if (!config) {
      return response.status(404).json({
        configured: true,
        status: "coming-soon",
        message: `No Cosmos DB item found with id '${itemId}'`,
      });
    }

    // Only explicitly public fields are returned. Never store or return the
    // private Valheim password through this public endpoint.
    return response.json({
      configured: true,
      status: config.status || "offline",
      serverAddress: config.serverAddress || null,
      serverPort: config.serverPort || null,
      message: config.message || null,
    });
  } catch (error) {
    console.error("Cosmos DB request failed:", error.message);
    return response.status(503).json({
      configured: true,
      status: "unavailable",
      message: "Server details are temporarily unavailable",
    });
  }
});

app.get("/health", (_request, response) => {
  response.json({ ok: true, cosmosConfigured: cosmosSettings().configured });
});

app.get("/valheim", (_request, response) => {
  response.sendFile(path.join(publicDirectory, "valheim.html"));
});

app.listen(port, () => {
  console.log(`The Pipe is listening on port ${port}`);
});
