

const todoList = require('../todo')

const {all ,markAsComplete,add}= todoList();

// describe(" todo test ",()=>{
//   test("should add new todo",()=>{
//     expect(all.length).toBe(0);

//     add(
//       {
//         tittle:"test todo",
//         completed:false,
//         dueDate: new Date().toISOString("en-CA")
//       }
//     )

//     expect(all.length).toBe(1);
//   })

//   test("should mark as complete",()=>{
//     expect(all[0].completed).toBe(false);
//     markAsComplete(0);
//     expect(all[0].completed).toBe(true)
//   })
// })



describe(" todo test ",()=>{

  beforeAll(()=>{
  
    add(
      {
        tittle:"test todo",
        completed:false,
        dueDate: new Date().toISOString("en-CA")
      }
    )
  })
  test("should add new todo",()=>{

    const todoItemscount =all.length;

    add(
      {
        tittle:"test todo",
        completed:false,
        dueDate: new Date().toISOString("en-CA")
      }
    )

    expect(all.length).toBe(todoItemscount+1);
  })

  test("should mark as complete",()=>{
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true)
  })
})