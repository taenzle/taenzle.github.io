import { parse } from "node-html-parser";
import fs from "node:fs";
import { win32 as path } from "node:path";

const update_gallery = (html_path, json_path) => {
  let eindruecke = JSON.parse(fs.readFileSync(json_path, "utf-8"));

  const target_data = fs.readFileSync(html_path, "utf-8");
  const target_root = parse(target_data);

  let gallery = target_root.getElementById("gallery");
  let template = target_root.querySelector("#eindruck-template");
  gallery.textContent = "";
  for (const e of eindruecke) {
    let figure = template.querySelector("figure").clone();
    figure.querySelector(".eindruck-titel").textContent = e["text"];
    let img = figure.querySelector("img");
    img.setAttribute("src", e["image"]);
    figure.querySelector(".eindruck-datum").textContent = e["date"];
    gallery.appendChild(figure);
  }
  fs.writeFile(html_path, target_root.toString(), (err) => {
    if (err) {
      console.log("error writing file");
    }
  });
};

let json_path = "./eindruecke.json";
let html_path = "./sections/eindruecke.html";

update_gallery(html_path, json_path);
