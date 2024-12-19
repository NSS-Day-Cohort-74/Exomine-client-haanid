import { thisFacilityMineral } from "./minerals.js"
import { setFacilityOptions } from "./TransientState.js"


const handleFacilityChange = async (changeEvent) => {
    if (changeEvent.target.id === "facilities") {
        const chosenOption = changeEvent.target.value
        setFacilityOptions(chosenOption)
        const facilityMineralsList = document.querySelector(".facility-minerals")
        if(facilityMineralsList)
            facilityMineralsList.innerHTML = await thisFacilityMineral(chosenOption)
    }
}

document.addEventListener("change", handleFacilityChange)

export const facilitiesDropDown = async () => {
    const response = await fetch("http://localhost:8088/facilities")
    const facilities = await response.json()

        let facilitiesDropDownHTML = ""
        facilitiesDropDownHTML += `
        <div>
        <select id="facilities">
         <option value="0">Choose Facility</option>
        ${facilities.map(
            (facility) => {
                return `<option value="${facility.id}">${facility.name}</option>`
            }
        ).join("")}
        </select>
        </div>
        `
    return facilitiesDropDownHTML
}




// const facilityRadioButtonsArray = minerals.map(
//     (quantity) => {
//         return `
//         <div>
//         <input type='radio'
//         name='mineral'
//         value='${mineral.id}' />
//         ${mineral.quantity}
//         </div>
//         `
//     }
// ) 

// facilitiesDropDownHTML += facilityRadioButtonsArray.join("")

// return facilitiesDropDownHTML
