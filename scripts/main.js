import { governors } from "/.governors.js"
import { facilities } from "/.facilities.js"







const renderAllHTML = async () => {

    const governorsHTML = await governors()
    const facilitiesHTML = await facilities()
}