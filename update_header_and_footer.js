import { parse } from "node-html-parser";
import fs from "node:fs";
import { win32 as path } from "node:path";

const html_dir = "./html";

const index_content = fs.readFileSync("./index.html", "utf-8");
const index_root = parse(index_content);
const header_content = index_root.querySelector("header").innerHTML;
const footer_content = index_root.querySelector("footer").innerHTML;


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
