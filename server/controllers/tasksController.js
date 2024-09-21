import Tasks from "../models/taskModel.js";
import User from "../models/userModel.js";


export const getAllUserTasks = async (req, res) => {


    try {
        const tasks = await Tasks.find({ user: req.user.id });
        res.status(200).json(tasks);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Side Error." });
    }
}

export const getUserTaskWithId = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Tasks.findById(id);
        if (!task) {
            res.status(404).json({ error: "Task not found." });
            return;
        }
        res.status(200).json(task);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Side Error." });
    }
}

export const createTask = async (req, res) => {
    const { title, description, date, status,priority } = req.body;
    if (!title || !description) {
        res.status(400).json({ error: "Title and Description required to create new task." });
        return;
    }
    try {
        const newTask = new Tasks({
            user: req.user.id,
            title,
            description,
            dueDate:date,
            status,
            priority
        })
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server Side Error." });
    }

}

export const updateTask = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const task = await Tasks.findById(id);
        console.log(task)
        if (!task) {
            res.status(404).json({ error: "Task is not found." });
            return;
        }
        if (task.user.toString() !== req.user.id) {
            res.status(401).json({ error: "You are not authorized to perform this operation." });
            return;
        }
        const newTask = {
            title: req.body.title || task.title,
            description: req.body.description || task.description,
            dueDate: req.body.date || task.dueDate,
            status: req.body.status || task.status,
            priority:req.body.priority || task.priority
        }
        const savedTask = await Tasks.findByIdAndUpdate(id, { $set: newTask }, { new: true });
        
        res.status(200).json(savedTask);

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Side Error." });
    }
}

export const deleteTask = async (req, res) => {
    const {id} = req.params;
    try{
       const task = await Tasks.findById(id);
       if(!task){
        res.status(400).json({error:"Task not found."});
        return;
       }
       const response = await task.deleteOne();
       res.status(200).json({success:"Task deleted successfully."});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"Server Side Error."});
    }
}