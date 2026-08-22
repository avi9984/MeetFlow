import { getSetUpAuthUrl } from "../services/google-calender.service.js";
import { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI } from "../config/env.js";

console.log("=== Google Config Debug ===");
console.log(`Client ID:    ${GOOGLE_CLIENT_ID}`);
console.log(`Redirect URI: ${GOOGLE_REDIRECT_URI}`);
console.log("===========================\n");

console.log("Generated Auth URL:");
console.log(getSetUpAuthUrl());

