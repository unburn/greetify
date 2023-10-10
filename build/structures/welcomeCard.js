const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");

// GlobalFonts.registerFromPath("build/structures/font/Montserrat-Black.ttf", "montserrat-black")
// GlobalFonts.registerFromPath("build/structures/font/Montserrat-ExtraLight.ttf", "montserrat-extra-light")

GlobalFonts.registerFromPath("node_modules/pixelord/build/structures/font/Montserrat-Black.ttf", "montserrat-black")
GlobalFonts.registerFromPath("node_modules/pixelord/build/structures/font/Montserrat-ExtraLight.ttf", "montserrat-extra-light")

const defaultAssets = {
    background: "https://s6.imgcdn.dev/ZqH2S.png",
    shadow: "https://s6.imgcdn.dev/Zqmpi.png",
    gradient: "https://s6.imgcdn.dev/ZqFsH.png"
}

class welcomeCard {
    constructor(options) {
        this.username = options?.username;
        this.avatar = options?.avatar;
        this.title = options?.title;
        this.color = options?.color;
        this.message = options?.message;
        this.background = options?.background;
    }

    setName(name) {
        this.username = name;
        return this;
    }

    setAvatar(image) {
        this.avatar = image;
        return this;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setMessage(message) {
        this.message = message;
        return this;
    }

    setBackground(background) {
        this.background = background
        return this;
    }

    async build() {
        if (!this.username) throw new Error("Provide username to display on card");
        if (!this.avatar) throw new Error("Provide valid avatar url of user");
        if (!this.title) this.setTitle("WELCOME");
        if (!this.color) this.setColor("00FF38")
        if (!this.message) throw new Error("Provide message to display on card");
        if (!this.background) this.setBackground(defaultAssets.background)

        if(this.username.length >= 16) {
            throw new Error(`The username is too long to display on card [less than equal to 15]`);
        }

        if(this.title.length >= 16) {
            throw new Error(`The title is too long to display on card [less than equal to 15]`);
        }

        if (this.message.length >= 36) {
            throw new Error(`The message is too long to display on card [less than equal to 35]`);
        }

        const canvasWidth = 1280;
        const canvasHeight = 720;

        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext("2d");

        // BACKGROUND
        await loadImage(this.background).then(async (image) => {
            const scale = Math.max(canvasWidth / image.width, canvasHeight / image.height);

            const imageWidth = image.width * scale;
            const imageHeight = image.height * scale;
            const imageX = (canvasWidth - imageWidth) / 2;
            const imageY = (canvasHeight - imageHeight) / 2;

            ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);

            // ADD GRADIENT EFFECT
            await loadImage(defaultAssets.gradient).then((image) => {
                ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
            })

            const svgString = `
  <svg width="1280" height="538" viewBox="0 0 1280 538" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0H1280V229.5C1280 399.88 1141.88 538 971.5 538H308.5C138.12 538 0 399.88 0 229.5V0Z" fill="#${this.color}" fill-opacity="0.2" />
  </svg>
`;

            // Create a data URI from the SVG string
            const dataUri = `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;

            await loadImage(dataUri).then((image) => {
                ctx.drawImage(image, 0, 0, 1280, 538);
            })
        });

        // NAME OF USER
        ctx.fillStyle = `#${this.color}`
        ctx.font = `91px montserrat-black`
        ctx.textAlign = 'center';
        ctx.fillText(`${this.username}`.toUpperCase(), centerX, centerY + 30)

        const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#494949');

        ctx.fillStyle = gradient
        ctx.font = `76px montserrat-black`
        ctx.textAlign = 'center';
        ctx.fillText(`${this.title}`.toUpperCase(), centerX, centerY + 100)

        ctx.fillStyle = gradient
        ctx.font = `41px montserrat-extra-light`
        ctx.textAlign = 'center';
        ctx.fillText(`${this.message}`.toUpperCase(), centerX, centerY + 250);

        // SHADOW OF AVATAR (FIRST)
        await loadImage(defaultAssets.shadow).then((image) => {
            ctx.drawImage(image, 466, 48, 348, 348);
        });

        // AVATAR OF USER
        await loadImage(this.avatar).then((image) => {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 509
            ctx.shadowOffsetY = 92

            ctx.beginPath();
            ctx.arc(510 + 130, 92 + 130, 130, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(image, 510, 92, 260, 260);
        })

        return canvas.toBuffer("image/png");
    }
}

module.exports = { welcomeCard }