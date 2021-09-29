import avatar from "./assets/images/avatar.jpeg";
import twitterIcon from "./assets/images/twitter-icon.svg";
import styles from "./styles/index.module.scss";
import "./styles/index.scss";

import { print } from "./sub";

console.log("index.js loaded...");

const $root = document.querySelector("#root");

const heading = document.createElement("h1");
heading.innerHTML = "Hello, World!";
$root.append(heading);

const myAvatar = document.createElement("img");
myAvatar.src = avatar;
myAvatar.classList.add(styles.image);
$root.append(myAvatar);

const twitter = document.createElement("img");
twitter.src = twitterIcon;
twitter.classList.add(styles.image);
$root.append(twitter);

const button = document.createElement("button");
button.innerHTML = "Press Me";
button.addEventListener("click", print);
$root.append(button);
