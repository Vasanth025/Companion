import Todo from "../models/todo.model.js";

const createTodo = async (req, res) => {
    try {
        const { todoName, dueDate, time, priority } = req.body;

        const userId = req.user.id;

        if (!todoName)
            return res.json({ status: 404, error: "Missing todo name" })

        if (!userId)
            return res.json({ status: 404, error: "Missing user id" })

        if (!dueDate)
            return res.json({ status: 404, error: "Missing due date" })

        if (!time)
            return res.json({ status: 404, error: "Missing time" })

        if (!priority)
            return res.json({ status: 404, error: "Missing priority" })

        const newTodo = await Todo.create({
            todoName,
            userId,
            dueDate,
            time,
            priority
        })

        return res.json({ status: 201, message: "Todo Created Successfully", newTodo })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

const getTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        const todos = await Todo.find({ userId });

        if (!todos)
            return res.json({ status: 404, error: "Todo not found" });

        return res.json({ status: 200, message: "Todos fetched Successfully", todos })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

const updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;

        const todo = await Todo.findById(todoId);

        if (!todo)
            return res.json({ status: 404, error: "Todo not found" });

        const body = req.body;

        todo.todoName = body.todoName || todo.todoName;
        todo.dueDate = body.dueDate || todo.dueDate;
        todo.time = body.time || todo.time;
        todo.priority = body.priority || todo.priority;
        todo.completed = body.completed || todo.completed;
        todo.finishedDate = body.finishedDate || todo.finishedDate;
        todo.isPinned = body.isPinned || todo.isPinned;

        await todo.save();

        return res.json({ status: 200, message: "Todo updated Successfully", todo })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.params;

        const todo = await Todo.findByIdAndDelete(todoId);

        if (!todo)
            return res.json({ status: 404, error: "Todo not found" });

        return res.json({ status: 200, message: "Todo deleted Successfully", todo })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}

const getTodoByDate = async (req, res) => {
    try {
        const {date} = req.body;

        if(!date)
            return res.json({error: 'date is required'});

        const todos = await Todo.find({dueDate: date})

        return res.json({
            status: 200,
            message: "Todos fetched Successfully",
            todos: todos
        })
    } catch (error) {
        console.log('Error', error)
        return res.json({ status: 502, error: "Internal Server Error" })
    }
}



export { createTodo, getTodo, updateTodo, deleteTodo, getTodoByDate }