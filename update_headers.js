import { parse } from "node-html-parser";
import fs from "node:fs";
import { win32 as path } from "node:path";

const root = parse('<ul id="list"><li>Hello World</li></ul>');
const html_dir = "./html";

const header_content = fs.readFileSync("./header.html", "utf-8");

exchange_header("./index.html", header_content);

fs.readdir(html_dir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    const filepath = path.join(html_dir, file);
    exchange_header(filepath, header_content);
  });
});

function exchange_header(filepath, content) {
  fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const root = parse(data);
    const header = root.querySelector("header");
    header.set_content(content);
    fs.writeFile(filepath, root.toString(), (err) => {
      if (err) {
        console.log("error writing file");
      }
    });
  });
}
