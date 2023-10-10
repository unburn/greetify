(async () => {
    const { welcomeCard } = require("../build/index");
    const fs = require("fs")

    const welcard = new welcomeCard()
        .setName("FlameFace")
        .setAvatar("https://images-ext-1.discordapp.net/external/nkz8HXtBh-7fSjsFGeAltG_THjuap1tmbd4pVcOsx9I/https/cdn.discordapp.com/avatars/786504767358238720/4d21f3a661f2f41eefe09e7aeb093fc0.webp")
        .setMessage("YOU ARE 340th MEMBER")
        .setBackground("https://s6.imgcdn.dev/ZqH2S.png")
        .setColor("00FF38") // without #
        .setTitle("Welcome")

    const output = await welcard.build();

    fs.writeFileSync(`card.png`, output);
    console.log("Done!");
})()