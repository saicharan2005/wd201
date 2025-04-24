// models/todo.js
"use strict";
const { Op } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo2.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      const overDue = await Todo2.overdue();
      overDue.forEach((task) => {
        console.log(task.displayableString());
      });
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const todayDue = await Todo2.dueToday();
      todayDue.forEach((task) => {
        console.log(task.displayableString());
      });
      console.log("\n");

      console.log("Due Later");
      const laterDue = await Todo2.dueLater();
      laterDue.forEach((task) => {
        console.log(task.displayableString());
      });
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const todo = Todo2.findAll({
        where: {
          dueDate: { [Op.lt]: new Date() },
        },
      });
      return await todo;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const today = new Date().toISOString().slice(0, 10);
      const todos = Todo2.findAll({
        where: {
          dueDate: today,
          completed: false,
        },
      });
      return await todos;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const dueLate = Todo2.findAll({
        where: {
          dueDate: { [Op.gt]: new Date() },
          completed: false,
        },
      });
      return await dueLate;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const done = Todo2.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        }
      );
      return await done;
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let todayDate = new Date().toISOString().slice(0, 10);
      let overDue = this.dueDate > todayDate;

      if (this.dueDate === todayDate) {
        return `${this.id}. ${checkbox} ${this.title}`;
      } else if (this.completed && overDue) {
        return `${this.id}. [x] ${this.title} ${this.dueDate}`;
      } else {
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      }
    }

    }
  
  Todo2.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo2",
    }
  );
  return Todo2;
};
