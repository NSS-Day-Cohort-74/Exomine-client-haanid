import { governorsDropDown } from "./governors.js"
import { facilitiesDropDown } from "./facilities.js"
import { spaceShopButton } from "./spaceShopButton.js"




const container = document.querySelector("#container")


const renderAllHTML = async () => {

    const governorsHTML = await governorsDropDown()
    const facilitiesHTML = await facilitiesDropDown()
    const buttonHTML = await spaceShopButton()





    const composedHTML = `
         <h1>Solar System Mining Marketplace</h1>

    <section class="governor-dropdown">
    <h2>Choose Governor</h2>

    ${governorsHTML}

    </section>

    <section class="facilities-dropdown">
    <h2>Choose Facility</h2>

    ${facilitiesHTML}

    </section>

    <section class="colony-minerals">
    <h2>Colony Minerals

    </section>

<article class="shop-minerals">

    <section class="facility-minerals">
    <h2>Facility Minerals</h2>

    </section>
    
    <section class="space-shop">
    <h2>Space Shop</h2>

    ${buttonHTML}

    </section>

</article>

    
    `

    container.innerHTML = composedHTML
}




renderAllHTML()