import controller from "../controllers/emprestimoController";

export default (app) => {
  app.delete("/emprestimos/deletar", controller.destroy);
  app.get("/emprestimos", controller.get);
  app.get("/emprestimos/:id", controller.get);
  app.post("/emprestimos", controller.persist);
  app.patch("/emprestimos/:id", controller.persist);
};
