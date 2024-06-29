const { response } = require("express")
const todo = require("../Modal/todo.schema")



const newtodo = async (req, res) => {
    try {
       const { Task,isCompleted} = req.body
       const userId=req.User.userId
       if(Task===""){
        return res.json({ status: 0, message: "task should not be empty" })
       }
       let data={
        Task,
        isCompleted,
        createdby:userId
       }
       const savetodo=await todo.create(data)
       if(!savetodo) {
          return res.json({ status: 0, message: "todo not created" })
       }
       res.json({ status: 1, message: "todo created successfully" })
    } catch (error) {
       console.log("todo.controller.js/newtodo-->error", error)
    }
 }


 const alltodo = async (req, res) => {
    try {
       const Todo = await todo.find({createdby:req.User.userId})
       if (!Todo) {
          return res.json({ status: 0, message: "todo not found" })
       }
       res.json({ status: 1, response:Todo})
    } catch (error) {
       console.log("todo.controller.js/alltodo-->error", error)
    }
 }

 const getsingletodo = async (req, res) => {
    try {
       const { id } = req.params
       if (!id) {
          return res.json({ status: 0, message: "todo id requried" })
       }
       const Todo = await todo.findById(id)
       if (!Todo) {
          return res.json({ status: 0, message: "todo not found" })
       }
       res.json({ status: 1, response: Todo })
    } catch (error) {
       console.log("todo.controller.js/getsingletodo-->error", error)
    }
 }

 const Deletetodo = async (req, res) => {
    try {
       const { id } = req.params
       if (!id) {
          return res.json({ status: 0, message: "todo id requried" })
       }
       const Todo = await todo.findByIdAndDelete(id)
       console.log("Todo",todo)
       if (!Todo) {
          return res.json({ status: 0, message: "todo not deleted" })
       }
       res.json({ status: 1, message: "deleted successfully" })
    } catch (error) {
       console.log("todo.controller.js/Deletetodo-->error", error)
    }
 }
 
 const edittodo= async (req, res) => {
    try {
       const { id } = req.params
       if (!id) {
          return res.json({ status: 0, message: "todo id requried" })
       }
       const Todo = await todo.findByIdAndUpdate(id, req.body)
 
       if (!Todo) {
          return res.json({ status: 0, message: "todo not updated" })
       }
       res.json({ status: 1, message: "updated successfully" })
    } catch (error) {
       console.log("todo.controller.js/edittodo-->error", error)
    }
 }

 const TaskIsCompleted=async(req,res)=>{
   try {
      const { id ,isCompleted} = req.body
       if (!id) {
          return res.json({ status: 0, message: "todo id requried" })
       }
      const update=await todo.updateOne({_id:id},{isCompleted:isCompleted})
      if (!update) {
         return res.json({ status: 0, message: "todo not updated" })
      }
      res.json({ status: 1, message: "Completed" })
   } catch (error) {
      console.log("todo.controller.js/taskiscompleted-->error", error)
   }
 }

 const TodoAggregate=async(req,res)=>{
   try {
      const{search,skip,limit,checked}=req.body
      let query=[]

      if(search!==""){
         query.push({
            $match:{
               $or:[
                  {Task:{$regex:search+'.*',$options:'si'} },
               ],
            }
         })
      }
      if(checked==="true"){
         query.push({
            $match:{
               isCompleted:true
            }
         })
      }
      if(checked==="false"){
         query.push({
            $match:{
               isCompleted:false
            }
         })
      }

      query.push({
         $lookup:{
            from:'users',
            localField:'createdby',
            foreignField:'_id',
            as:'client_data'
         }
      })

      query.push(
        {$skip:skip},{$limit:limit}
      )
      const todoData=await todo.aggregate(query)
      if(!todoData){
         return res.json({ status: 0, message: "Data not found" })
      }
      res.json({ status: 1,response:todoData })
       
      
   } catch (error) {
      console.log("todo.controller.js/TodoAggregate-->error", error)
   }
 }
 module.exports={newtodo,alltodo,getsingletodo,Deletetodo,edittodo,TaskIsCompleted,TodoAggregate}