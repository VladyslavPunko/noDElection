import { PATH_DB } from "../constants/contacts.js";
import fs from "fs/promises";

export const getAllContacts = async () => {
  try {
    const prevContacts = await fs.readFile(PATH_DB);
    const contacts = JSON.parse(prevContacts);
    return contacts;
  } catch (error) {
    console.error("Помилка читання контактів", error);
    return [];
  }
};

console.log(await getAllContacts());
