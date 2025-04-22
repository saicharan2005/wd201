/* eslint-disable no-undef */
const todoList = require("../todo");

const {
  all,
  markAsComplete,
  add,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todoList();

describe("Todo Test Suite", () => {
  beforeAll(() => {

    all.length = 0;

    add({
      title: "overdue Task",
      completed: false,
      dueDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
    });

    add({
      title: "due Today Task",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });

    add({
      title: "due Later Task",
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10), 
    });
  });

  test("Should add a new todo", () => {
    const todoCount = all.length;
    add({
      title: "New Test Todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoCount + 1);
  });

  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("should return overdue items", () => {
    const items = overdue();
    expect(
      items.every(
        (todo) => todo.dueDate < new Date().toISOString().slice(0, 10)
      )
    ).toBe(true);
  });

  test("should return due today items", () => {
    const items = dueToday();
    expect(
      items.every(
        (todo) => todo.dueDate === new Date().toISOString().slice(0, 10)
      )
    ).toBe(true);
  });

  test("should return due later items", () => {
    const items = dueLater();
    expect(
      items.every(
        (todo) => todo.dueDate > new Date().toISOString().slice(0, 10)
      )
    ).toBe(true);
  });

  test("should display todos in displayable format", () => {
    const items = dueToday();
    const output = toDisplayableList(items);
    expect(typeof output).toBe("string");
    expect(output.includes("[ ]")).toBe(true);
  });
});
