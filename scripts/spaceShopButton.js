import { purchaseMineral } from "./TransientState.js"



const handleSpaceShopClick = (clickEvent) => {
    if (clickEvent.target.id === "purchaseMinerals") {
        purchaseMineral()
    }
}

document.addEventListener("click", handleSpaceShopClick)

export const spaceShopButton = () => {
    return "<div><button id='purchaseMinerals'>Purchase Items</button></div>"
}