// Pings the backend every 14 minutes to prevent Render cold starts
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL?.replace("/api", "");

export const startKeepAlive = () => {
  if (!BACKEND_URL) return;

  const ping = async () => {
    try {
      await fetch(`${BACKEND_URL}/health`);
      console.log("[KeepAlive] Backend pinged");
    } catch (err) {
      console.warn("[KeepAlive] Ping failed:", err.message);
    }
  };

  // Ping immediately then every 14 minutes
  ping();
  setInterval(ping, 14 * 60 * 1000);
};