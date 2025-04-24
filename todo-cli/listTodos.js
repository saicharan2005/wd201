//  listTodos.js
const db = require("./models/index");

const listTodo = async () => {
  try {
    await db.Todo2.showList();
  } catch (error) {
    console.error(error);
  }
};
(async () => {
  await listTodo();
})();
