import controller from "../controllers/emprestimoController";

export default (app) => {
  app.delete("/emprestimos/deletar/:id", controller.destroy);
  app.get("/emprestimos", controller.get);
  app.get("/emprestimos/dados", controller.getDadosEmprestimo);
  app.get("/emprestimos/:id", controller.get);
  app.post("/emprestimos", controller.persist);
  app.patch("/emprestimos/:id", controller.persist);
};
