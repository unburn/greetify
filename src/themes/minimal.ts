import { createCanvas, loadImage } from "@napi-rs/canvas"
import { cropImage } from "cropify"
import { registerFont } from "../functions/registerFont";
import { minimalType } from "../typings/types";

registerFont("PlusJakartaSans-Bold.ttf", "pjs-bold")
registerFont("PlusJakartaSans-ExtraBold.ttf", "pjs-ebold")
registerFont("PlusJakartaSans-ExtraLight.ttf", "pjs-elight")
registerFont("PlusJakartaSans-Light.ttf", "pjs-light")
registerFont("PlusJakartaSans-Medium.ttf", "pjs-medium")
registerFont("PlusJakartaSans-Regular.ttf", "pjs-regular")
registerFont("PlusJakartaSans-SemiBold.ttf", "pjs-sbold")

const Minimal = async (option: minimalType) => {
    if (!option.backgroundImage) {
        option.backgroundImage = "https://ik.imagekit.io/unburn/greetify-default.png"
    }

    if (!option.name) throw new Error("Invalid parameters: missing name paramter")
    if (!option.nameColor) option.nameColor = "#00FF9E"
    if (!option.message) throw new Error("Invalid parameters: missing message paramter")
    if (!option.messageColor) option.messageColor = "#FFFFFF"
    if (!option.type) option.type = "WELCOME"
    if (!option.typeColor) option.typeColor = "#FFFFFF"
    if (!option.circleBorder) option.circleBorder = false

    if (option.name.length > 13) {
        option.name = option.name.slice(0, 13) + ".."
    }

    if (option.type.length > 22) {
        option.type = option.type.slice(0, 22) + ".."
    }

    if (option.message.length > 30) {
        option.message = option.message.slice(0, 30) + ".."
    }

    const canvas = createCanvas(1280, 720)
    const ctx = canvas.getContext("2d")

    const centerX = 1280 / 2;

    const background = await cropImage({
        imagePath: option.backgroundImage,
        borderRadius: 100,
        cropCenter: true,
        width: 1280, 
        height: 720
    })

    ctx.drawImage(await loadImage(background), 0, 0)

    const avatar = await cropImage({
        imagePath: option.avatar,
        circle: option.circleBorder ? true : false,
        borderRadius: 100,
        cropCenter: true,
        width: 270,
        height: 270
    })

    ctx.drawImage(await loadImage(avatar), 505, 56)

    ctx.fillStyle = option.nameColor
    ctx.font = "100px pjs-ebold"
    ctx.textAlign = 'center';
    ctx.fillText(option.name.toUpperCase(), centerX, 440)

    ctx.fillStyle = option.typeColor
    ctx.font = "65px pjs-bold"
    ctx.textAlign = 'center';
    ctx.fillText(option.type.toUpperCase(), centerX, 530)

    ctx.fillStyle = option.messageColor
    ctx.font = "40px pjs-light"
    ctx.textAlign = 'center';
    ctx.fillText(option.message.toUpperCase(), centerX, 655)

    return canvas.toBuffer("image/png")
}

export { Minimal }