<div>
<img src="https://s6.imgcdn.dev/ZFCbv.png">
<br>
<br>
</div>

# **About**
Pixelord is a powerful canvas project with high-quality design that has awesome canvas like welcomeCard and more in the future.

- Fully Customizable
- High Quality Assets
- Dreamlike designs

# **Installation**
```
npm i pixelord
```

# **Example Usage**
```js
(async () => {
    const { welcomeCard } = require("pixelord");
    const fs = require("fs")

    const welcard = new welcomeCard()
        .setName("FlameFace")
        .setAvatar("https://s6.imgcdn.dev/ZFQlq.png")
        .setMessage("YOU ARE 688 MEMBER")
        .setBackground("https://s6.imgcdn.dev/ZqH2S.png")
        .setColor("00FF38") // without #
        .setTitle("Welcome")

    const output = await welcard.build();

    fs.writeFileSync("card.png", output);
    console.log("Done");
})()
```

### **Output**
![welcome-preview](https://s6.imgcdn.dev/ZFifB.png)

# **Help**
If you need help or want some features to be added, join our official **[A3PIRE](https://discord.gg/qDysF95NWh)** community.


**A3PIRE Project 2023**