const todoList = () => {
  all = []
  const add = (todoItem) => {
    all.push(todoItem)
  }
  const markAsComplete = (index) => {
    all[index].completed = true
  }

  const overdue = () => {
    // Write the date check condition here and return the array
    // of overdue items accordingly.

    return  all.filter( (todoitem) => todoitem.dueDate < today)
  }

  const dueToday = () => {
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
    return  all.filter( (todoitem) => todoitem.dueDate === today)
  }

  const dueLater = () => {
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
    return  all.filter((todoitem) => todoitem.dueDate > today)
  }

  const toDisplayableList = (list) => {
    // Format the To-Do list here, and return the output string
    // as per the format given above
    return list
    .map((todoitem)=>{
      const status =todoitem.completed === true ?"[x]":"[]";
      const date =todoitem.dueDate === today ?"":todoitem.dueDate;
      return `${status} ${todoitem.title} ${date}`
    }).join("\n");
  }

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList
  };
};


module.exports =todoList;



