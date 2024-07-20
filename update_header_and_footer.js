import { parse } from "node-html-parser";
import fs from "node:fs";
import { win32 as path } from "node:path";

const html_dir = "./sections";

const index_data = fs.readFileSync("./index.html", "utf-8");
const index_root = parse(index_data);
const header_content = index_root.querySelector("header").innerHTML;
const footer_content = index_root.querySelector("footer").innerHTML;

fs.readdir(html_dir, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  files.forEach((file) => {
    const filepath = path.join(html_dir, file);
    duplicate_to_file(filepath, header_content, footer_content);
  });
});

function duplicate_to_file(filepath, source_header, source_footer) {
  const target_data = fs.readFileSync(filepath, "utf-8");
  const target_root = parse(target_data);
  target_root.querySelector("header").set_content(source_header);
  target_root.querySelector("footer").set_content(source_footer);
  fs.writeFile(filepath, target_root.toString(), (err) => {
    if (err) {
      console.log("error writing file");
    }
  });
}

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
