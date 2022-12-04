const express = require('express')
const router = express.Router()
const {models} = require('./../db/connec')
const { Op } = require("sequelize");
const sequelize = require('./../db/connec');

router.get('/',async (req,res) =>{
    rsp = await models.notifications.findAll()
    res.json(rsp)
})

router.get('/with-todo',async (req,res) =>{
    function isarrayVacio(arr) {
        if (arr.length === 0){
            return true
        }else{
        return false
        }
    }
    rsp = await models.todo.findAll({
        where: {
            userid: 1
        },
        include: ['notifis']
    })
    let rsp2 = []
    rsp.map((arr)=>{
        if(isarrayVacio(arr.notifis)==false){
            rsp2.push(arr)
        }
    })
    res.json(rsp2)
})

router.get('/with-notification',async (req,res) =>{
    rsp = await models.notifications.findAll({
        include: ['todo']
    })
    let rsp2= []
    rsp.map((arr)=>{
        if(arr.todo.userid == 1){
            rsp2.push(arr)
        }
    })
    res.json(rsp2)
})

router.get('/notification-today/:today',async (req,res) =>{//enviar dia actual
    rsp = await models.notifications.findAll({
        where: sequelize.where(sequelize.col('date'),req.params.today),
        include: ['todo']
    })
    let rsp2= []
    rsp.map((arr)=>{
        if(arr.todo.userid == 1){
            rsp2.push(arr)
        }
    })
    res.json(rsp2)
})

module.exports = router