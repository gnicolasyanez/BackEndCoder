const express = require ("express");
const randomsRouter = express.Router();
const { fork } = require ("child_process");

randomsRouter.use(express.json());
randomsRouter.use(express.urlencoded({extended:true}));

randomsRouter.get("/:quantity?", ( req, res ) => {
  const quantity = req.query.quantity || "100000000";

  const calcFork = fork("./src/utils/calcFork")
  calcFork.send(quantity)
  calcFork.on("message", (numbers) => {
      res.send(numbers)
  })
})

module.exports= {randomsRouter}