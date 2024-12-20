/*
    Problem: Our user made a mineral selection. This selection is reflected in the transient state. We are going to need this change
    in the transient state. 
    Tasks:
    (1) We will need to fetch the facilityMinerals array of object. 
    (2) We will need to expand the fetch to include the facility object and mineral object associated with the selected mineral option
    (3) This function will be asynchronous
    (7) This function will accept an integer as an argument
    (4) With the received, expanded data, we must build a terminal string.
    (5) This terminal string, will be returned to the handler that invokes this function. 
    (6) This function will be exported
*/

import { state } from "./TransientState.js"

export const purchasePreview = async () => {
    const response = await fetch("http://localhost:8088/facilityMinerals?_expand=facility&_expand=mineral")
    const facilityAndMinerals = await response.json()
    let facilityName = state.facilityId
    let mineralName = state.mineralId
    for (const mineral of facilityAndMinerals) {
    
        if(mineral.mineral.id === mineralName)
            mineralName = mineral.mineral.name
    }
    for (const facility of facilityAndMinerals) {
        if(facility.id === facilityName)
            facilityName = facility.facility.name
    }
    return `
    <div class="purchasePreviewHTML">
        1 of ${mineralName} from the ${facilityName} facility.
    </div>
    `
}
