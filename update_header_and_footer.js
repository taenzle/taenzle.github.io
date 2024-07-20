import { parse } from "node-html-parser";
import fs from "node:fs";
import { win32 as path } from "node:path";

const html_dir = "./html";

const header_content = fs.readFileSync("./header.html", "utf-8");
const footer_content = fs.readFileSync("./footer.html", "utf-8");

exchange_header_and_footer("./index.html", header_content, footer_content);

fs.readdir(html_dir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    const filepath = path.join(html_dir, file);
    exchange_header_and_footer(filepath, header_content, footer_content);
  });
});

function exchange_header_and_footer(filepath, header_content, footer_content) {
  fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const root = parse(data);
    const header = root.querySelector("header");
    const footer = root.querySelector("footer");
    header.set_content(header_content);
    footer.set_content(footer_content);
    fs.writeFile(filepath, root.toString(), (err) => {
      if (err) {
        console.log("error writing file");
      }
    });
  });
}
