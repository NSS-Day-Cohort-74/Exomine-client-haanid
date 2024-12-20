export const purchasedMinerals = async () =>  {
    const response = await fetch(" http://localhost:8088/colonyMinerals?_expand=mineral")
    const colonyMinerals = await response.json()
    let html = " "
    for (const colonyMineral of colonyMinerals) {
        html += `
        <div class="purchasedMinerals">
            ${colonyMineral.quantity} tons of ${colonyMineral.mineral.name}
        </div> 
        `
    }
    return html
}