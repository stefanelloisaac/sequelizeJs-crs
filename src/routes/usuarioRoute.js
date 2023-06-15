import controller from "../controllers/usuarioController";

export default (app) => {
  app.delete("/usuarios/deletar", controller.destroy);
  app.get("/usuarios", controller.get);
  app.get("/usuarios/:id", controller.get);
  app.post("/usuarios", controller.persist);
  app.patch("/usuarios/:id", controller.persist);
};
