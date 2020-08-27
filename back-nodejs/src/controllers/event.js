const Event = require('../models/event');
const Category = require('../models/category');
const EventCategory = require('../models/event_category');
const EventUser = require('../models/event_user');

const jwt = require('jsonwebtoken');

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
        const access_token = req.headers.authorization.split(' ')[1]
        jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            Event.getByProximity(req.params.latitude, req.params.longitude, (err, result) => {
                if(err) throw err
                console.log(result)
                const events = groupObject(result)
                Category.getByProximity(req.params.latitude, req.params.longitude, (err, category) => {
                    if(err) throw err
                    let eventFilter = eventFilterByCategory(category, events)
                    eventFilter.unshift(events)
                    console.log(user.id)
                    EventUser.getByFavorite(user.id, (err, favorite) => {
                        if(err) throw err
                        console.log(favorite)
                        console.log('ici ?')
                        eventFilter.push(favorite)
                        console.log('la ?')
                        console.log(eventFilter)
                        return res.send(eventFilter)
                    })
                })
            })
        })
    } catch (e) {
        console.log('error : ' + e)
    }
}

exports.getFavorite = async(req,res) => {
    try {
        console.log('ici fav')
        const access_token = req.headers.authorization.split(' ')[1]
        jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            EventUser.getByFavorite(user.id, (err, favorite) => {
                if(err) throw err
                console.log(favorite)
                return res.send(favorite)
            })
        })
    } catch (e) {
        
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

exports.getFavoriteAndParticipate = async(req, res) => {
    try {
        const access_token = req.headers.authorization.split(' ')[1]
        jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log(user.id)
            EventUser.getByEventAndUserId(req.params.event_id, user.id, (err, result) => {
                console.log(result.length)
                if(result.length < 1) return res.send({favorite : 0, participate: 0})
                return res.send(result[0])
            })
        })
    } catch (e) {
        console.log('error : ' + e)
    }
}

exports.setFavorite = async(req, res) => {
    try {
        console.log(req.params)
        console.log(req.body)
        const access_token = req.headers.authorization.split(' ')[1]
        jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            EventUser.getByEventAndUserId(req.params.event_id, user.id, (err, result) => {
                if(err) throw err
                // console.log(result[0].favorite)
                if(result.length > 0)
                {
                    let fav
                    result[0].favorite === 0 ? fav = 1 : fav = 0
                    console.log(fav)
                    EventUser.putFav(req.params.event_id, user.id, fav, (err, result2) => {
                        if(err) throw err
                        console.log(result2)
                        return res.send(result2)
                    })
                } else 
                {
                    EventUser.post(req.params.event_id, user.id, 'favorite', (err, result2) => {
                        if(err) throw err
                        console.log(result2)
                        return res.send(result2)
                    })
                }
    
            })
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.setParticipate = async(req, res) => {
    try {
        console.log(req.params)
        console.log(req.body)
        const access_token = req.headers.authorization.split(' ')[1]
        jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            EventUser.getByEventAndUserId(req.params.event_id, user.id, (err, result) => {
                if(err) throw err
                if(result.length > 0)
                {
                    let participate
                    result[0].participate === 0 ? participate = 1 : participate = 0
                    EventUser.putParticipate(req.params.event_id, user.id, participate, (err, result2) => {
                        if(err) throw err
                        console.log(result2)
                        return res.send(result2)
                    })
                } else 
                {
                    EventUser.post(req.params.event_id, user.id, 'participate', (err, result2) => {
                        if(err) throw err
                        console.log(result2)
                        return res.send(result2)
                    })
                }
    
            })
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

const emptyEvent = {
    event_id: null,
    category_id: -2,
    label: "Pas encore de favoris",
    id: null,
    content: "Cliquez sur le petit coeur pour ajouter un évenement en favori",
    address: null,
    empty: true
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
            el.empty = false
            if(found.length > 0) catFilter.push(el)
        })
        eventFilter.push(catFilter)
    })

    return eventFilter
}