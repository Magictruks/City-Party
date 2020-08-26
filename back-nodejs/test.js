let category = [
    {id: 5, label: 'New Cat'},
    {id: 1, label: 'Bar'},
    {id: 2, label: 'Boite de nuit'},
]

let event = [
    {id: 1, label: 'Event Bar', category_id: [1]},
    {id: 2, label: 'Event Boite de nuit', category_id: [2]},
    {id: 3, label: 'Event Bar', category_id: [1,2]},
    {id: 4, label: 'Event Bar', category_id: [5]},
    {id: 5, label: 'Event Bar', category_id: [1,2,5]}
]

let eventFilter = []

category.forEach(cat => {
    let catFilter = []
    event.forEach(el => {
        let found = el.category_id.filter(e => e == cat.id)
        if(found.length > 0) catFilter.push(el)
    })
    eventFilter.push(catFilter)
})

console.log(eventFilter)