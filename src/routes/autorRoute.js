import controller from "../controllers/autorController";

export default (app) => {
  app.delete("/autores/deletar", controller.destroy);
  app.get("/autores", controller.get);
  app.get("/autores/:id", controller.get);
  app.post("/autores", controller.persist);
  app.patch("/autores/:id", controller.persist);
};
