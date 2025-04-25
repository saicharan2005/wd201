// models/todo.js
"use strict";
const { Op } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overDue = await Todo.overdue();
      overDue.forEach((task) => {
        console.log(task.displayableString());
      });
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const todayDue = await Todo.dueToday();
      todayDue.forEach((task) => {  
        console.log(task.displayableString());
      })
        
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const laterDue = await Todo.dueLater();
      laterDue.forEach((task) => {
        console.log(task.displayableString());
      }
      );
    }

    static today=new Date().toISOString().slice(0, 10);

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const overd = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: Todo.today,
          },
        },
      });
      return overd;

    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const tody = await Todo.findAll({
        where: {
          dueDate: Todo.today,
        },
      });
      return tody;
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      let tomo = new Date().setDate(new Date().getDate() + 1);
      const later = await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Sequelize.Op.gte]: tomo,
          },
        },
      });
      return later;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
       const task= await Todo.findByPk(id);

       if (task) {
         task.completed = true;
         await task.save();
       }
       console.log("Item not Found !");

    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      const todayDate = new Date().toISOString().slice(0, 10);

      if (this.dueDate === todayDate) {
        return `${this.id}. ${checkbox} ${this.title}`;
      } else {
        return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
      }
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
