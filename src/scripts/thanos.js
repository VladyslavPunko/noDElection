import { PATH_DB } from "../constants/contacts.js";
import fs from "fs/promises";

export const thanos = async () => {
  try {
    const prevContacts = await fs.readFile(PATH_DB);
    const contacts = JSON.parse(prevContacts);
    const probableContacts = contacts.filter(() => Math.random() >= 0.5);
    await fs.writeFile(PATH_DB, JSON.stringify(probableContacts));
  } catch (err) {
    console.error("Таноса знищив Тор...ууупс", err);
  }
};

await thanos();
