// import { setFacilityOptions } from "./TransientState"
// // fetch the minerals data, and await it

// export const facilityMineral = async () => {
//     const response = await fetch("http://localhost:8088/minerals")
//     const minerals = await response.json()

// document.addEventListener("change", handleFacilityChange)
//     //  function accepts argument of the fac PK, that conditions if the selected facId PK matches an object in the facMin array with facId FK. Returns a mining Facility mineral object
   
      
                
  
    

//             let mineralOptions = ""
//             for (const facility of facilities) {
//                 if (facility.id === facilitiesMineral.id(facilityId)) { mineralOptions += facilityMineral.id(quantity) }
//             }
        
    
    
//     return mineralOptions
            
//         }

    


//     let facilitiesDropDownRadioButtonsHTML = ""
//     for (const mineral of minerals) {
//         mineralOptions += `
//     <input type='radio'
//     name='mineral'
//     value='${mineral.id}' />
//     ${minerals.quantity}
//     `
//     }
// }
// // compare the returned mining Facility minerals object foreign key mineralId to the array of minerals.

// // make radio buttons that show available min name and quantity of selected min fac in the dropdown, by accessing the corresponding minMinFacId





// // change event listener invoking a setter fun in transient state






// // const facilityRadioButtonsArray = minerals.map(
// //     (quantity) => {
// //         return `
// //         <div>
// //         <input type='radio'
// //         name='mineral'
// //         value='${mineral.id}' />
// //         ${mineral.quantity}
// //         </div>
// //         `
// //     }
// // ) 
// const handleFacilityChange = async (changeEvent) => {
//     if (changeEvent.target.id === "facility") {
//         facilityChosen = changeEvent.target.value
//         (facilityChosen)