import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
       },
        title: {
            type: String,
            requried: true
        },
        description: {
            type: String,
            required: true
        },
        dueDate: {
            type: Date,
            default: Date.now
        },
        priority:{
            type:String,
            default:"Low",
            
        },
        status:{
            type:String,
            default:"To Do"
        }
})

const Tasks = mongoose.model('Tasks',taskSchema);

export default Tasks;