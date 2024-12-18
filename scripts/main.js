import { governorsDropDown } from "./governors.js"
import { facilitiesDropDown } from "./facilities.js"







const renderAllHTML = async () => {

    const governorsHTML = await governorsDropDown()
    const facilitiesHTML = await facilitiesDropDown()
}




renderAllHTML()