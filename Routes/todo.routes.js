const express=require('express')
const { newtodo, alltodo, getsingletodo, Deletetodo, edittodo, TaskIsCompleted, TodoAggregate } = require('../Controller/todo.controller')
const router=express.Router()
const auth = require('../middleware/auth')


router.post('/new/todo',auth,newtodo)
router.get('/all/todo',auth,alltodo)
router.get('/todo/:id',auth,getsingletodo)
router.delete('/remove/todo/:id',auth,Deletetodo)
router.put('/update/todo/:id',auth,edittodo)
router.post('/complete/todo',auth,TaskIsCompleted)
router.post('/todo/aggregate',TodoAggregate)

module.exports=router