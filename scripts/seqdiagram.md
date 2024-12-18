<div class="mermaid">
participant Main
participant Database
participant Govenors
participant Facilities
participant FindMinerals
participant miningFacilityMinerals
participant PurchaseButton
participant Purchase Preview
participant Transient State
participant colonyMinerals
Govenors->>Database: Fetch me the govenors data
Database -->> Govenors: Wait for it...Here it is
note over Govenors: With fetched data, generate\ndrop down box HTML 
Main ->> Govenors: Invoke govenorsDropDownBoxHTML()
Govenors-->>Main: Returns an HTML string
Facilities->>Database: Fetch me the facilities' data
Database -->> Facilities: Wait for it...Here it is
note over Facilities: With fetched data, generate\ndrop down box HTML 
Main ->> Facilities: Invoke facilitiesDropDownBoxHTML()
Facilities-->>Main: Returns an HTML string
note over Transient State:Transient State:\n{\n   id: 0,\n   colonyId: 0,\n   mineralId: 0,\n   facilityId: 0,\n   quantity: 0\n}
note over Govenors:        Change Event Listener()\n1. Calls the setColonyId()\n2. Returns transient state change
Govenors->>Transient State: The user has made a selection of a govenor. Represent his colony\n                                           setColonyId(colonyId)
Transient State-->>Govenors:All I need is the colonyId associated with him. We can set that.
note over Facilities:                  Change Event Listener\n(1) Calls findMinerals() passing in the selected\n     facility property id as an argument\n(2) Target DOM element, class="facilityMinerals"\n(3) If statement to verify DOM element has loaded\n(4) Modify DOM element with .innerHTML
Facilities->>Transient State: The user has selected a facility. We need to track this change.
Transient State-->>Facilities:No problem, we have a setter function to record this change. 
Facilities ->> FindMinerals: The user has selected a facility.\n        thisFacilityMinerals(facilityId)
miningFacilityMinerals ->> Database:Fetch me the minerals data
Database-->>miningFacilityMinerals:Wait for it...Here it is
FindMinerals->>Transient State: We need to find the right minerals to display to the user based on their selections
Transient State-->>FindMinerals: Sure, here is the key and its value. Do what you need with it.
FindMinerals->>Database:The user has selected a facility, and I need to display the minerals. Fetch me the miningFacilityMinerals objects
Database-->>FindMinerals:Sure, here are the miningFacilityMinerals objects. Use them as you need. 
note over FindMinerals:                                    thisFacilityMinerals()\nI have the transient state change\nI have the miningFacilityMinerals objects.\n\n                     \n(1) Compare the transient state key, facilityId\n      with the received objects' facilityId property.\n(2) When a match is found store the objects' mineralId property\n(3) Invoke whichMinerals to compare mineralIds\n(4) Returns an array of HTML strings
FindMinerals->>miningFacilityMinerals:I have this array of integers representing mineralIds. \nTell me which minerals I have \n                              whichMinerals()
note over miningFacilityMinerals:             thisFacilityMineralsHTML()\n1. Accepts array of integers as an argument\n2. Iterate each integers to allMinerals\n3. Find matching mineralId primary key\n4. Return an array of HTML strings
miningFacilityMinerals-->>FindMinerals: Returns an array of HTML strings.
note over Facilities:         Change Event Listener()\n1. Calls setMineralId()\n2. Returns transient state change
Facilities->>Transient State:The user has selected a mineral radio button\n                           setMineralId()
Transient State-->>Facilities: No problem, the transient state is updated to reflect their choice
note over PurchaseButton:Generates HTML for a button.
note over PurchaseButton:      Change Event Listener\n1. Listening for mineral selects\n2. Calls purchasePreviewHTML()\n3. Receive purchasePreviewHTML return\n4. Target DOM element that will contain preview info\n5. Modify DOM element with .innerHTML
PurchaseButton->>Purchase Preview:The user has selected a mineral option
Purchase Preview->>Transient State: I have created a button, but I want to show the user what they are\nabout to buy, and from where.I need to know the mineral and the facility they selected.
Transient State-->>Purchase Preview:Sure thing, here is the current selected mineral and facility options the user has chosen
Purchase Preview->>Database: The user is about to submit a purchase, but before they purchase I want to display a preview of their selections. I need the minerals and facilities data
Database-->>Purchase Preview:No proble at all. Check your URL...Here is the data. Use it to the get the properties of their selections that you would like to preview to the user.
note over Purchase Preview:                     purchasePreviewHTML()\n1. I have the users changes to the transient state\n2. I have the related data from the database. \n\n3. Compare the transient state property facilityId \n    with the array of facility objects.\n4. Return the match\n5. Compare the transient state property mineralId\n    with the array of mineral objects.\n6. Return the match\n7. Return an HTML string built from matches properties
Purchase Preview-->>PurchaseButton: Here is a generated HTML string for the user to preview
note over PurchaseButton:          Click Event Listner\n1. Listening for clicks on button\n2. Calls POST function in transient state
PurchaseButton->>Transient State: The user has finalized their selections. We need to store their selections into our database
note over Transient State:            postPurchase()\n1. Construct a POST object\n2. Fetch the database\n3. Pass in the POST object\n4. Include a Custom Event \n    to render page after user\n    finalizes selections.
Transient State-->>PurchaseButton:I have a POST request created for this purpose. Their selections will be saved to our database.
</div>