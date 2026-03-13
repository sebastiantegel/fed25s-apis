import { ExpressAuth } from "@auth/express";
import Google from "@auth/express/providers/google";
import express from "express";

const router = express.Router();

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

// Skapa ett express auth objekt som kan hantera inloggningar.
// I detta fall med hjälp av google
const authMiddleware = ExpressAuth({
  providers: [Google],
  trustHost: true,

  // Hantera callbacks (funktioner som körs efter inloggning)
  callbacks: {
    // Hantera redirects (vart användaren skall skickas efter en inloggning)
    async redirect({ url }) {
      // Se till att vi alltid skickar användaren till frontend (localhost:5173)
      if (url.includes(process.env.AUTH_URL || "localhost:3000")) {
        return frontendUrl;
      }
      if (url.startsWith("/")) {
        return `${frontendUrl}${url}`;
      }
      return frontendUrl;
    },
  },
});

router.use("/auth", authMiddleware);

export { router };
