import { purchasePreview } from "./purchasePreview.js"
import { purchaseMineral, setMineralId } from "./TransientState.js"



const handleSpaceShopClick = (clickEvent) => {
    if (clickEvent.target.id === "purchaseMinerals") {
        debugger
        purchaseMineral()
    }
}

document.addEventListener("click", handleSpaceShopClick)

export const spaceShopButton = () => {
    return "<div><button id='purchaseMinerals'>Purchase Items</button></div>"
}

const handleMineralChoice = async (changeEvent) => {
    if(changeEvent.target.name === "minerals") {
        const radioButtonValue = parseInt(changeEvent.target.value)
        setMineralId(radioButtonValue)
        const purchasePreviewField = document.querySelector(".purchasePreview")
        if(purchasePreviewField) {
            purchasePreviewField.innerHTML = await purchasePreview(radioButtonValue)
        }
        
    }
}
document.addEventListener("change", handleMineralChoice)