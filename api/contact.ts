/**
 * Vercel Function: POST /api/contact
 * Uses the Web-standard Request/Response signature supported by the Vercel
 * Node.js runtime. CONTACT_WEBHOOK_URL is read here, server-side only.
 */
import { handleContactRequest } from "../server/contact";

export function POST(request: Request) {
  return handleContactRequest(request);
}
