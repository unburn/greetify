import { Minimal } from "../dist/index.mjs";
import fs from 'fs'

Minimal({
    avatar: "https://cdn.discordapp.com/avatars/786504767358238720/f65e8322c0c290e7fc1d9ad20322256b.webp",
    name: "FLAMEFACE",
    type: "WELCOME",
    message: "YOUR ARE 100TH MEMBER"
}).then(x => {
    fs.writeFileSync("greetify.png", x)
})