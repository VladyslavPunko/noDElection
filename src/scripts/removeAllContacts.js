import { PATH_DB } from "../constants/contacts.js";
import fs from "fs/promises";

export const removeAllContacts = async () => {
  try {
    const emptyArray = [];
    await fs.writeFile(PATH_DB, JSON.stringify(emptyArray));
  } catch (err) {
    console.error("Помилка видалення контактів:", err);
  }
};

await removeAllContacts();
