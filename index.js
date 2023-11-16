import controllers from "./contacts.js";
import yargs from "yargs";

const argv = yargs(process.argv.slice(2)).argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log(await controllers.listContacts());
      break;

    case "get":
      console.log(await controllers.getContactById(id));
      break;

    case "add":
      console.log(await controllers.addContact({ name, email, phone }));
      break;

    case "remove":
      console.log(await controllers.removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
