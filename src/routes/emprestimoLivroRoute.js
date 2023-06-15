import controller from "../controllers/emprestimoLivroController";

export default (app) => {
  app.delete("/emprestimolivros/deletar", controller.destroy);
  app.get("/emprestimolivros", controller.get);
  app.get("/emprestimolivros/:id", controller.get);
  app.post("/emprestimolivros", controller.persist);
  app.patch("/emprestimolivros/:id", controller.persist);
};
