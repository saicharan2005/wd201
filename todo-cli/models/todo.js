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
      const today = new Date().toISOString().slice(0, 10);
      return await Todo2.findAll({
        where: {
          dueDate: {
            [Op.lt]: today,
          },
        },
      });
    }

    static async dueToday() {
      const today = new Date().toISOString().slice(0, 10);
      return await Todo2.findAll({
        where: {
          dueDate: today,
        },
      });
    }

    static async dueLater() {
      const today = new Date().toISOString().slice(0, 10);
      return await Todo2.findAll({
        where: {
          dueDate: {
            [Op.gt]: today,
          },
        },
      });
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
      const checkbox = this.completed ? "[x]" : "[ ]";
      const todayDate = new Date().toISOString().slice(0, 10);

      if (this.dueDate === todayDate) {
        return `${this.id}. ${checkbox} ${this.title}`;
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
