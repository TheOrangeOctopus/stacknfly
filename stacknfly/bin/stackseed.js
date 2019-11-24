const mongoose = require("mongoose");
const Stack = require("../models/Stack");



mongoose
  .connect('mongodb://localhost/stacknfly', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let stacks = [
  {title: "LA hora del deporte",
    description: "Una horita de ejercicio intensito para tu body!",
    category:"sport",
    tags:["outdoors"],
    timeInHours:1,
    likesCounter: 5,
    createdBy: "Perico el de los palotes",
    status:"active",
    image: null,
    steps: [{
      title : "Ponte ropa de deporte",
      instruction: "Coge las zapatillas llenas de polvo del armario, pontelas y sal a la calle",
      timeInMinutes: 5,
      order: 1
       },
       {
        title : "Corre!",
        instruction: "Corre por ciudad o por campo, pero corre. Deja de poner excusas.",
        timeInMinutes: 50,
        order: 2
         },
         {
          title : "Hora feliz!",
          instruction: "Corre al McDonalds y recupera lo perdido!",
          timeInMinutes: 5,
          order: 3
           }]
    },
    {title: "Architect mode",
    description: "Aprende algo de arquitectura",
    category:"learning",
    tags:["indoors"],
    timeInHours:2,
    likesCounter: 20,
    createdBy: "Fran Naranjin",
    status:"pending",
    image: "/public/images/dummy.jpeg",
    steps: [{
      title : "Ponte cómodo",
      instruction: "Sientate en tu escritorio habitual de estudio y ponte este video",
      timeInMinutes: 30,
      resource: "https://www.youtube.com/watch?v=-YARoSwQd-g",
      order: 1
       },
       {
        title : "Aplica conocimientos!",
        instruction: "Hazte el plano de una gasolinera",
        timeInMinutes: 20,
        order: 2
         },
         {
          title : "La hora de la verdad!",
          instruction: "Vete con tus amigos y diles lo guay que eres por ser arquitecto!",
          timeInMinutes: 10,
          order: 3
           }]
    }
]

Stack.deleteMany()
.then(() => {
  return Stack.create(stacks)
})
.then(stacksCreated => {
  console.log(`${stacksCreated.length} stacks created with the following id:`);
  console.log(stacksCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})