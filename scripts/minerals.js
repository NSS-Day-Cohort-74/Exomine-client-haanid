/*
    Problem: When the user selects a facility, we want to display the minerals in that facility as a list of radio buttons. This module will be used
    to find all of the mineral IDs associated with the user's selected facility.
    Tasks:
    (1) We will have to access the transient state's key.
    (2) We will have to fetch the join table objects, facilityMinerals.
    (3) This fetch request will make the function asynchronous
    (4) Compare the user selected facilityId to the foreign key, facilityId, from the facilityMinerals objects
    (5) When a match is found, we want to store all associated mineral IDs associated with the user selected facility.
    (6) After iterating the array of facilityMineral objects, pass the array of mineralIds to a function created in the facilityMinerals module 
*/

//import { thisFacilityMineralsHTML } from "./facilityMinerals.js"


export const thisFacilityMineral = async (facilityId) => {
    const response = await fetch("http://localhost:8088/facilityMinerals?_expand=mineral")
    const facilityMinerals = await response.json()
    const mineralArray = []
    let mineralRadioButtons = " "

    for (const facilityMineral of facilityMinerals) {
        if(facilityMineral.facilityId === parseInt(facilityId)) {
            mineralArray.push({
                mineral: facilityMineral.mineral,
                quantity: facilityMineral.quantity
        })
    }
}    
  
        mineralRadioButtons = mineralArray.map(
        (thisFacilityMineral) => {
        return `
        <div class="mineralRadioButtons">
            <input type="radio" name="minerals" value="${thisFacilityMineral.mineral.id}"/> ${thisFacilityMineral.quantity} ${thisFacilityMineral.mineral.name}
        </div>`
        })
        return mineralRadioButtons
}
