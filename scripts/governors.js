import {setColonyId, setGovernorOptions} from "./TransientState.js"
import { state } from "./TransientState.js"

const handleGovernorChange = async (changeEvent) => {
    if (changeEvent.target.id === "governors") {
        const chosenOption = changeEvent.target.value
        setGovernorOptions(chosenOption)

        const colonyName = await handleColonyChange()
        const colonyDisplay = document.querySelector("#displayColonyMinerals")
        if (colonyDisplay) {
            colonyDisplay.textContent =colonyName ? `Colony: ${colonyName}` : "No colony selected"
        }
    }
}

export const handleColonyChange = async () => {
    try {
        const [governorsResponse, coloniesResponse] = await Promise.all([
            fetch("http://localhost:8088/governors"),
            fetch("http://localhost:8088/colonies")
        ])
        
        const governors = await governorsResponse.json()
        const colonies = await coloniesResponse.json()
        console.log(colonies)
        
        const selectedGovernor = governors.find(governor => governor.id === parseInt(state.governorId))
        setColonyId(selectedGovernor.colonyId)
        console.log(selectedGovernor)
        
        const matchingColony = colonies.find(colony => parseInt(colony.id) === selectedGovernor.colonyId)
        
        console.log(matchingColony)

        return matchingColony ? matchingColony.name : null
    } catch (error) {
        console.error("Error fetching data:", error)
        return null
    }
}

export const colonySection = () => {

let html = ""
html +=
    `<section class="colony-minerals">
    <h2 id="displayColonyMinerals">Colony Minerals</h2>

    </section>`

    return html
}



document.addEventListener("change", handleGovernorChange)


export const governorsDropDown = async () => {
    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()


        let html = ""
        html += `
        <div>
        <select id="governors">
        <option value="0">Choose Governor</option>
        ${governors.map(
            (governor) => {
                return `<option value="${governor.id}">${governor.name}</option>`
            }
        ).join("")}
        </select>
        <div id="displayColony"></div>
        </div>
        `
    return html

}
