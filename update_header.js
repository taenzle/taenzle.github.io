import { parse } from "node-html-parser";
import fs from "node:fs";
import { win32 as path } from "node:path";

const root = parse('<ul id="list"><li>Hello World</li></ul>');
const html_dir = "./html";

fs.readFile("./header.html", "utf-8", (err, header_to_insert) => {
  if (err) {
    console.error(err);
    return;
  }
  fs.readdir(html_dir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((file) => {
      const raw = fs.readFile(
        path.join(html_dir, file),
        "utf-8",
        (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          const root = parse(data)
          const header = root.querySelector("header")
          header.set_content(header_to_insert)
          console.log(root.textContent);
          fs.writeFile("./test.html", root.toString(), (err) => {
            if (err) {
              console.log("error");
            }
          })

        }
      );
    });
  });
});
