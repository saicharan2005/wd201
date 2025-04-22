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
    add({
      title: "Overdue Task",
      completed: false,
      dueDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10), // yesterday
    });

    add({
      title: "Due Today Task",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10), // today
    });

    add({
      title: "Due Later Task",
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10), // tomorrow
    });
  });

  test("should add a new todo", () => {
    const todoCount = all.length;
    add({
      title: "New Test Todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todoCount + 1);
  });

  test("should mark a todo as complete", () => {
    const index = all.findIndex((todo) => todo.title === "Overdue Task");
    expect(all[index].completed).toBe(false);
    markAsComplete(index);
    expect(all[index].completed).toBe(true);
  });

  test("should return overdue items", () => {
    const overdueItems = overdue();
    expect(
      overdueItems.every(
        (todo) => todo.dueDate < new Date().toISOString().slice(0, 10)
      )
    ).toBe(true);
  });

  test("should return due today items", () => {
    const dueTodayItems = dueToday();
    expect(
      dueTodayItems.every(
        (todo) => todo.dueDate === new Date().toISOString().slice(0, 10)
      )
    ).toBe(true);
  });

  test("should return due later items", () => {
    const dueLaterItems = dueLater();
    expect(
      dueLaterItems.every(
        (todo) => todo.dueDate > new Date().toISOString().slice(0, 10)
      )
    ).toBe(true);
  });

  test("should display todos in displayable format", () => {
    const sampleList = dueToday();
    const output = toDisplayableList(sampleList);
    expect(typeof output).toBe("string");
    expect(output).toMatch(/\[ \]|\[x\]/); // should contain checkbox
  });
});
