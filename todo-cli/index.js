const { connect } = require("./connectDB.js");
const Todo = require("./todoModel.js");

const createTodo = async () => {
    try {
        await connect();
        const todo = await Todo.addTask({
            title: "todo - 5",
            dueDate: new Date(),
            completed: true,
        });
        console.log(`Todo created: ${todo.id}`);
    } catch (error) {
        console.error("Error creating todo:", error);
    }



}


const countItems = async () => {
    try {
        const count = await Todo.count();
        console.log(`Total todo items: ${count}`);
    } catch (error) {
        console.error("Error counting todo items:", error);
    }
}


const getAllTodos = async () => {
    try {
        const todos = await Todo.findAll();
        const todoList = todos.map(todo => todo.display()).join("\n");
        console.log(todoList);
        
        // console.log("All todos:", JSON.stringify(todos, null, 2));
    } catch (error) {
        console.error("Error fetching todos:", error);
    }
}

const getAllTodoByOrder = async () => {
  try {
      const todos = await Todo.findAll(
        { order: [["id", "DESC"]] }
    );
    const todoList = todos.map((todo) => todo.display()).join("\n");
    console.log(todoList);

    // console.log("All todos:", JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

const getAllTodoWhere = async () => {
  try {
    const todos = await Todo.findAll({ where: { completed: true } });
    const todoList = todos.map((todo) => todo.display()).join("\n");
    console.log(todoList);

    // console.log("All todos:", JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};


const getTodo = async () => {
  try {
    const todo = await Todo.findOne();

    console.log(todo.display());

    // console.log("All todos:", JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};


const updateTodo = async (id) => {
  try {
    const todo = await Todo.update({completed:true}, { where: { id:id } });

    console.log("UPDATE SUCEEFULLY");

    // console.log("All todos:", JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};


const deleteTodo = async (id) => {
  try {
    const todo = await Todo.destroy( { where: { id: id } });

    console.log("delete SUCEEFULLY");

  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};


const run = async () => {
  await getAllTodos();
}

run()

  // (async () => {
  //   //   await createTodo();
  //   //   await countItems();
  //     await getAllTodos();
  //   //   await getAllTodoByOrder();
  //   // await getAllTodoWhere();
  //   // await getTodo();
  //   // await updateTodo(1);
  //   await deleteTodo(9);
   
  //   await getAllTodos();
  // })();

   