import { colonySection, governorsDropDown, handleColonyChange } from "./governors.js"
import { facilitiesDropDown } from "./facilities.js"
import { spaceShopButton } from "./spaceShopButton.js"

// import { facilitiesDropDownHTML} from "./facilities.js"



const container = document.querySelector("#container")


const renderAllHTML = async () => {

    const governorsHTML = await governorsDropDown()
    const facilitiesHTML = await facilitiesDropDown()
    const buttonHTML = await spaceShopButton()
    const colonyHTML = colonySection()





    const composedHTML = `
         <h1>Solar System Mining Marketplace</h1>

    <section class="governor-dropdown">
    <h2>Choose Governor:</h2>

    ${governorsHTML}

    </section>

    <section class="facilities-dropdown">
    <h2>Choose Facility:</h2>

    ${facilitiesHTML}

    </section>

    <section class="colony-minerals">

    ${colonyHTML}

    </section>
 
<article class="shop-minerals">

    <section class="facility-minerals">
    <h2>Facility Minerals</h2>
        <p class="minerals-list"></p>
    </section>
    
    <section class="space-shop">
    <div class="headerPreview">
    <h2>Space Shop</h2>
        <p class="purchasePreview"></p>
    ${buttonHTML}
    </div>

    </section>

</article>

    
    `

    container.innerHTML = composedHTML
}




renderAllHTML()