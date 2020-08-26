const Event = require('../models/event');
const Category = require('../models/category');
const EventCategory = require('../models/event_category');

exports.get = async(req, res) => {
    try {
        Event.get((err, result) => {
            if(err) throw err
            console.log(result)
            return res.send(result)
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.getById = async(req, res) => {
    try {
        Event.getById(req.params.id, (err, result) => {
            if(err) throw err
            console.log('ici result event')
            console.log(result)
            console.log(typeof(result))
            return res.send(result)
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.getByEventCategory = async(req, res) => {
    try {
        Event.getByEventCategory(req.params.id, (err, result) => {
            if(err) throw err
            let tempCategoryIdArray = []
            if(result.length > 1) {
                for (const element of result) {
                    tempCategoryIdArray.push(element.category_id)
                }
                result[0].category_id = tempCategoryIdArray
            } else {
                result[0].category_id = [result[0].category_id]
            }
            return res.send(result[0])
        })
    } catch (e) {
        console.log('error : ' + e)
    }
}

exports.getByProximity = async(req,res) => {
    try {
        Event.getByProximity(req.params.latitude, req.params.longitude, (err, result) => {
            if(err) throw err
            const events = groupObject(result)
            Category.getByProximity(req.params.latitude, req.params.longitude, (err, category) => {
                if(err) throw err
                let eventFilter = eventFilterByCategory(category, events)
                eventFilter.unshift(events)
                return res.send(eventFilter)
            })
        })
    } catch (e) {
        console.log('error : ' + e)
    }
}

exports.post = async(req, res) => {
    try {
        console.log(req.body)
        Event.post(req.body, (err, result) => {
            if(err) throw err
            EventCategory.post(result.insertId, req.body.category, (err, result2) => {
                console.log(result2)
                const event = {id: result.insertId, label: req.body.label, content: req.body.content, address: req.body.address, date_begin_at: req.body.date_begin_at, date_end_at: req.body.date_end_at, price: req.body.price, created_at: Date.now()}
                return res.send(event)
            })
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.put = async(req, res) => {
    try {
        Event.put(req.body, req.params.id, (err, result) => {
            if(err) throw err
            EventCategory.delete(req.params.id, (err, result2) => {
                if(err) throw err
                EventCategory.post(req.params.id, req.body.category, (err, result3) => {
                    const event = {id: req.params.id, label: req.body.label, content: req.body.content, address: req.body.address, date_begin_at: req.body.date_begin_at, date_end_at: req.body.date_end_at, price: req.body.price, created_at: Date.now()}
                    return res.send(event)
                })
            })
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.delete = async(req, res) => {
    try {
        Event.delete(req.params.id, (err, result) => {
            if(err) throw err
            console.log(result)
            return res.send(result)
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

function groupObject(obj) {
    let group = obj.reduce((r, a) => {
        r[a.id] = [...r[a.id] || [], a];
        return r;
       }, {});
    let newGroup = []
    for (let key in group){
        if(group.hasOwnProperty(key)){
            console.log(`${key} : ${group[key]}`)
            let tempCategoryIdArray = []
            group[key].forEach(element => {
                tempCategoryIdArray.push(element.category_id)
            })
            group[key][0].category_id = tempCategoryIdArray
            newGroup.push(group[key][0])
        }
    }
    return newGroup;
}

function eventFilterByCategory(category, events) {
    let eventFilter = []

    category.forEach(cat => {
        let catFilter = []
        events.forEach(el => {
            let found = el.category_id.filter(e => e == cat.id)
            if(found.length > 0) catFilter.push(el)
        })
        eventFilter.push(catFilter)
    })

    return eventFilter
}