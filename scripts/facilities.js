import { setFacilityOptions } from "./TransientState.js"




export const facilitiesDropDown = async () => {
    const response = await fetch("http://localhost:8088/facilities")
    const facilities = await response.json()


    const handleFacilityChange = (changeEvent) => {
        if (changeEvent.target.id === "facilities") {
            const chosenOption = changeEvent.target.value
            setFacilityOptions(chosenOption)
        }
    }

        document.addEventListener("change", handleFacilityChange)

    
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
