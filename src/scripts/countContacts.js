import { PATH_DB } from "../constants/contacts.js";
import fs from "fs/promises";

export const countContacts = async () => {
  try {
    const prevContacts = await fs.readFile(PATH_DB);
    const contacts = JSON.parse(prevContacts);
    return contacts.length;
  } catch (err) {
    console.error("Помилка підрахунку контактів:", err);
  }
};

console.log(await countContacts());
