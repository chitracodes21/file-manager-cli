import fs from "fs/promises";

export async function createFolder(name) {
  try {
    await fs.mkdir(name, { recursive: true });
    console.log(`+ Folder created: ${name}`);
  } catch (error) {
    if (error.code === "EEXIST") {
      console.log(`! Folder already exists: ${name}`);
      return;
    }

    console.log(`x Error creating folder: ${error.message}`);
    throw error;
  }
}

export async function createFile(name, content = "") {
  try {
    await fs.writeFile(name, content, { flag: "wx" });
    console.log(`+ File created: ${name}`);
  } catch (error) {
    if (error.code === "EEXIST") {
      console.log(`! File already exists: ${name}`);
      return;
    }

    console.log(`x Error creating file: ${error.message}`);
    throw error;
  }
}

export async function deleteFolder(name) {
  try {
    await fs.rm(name, { recursive: true });
    console.log(`+ Folder deleted: ${name}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`! Folder not found: ${name}`);
      return;
    }

    console.log(`x Error deleting folder: ${error.message}`);
    throw error;
  }
}

export async function deleteFile(name) {
  try {
    await fs.unlink(name);
    console.log(`+ File deleted: ${name}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`! File not found: ${name}`);
      return;
    }

    console.log(`x Error deleting file: ${error.message}`);
    throw error;
  }
}

export async function renameFolder(oldName, newName) {
  try {
    await fs.rename(oldName, newName);
    console.log(`+ Folder renamed: ${oldName} -> ${newName}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`! Folder not found: ${oldName}`);
      return;
    }

    if (error.code === "EEXIST") {
      console.log(`! Target already exists: ${newName}`);
      return;
    }

    console.log(`x Error renaming folder: ${error.message}`);
    throw error;
  }
}

export async function renameFile(oldName, newName) {
  try {
    await fs.rename(oldName, newName);
    console.log(`+ File renamed: ${oldName} -> ${newName}`);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`! File not found: ${oldName}`);
      return;
    }

    if (error.code === "EEXIST") {
      console.log(`! Target file already exists: ${newName}`);
      return;
    }

    console.log(`x Error renaming file: ${error.message}`);
    throw error;
  }
}

export async function listDir(path = ".") {
  try {
    const items = await fs.readdir(path);

    if (items.length === 0) {
      console.log("! Directory is empty");
      return;
    }

    console.log(`+ Contents of ${path}:`);
    items.forEach((item) => {
      console.log(`- ${item}`);
    });
  } catch (error) {
    console.log(`x Error reading directory: ${error.message}`);
    throw error;
  }
}
