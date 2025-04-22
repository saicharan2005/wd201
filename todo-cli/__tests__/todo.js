
/* eslint-disable no-undef */
const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();

const formattedDate = (date) => {
  return date.toISOString().slice(0, 10);
};
let dateToday = new Date();
let today = formattedDate(new Date());
let yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1)),
);
let tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1)),
);

describe("Todolist Test Suit", () => {
  beforeAll(() => {
    add({
      title: "todo - one",
      completed: false,
      dueDate: yesterday,
    }),
      add({
        title: "todo - two",
        completed: false,
        dueDate: tomorrow,
      });
  });
  test("Should add a todo item", () => {
    const todoItemCount = all.length;
    add({
      title: "todo - three",
      completed: false,
      dueDate: today,
    });
    expect(all.length).toBe(todoItemCount + 1);
  });
  test("Should mark a todo item as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test(" Should return a list of overdue todo items", () => {
    const overDueCount = overdue().length;
    add({
      title: "todo - four",
      completed: false,
      dueDate: yesterday,
    });
    expect(overdue().length).toEqual(overDueCount + 1);
  });
  test(" Should return a list of todo items due today", () => {
    const dueTodayCount = dueToday().length;
    add({
      title: "todo - five",
      completed: false,
      dueDate: today,
    });
    expect(dueToday().length).toEqual(dueTodayCount + 1);
  });
  test("Should return a list of todo items due later", () => {
    const dueLaterCount = dueLater().length;
    add({
      title: "todo - six",
      completed: false,
      dueDate: tomorrow,
    });
    expect(dueLater().length).toEqual(dueLaterCount + 1);
  });
});

