(async () => {
    // Importing modules
    const { welcomeCard } = require("greetify");
    const fs = require("fs")

    // Card details here
    const card = new welcomeCard()
        .setName("FlameFace")
        .setAvatar("https://s6.imgcdn.dev/ZFQlq.png")
        .setMessage("YOU ARE 688 MEMBER")
        .setBackground("https://s6.imgcdn.dev/ZqH2S.png")
        .setColor("00FF38") // without #
        .setTitle("Welcome")

    // Building process  
    const output = await card.build();

    // Save as image
    fs.writeFileSync("card.png", output);
    console.log("Done");
})()