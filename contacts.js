import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (contactc) =>
  fs.writeFile(contactsPath, JSON.stringify(contactc, null, 2));

async function listContacts() {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await updateContacts(allContacts);
  return result;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return allContacts;
}

export { listContacts, getContactById, removeContact, addContact };
