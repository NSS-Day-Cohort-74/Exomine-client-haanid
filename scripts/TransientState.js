export const state = {
    "id": 0,
    "colonyId": 0, 
    "mineralId": 0,
    "facilityId": 0,
    "quantity": 0,
    "governorId": 0
}


export const setGovernorOptions = (chosenGovernorOptions) => {
    state.governorId = parseInt(chosenGovernorOptions)
    console.log(state)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}


export const setFacilityOptions = (facilityId) => {
    state.facilityId = parseInt(facilityId)
    console.log(state)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMineralId = (mineralId) => {
    state.mineralId = parseInt(mineralId)
    console.log(state)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColonyId = (governorColony) => {
    state.colonyId = parseInt(governorColony)
    console.log(state)
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

/*
    Does the chosen governor's colony already own some of this mineral?
        - If yes, what should happen?
        If the governor's colony already owns some of the mineral, we will need to update the quantity of that mineral they already have. 
        - If no, what should happen?
        If the governor's colony does not yet own a mineral, we will need to add this to the colony's 
    Defining the algorithm for this method is traditionally the hardest
    task for teams during this group project. It will determine when you
    should use the method of POST, and when you should use PUT.

    Only the foolhardy try to solve this problem with code.
*/
export const purchaseMineral = async () => {
    const colonyMineralsResponse = await fetch("http://localhost:8088/colonyMinerals")
    const colonyMinerals = await colonyMineralsResponse.json()
    const facilityMineralsResponse = await fetch("http://localhost:8088/facilityMinerals")
    const facilityMinerals = await facilityMineralsResponse.json()
    const updateQuantity = (currentColonyQuantity, mineralId, facilityMinerals) => {
        let updatedColonyQuantity = currentColonyQuantity

        for(const facilityMineral of facilityMinerals) {
            if(mineralId === facilityMineral.mineralId) {
                
                updatedColonyQuantity = currentColonyQuantity + 1 
            }   
        }
        return updatedColonyQuantity
    }

    for (const colonyMineral of colonyMinerals) {
        debugger
        if(state.colonyId === colonyMineral.colonyId && state.mineralId === colonyMineral.mineralId) {
            const currentColonyQuantity = colonyMineral.quantity
            const updateCurrentColonyQuantity = updateQuantity(currentColonyQuantity, colonyMineral.mineralId, facilityMinerals)
                const colonyMineralUpdate = {
                        method: "PUT",
                        headers: 
                        {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                        id: colonyMineral.id,
                        colonyId: colonyMineral.colonyId,
                        mineralId: colonyMineral.mineralId,
                        quantity: updateCurrentColonyQuantity
                        })
                    }
                    const response = await fetch(`http://localhost:8088/colonyMinerals/${colonyMineral.id}`, colonyMineralUpdate)
                }
                const moreMinerals = new CustomEvent("requestedMoreMinerals")
                document.dispatchEvent(moreMinerals)
            }
 
                const currentColonyQuantity = state.quantity
                const updateCurrentColonyQuantity = updateQuantity(currentColonyQuantity, state.mineralId, facilityMinerals)
                const colonyMineralAddition = {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({
                            id: state.id,
                            colonyId: state.colonyId,
                            mineralId: state.mineralId,
                            quantity: updateCurrentColonyQuantity
                        })
                    }
                    const response = await fetch("http://localhost:8088/colonyMinerals", colonyMineralAddition)
    const customEvent = new CustomEvent("newRequestedMineral")
    document.dispatchEvent(customEvent)
}


/*
    Problem: We have an empty array called colonyMinerals. This array will be populated with the user mineral selection, and they quantity that the 
    colony has purchased. The colonyMinerals should have these properties:

    colonyMinerals = 

        {
            id: state.id
            thisColony: state.colonyId, (and if match)
            quantity: state.quantity, (both match, increment: PUT)
            thisMineral: state.mineralId (if match)
        }
    }

   state =

        {
            id: created with POST (if neither match)
            colonyId: set with governor selection (and if match)
            governorId: set with governor selection
            facilityId: set with facility selection
            mineralId: set with mineral selection. (if match)
        }
  
    
        If the colonyId in the state is equal to the colonyId in the colonyMinerals, and if the mineralId in the state is equal to the mineralId in the 
    colonyMinerals, run the PUT request to update that colony's quantity and update that facilityMinerals quantity. Else, if create a new entry in
    the colonyMinerals that includes the state's colonyId and mineralId, initializing the state quantity of one 

    In order to find these matches, we will need to iterate through the array of colonyMineral objects.
    During this iteration, if both of the required properties match, run a  PUT request. 
    Otherwise, if one or the other match, run a POST request 

    Tasks:
    (1) purchaseMineral will be an asynchronous function.
    (2) We will have to fetch, the colonyMinerals and facilityMinerals.

    const colonyMineralsResponse = await fetch("http://localhost:8088/colonyMinerals")
    const colonyMinerals = await colonyMineralsResponse.json()
    const facilityMineralsResponse = fetch("http://localhost:8088/facilityMinerals")
    const facilityMinerals = facilityMineralsResponse.json()

    (3) We will iterate through colonyMinerals.

    for (const colonyMineral of colonyMinerals) {
        (4) While iterating, check state properties to each colonyMineral object.
        if(state.colonyId === colonyMineral.colonyId && state.mineralId === colonyMineral.mineralId) {
        const currentColonyQuantity = colonyMineral.quantity
        const updateCurrentColonyQuantity = updateQuantity(currentColonyQuantity, colonyMineral.mineralId, facilityMinerals)
            colonyMineralUpdate = {
                method: "PUT",
                headers: 
                {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                id: colonyMineral.id
                colonyId: colonyMineral.colonyId,
                mineralId: colonyMineral.mineralId,
                quantity: updateCurrentColonyQuantity
                })
            }
        }
        else {
            (5) If the state properties do not match, create with a POST request. 
            colonyMineralAddition = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    id: state.id,
                    colonyId: state.colonyId,
                    mineralId: state.mineralId,
                    quantity: updateCurrentColonyQuantity
                })
                const response = await fetch("http://localhost:8088/colonyMinerals", colonyMineralAddition)
            }
        }
    }
        If we cannot create an object in stringify function, store object properties in a new variable. 

    const updateQuantity = (currentColonyQuantity, mineralId, facilityMinerals) => {
        (6) Iterate through facilityMinerals array
        let updatedColonyQuantity = 0
        for(const facilityMineral of facilityMinerals) {
            (7) If state.mineralId matches facilityMineral.mineralId
            if(mineralId === facilityMineral.mineralId) {
                (8) updatedFacilityQuantity = facilityMinerals.quantity - 1
                updatedColonyQuantity = currentColonyQuantity + 1 
            }   
        }
        return updatedColonyQuantity
    }

    Currently, our initialQuantity is evaluating for quantity, but we need to reference the quantity property in this function
*/