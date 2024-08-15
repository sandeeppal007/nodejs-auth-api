dotenv.config();
import dotenv from "dotenv"
import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN;
console.log(TOKEN)
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;



export const mailtrapClient = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

export const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
