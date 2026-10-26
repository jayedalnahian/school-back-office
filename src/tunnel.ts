import ngrok from "@ngrok/ngrok";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env
dotenv.config({ path: path.join(process.cwd(), ".env") });

async function startTunnel() {
  const port = Number(process.env.PORT) || 5001;
  const authtoken = process.env.NGROK_AUTHTOKEN?.trim();

  console.log("\n=======================================================");
  console.log("   🚀 Starting ngrok Tunnel for School Management API");
  console.log("=======================================================\n");

  if (!authtoken) {
    console.warn("⚠️  WARNING: NGROK_AUTHTOKEN is not set in your .env file!");
    console.warn("   Ngrok requires an authtoken to create tunnels.");
    console.warn("   Get your free authtoken from: https://dashboard.ngrok.com/get-started/your-authtoken");
    console.warn("   Then add it to your .env: NGROK_AUTHTOKEN=\"your_token_here\"\n");
  }

  try {
    const forwardOptions: Parameters<typeof ngrok.forward>[0] = {
      addr: port,
      authtoken: authtoken || undefined,
      authtoken_from_env: !authtoken,
    };

    const listener = await ngrok.forward(forwardOptions);
    const publicUrl = listener.url();

    console.log("✅ ngrok tunnel established successfully!\n");
    console.log(`🌐 Public Tunnel URL : ${publicUrl}`);
    console.log(`📡 Forwarding to     : http://localhost:${port}`);
    console.log(`🔗 Health Check URL  : ${publicUrl}/`);
    console.log(`🏫 Schools API URL   : ${publicUrl}/api/v1/schools\n`);
    console.log("💡 Tip: You can share this URL with mobile devices, external webhooks,");
    console.log("   or set NEXT_PUBLIC_API_BASE_URL to this URL in your frontend.\n");
    console.log("🛑 Press Ctrl+C anytime to stop the tunnel.\n");

    // Keep alive until process termination (SIGINT / SIGTERM)
    await new Promise<void>((resolve) => {
      // Prevents Node.js event loop from exiting automatically
      const keepAlive = setInterval(() => {}, 1000 * 60 * 60);

      const cleanup = async () => {
        clearInterval(keepAlive);
        console.log("\n🔌 Disconnecting ngrok tunnel...");
        try {
          await listener.close();
          await ngrok.disconnect();
          console.log("👋 ngrok tunnel closed safely.");
        } catch {
          // Silent error on exit
        }
        resolve();
        process.exit(0);
      };

      process.on("SIGINT", cleanup);
      process.on("SIGTERM", cleanup);
    });
  } catch (error: unknown) {
    console.error("\n❌ Failed to start ngrok tunnel:", error);
    console.error("\n👉 If this is an authentication error, please make sure you configured:");
    console.error("   NGROK_AUTHTOKEN in your .env file.\n");
    process.exit(1);
  }
}

startTunnel();
