import {setGovernorOptions} from "./TransientState.js"




export const governorsDropDown = async () => {
    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()

        const handleGovernorChange = (changeEvent) => {
            if (changeEvent.target.id === "governors") {
                const chosenOption = changeEvent.target.value
                setGovernorOptions(chosenOption)
            }
        }

        document.addEventListener("change", handleGovernorChange)

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
        </div>
        `
    return html

}
