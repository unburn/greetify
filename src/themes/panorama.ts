import { createCanvas, loadImage } from "@napi-rs/canvas"
import { cropImage } from "cropify"
import { registerFont } from "../functions/registerFont";
import { panoramaType } from "../typings/types";

registerFont("PlusJakartaSans-Bold.ttf", "bold")
registerFont("PlusJakartaSans-ExtraBold.ttf", "extrabold")
registerFont("PlusJakartaSans-ExtraLight.ttf", "extralight")
registerFont("PlusJakartaSans-Light.ttf", "light")
registerFont("PlusJakartaSans-Medium.ttf", "medium")
registerFont("PlusJakartaSans-Regular.ttf", "regular")
registerFont("PlusJakartaSans-SemiBold.ttf", "semibold")

const Panorama = async (option: panoramaType) => {
    if (!option.backgroundImage) {
        option.backgroundImage = "https://ik.imagekit.io/unburn/greetify-default.png"
    }

    if (!option.name) throw new Error("Invalid parameters: missing name paramter")
    if (!option.nameColor) option.nameColor = "#00FF9E"
    if (!option.type) option.type = "WELCOME"
    if (!option.typeColor) option.typeColor = "#FFFFFF"
    if (!option.circleBorder) option.circleBorder = false

    if (option.name.length > 13) {
        option.name = option.name.slice(0, 13) + ".."
    }

    if (option.type.length > 15) {
        option.type = option.type.slice(0, 15) + ".."
    }

    const canvas = createCanvas(1280, 410)
    const ctx = canvas.getContext("2d")

    const background = await cropImage({
        imagePath: option.backgroundImage,
        borderRadius: 100,
        cropCenter: true,
        width: 1280,
        height: 410
    })

    ctx.drawImage(await loadImage(background), 0, 0)

    const avatar = await cropImage({
        imagePath: option.avatar,
        borderRadius: 100,
        circle: option.circleBorder ? true : false,
        cropCenter: true,
        width: 290,
        height: 290
    })

    const centerY = 410 / 2

    ctx.drawImage(await loadImage(avatar), 90, 60)

    ctx.fillStyle = option.nameColor
    ctx.font = "80px extrabold"
    ctx.fillText(option.name.toUpperCase(), 420, centerY + 75)

    ctx.fillStyle = option.typeColor
    ctx.font = "65px light"
    ctx.fillText(option.type.toUpperCase(), 420, centerY - 25)

    return canvas.toBuffer("image/png")
}

export { Panorama }