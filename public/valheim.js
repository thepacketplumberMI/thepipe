async function loadServerDetails() {
  const address = document.querySelector("#server-address");
  const status = document.querySelector("#server-status");
  const dot = document.querySelector("#status-dot");

  try {
    const response = await fetch("/api/valheim");
    const data = await response.json();
    if (data.serverAddress) {
      address.textContent = `${data.serverAddress}${data.serverPort ? `:${data.serverPort}` : ""}`;
    }
    status.textContent = data.message || `Server ${data.status || "status unknown"}`;
    dot.dataset.status = data.status || "unknown";
  } catch (_error) {
    status.textContent = "Server details are temporarily unavailable";
    dot.dataset.status = "unavailable";
  }
}

loadServerDetails();
