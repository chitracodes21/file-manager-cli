import chalk from "chalk";
import { stdin, stdout } from "node:process";
import readline from "node:readline/promises";
import {
  createFile,
  createFolder,
  deleteFile,
  deleteFolder,
  listDir,
  renameFile,
  renameFolder,
} from "./file-operation.js";

const rl = readline.createInterface({ input: stdin, output: stdout });

async function menu() {
  console.clear();

  console.log(chalk.bold.white("\nFILE MANAGER CLI"));
  console.log(chalk.gray("Simple • Clean • Fast\n"));

  console.log(chalk.gray("Status : ") + chalk.green("Online"));
  console.log(chalk.gray("Mode   : ") + chalk.white("File System Manager\n"));

  console.log(chalk.white("Options:\n"));

  const options = [
    "Create Folder",
    "Create File",
    "Delete Folder",
    "Delete File",
    "Rename Folder",
    "Rename File",
    "List Directory",
    "Exit",
  ];

  options.forEach((opt, i) => {
    console.log(chalk.gray(`${i + 1}.`) + " " + chalk.white(opt));
  });

  while (true) {
    const input = await rl.question(chalk.cyan("\nSelect option (1-8): "));

    const opt = Number(input);

    if (Number.isNaN(opt)) {
      console.log(chalk.red("❌ Please enter a valid number (1-8).\n"));
    }

    switch (opt) {
      case 1: {
        const folderName = await rl.question(
          chalk.green("📁 Enter the name for your new folder: "),
        );
        await createFolder(folderName);
        break;
      }
      case 2: {
        const fileName = await rl.question("file name: ");
        const content = (await rl.question("content (optional): ")) || "";
        await createFile(fileName, content);
        break;
      }
      case 3: {
        const folderName = (await rl.question("folder name: ")).trim();
        if (!folderName) {
          console.log("! Folder name cannot be empty");
          break;
        }
        await deleteFolder(folderName);
        break;
      }
      case 4: {
        const fileName = (await rl.question("file name: ")).trim();
        if (!fileName) {
          console.log("! File name cannot be empty");
          break;
        }
        await deleteFile(fileName);
        break;
      }
      case 5: {
        const oldName = (await rl.question("old folder name: ")).trim();
        if (!oldName) {
          console.log("! Old folder name cannot be empty");
          break;
        }
        const newName = (await rl.question("new folder name: ")).trim();
        if (!newName) {
          console.log("! New folder name cannot be empty");
          break;
        }
        await renameFolder(oldName, newName);
        break;
      }
      case 6: {
        const oldName = (await rl.question("old file name: ")).trim();
        if (!oldName) {
          console.log("! Old file name cannot be empty");
          break;
        }
        const newName = (await rl.question("new file name: ")).trim();
        if (!newName) {
          console.log("! New file name cannot be empty");
          break;
        }
        await renameFile(oldName, newName);
        break;
      }
      case 7: {
        const path =
          (await rl.question("directory path (default .): ")).trim() || ".";
        await listDir(path);
        break;
      }
      case 8: {
        console.log(chalk.gray("\n! Exiting File Manager..."));
        console.log(chalk.green("✔ Goodbye\n"));
        rl.close();
        return;
      }
      default:
        console.log("! Please select a valid option (1-8)");
        break;
    }
  }
}

menu();
