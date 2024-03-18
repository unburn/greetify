const { Minimal } = require("../dist/index");
const fs = require('fs')

Minimal({
    
}).then(x => {
    fs.writeFileSync("greetify.png", x)
})