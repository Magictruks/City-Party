const Category = require('../models/category');

exports.get = async(req, res) => {
    try {
        Category.get((err, result) => {
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
        Category.getById(req.params.id, (err, result) => {
            if(err) throw err
            console.log(result)
            return res.send(result)
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.getByProximity = async(req,res) => {
    try {
        Category.getByProximity(req.params.latitude, req.params.longitude, (err, result) => {
            if(err) throw err
            console.log(req.params.latitude)
            console.log(req.params.longitude)
            result.unshift({id: -1, label: 'A proximité'})
            console.log(result)
            return res.send(result)
        })
    } catch (e) {
        
    }
}

exports.post = async(req, res) => {
    try {
        Category.post(req.body, (err, result) => {
            if(err) throw err
            const category = {id : result.insertId, label : req.body.label}
            return res.send(category)
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.put = async(req, res) => {
    try {
        Category.put(req.body, req.params.id, (err, result) => {
            if(err) throw err
            console.log(result)
            const category = {id : req.params.id, label : req.body.label}
            return res.send(category)
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}

exports.delete = async(req, res) => {
    try {
        Category.delete(req.params.id, (err, result) => {
            if(err) throw err
            console.log(result)
            return res.send(result)
        })
    } catch (e) {
      console.log('error : ' + e)
    }
}
