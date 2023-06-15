import controller from "../controllers/categoriaController";

export default (app) => {
  app.delete("/categorias/deletar", controller.destroy);
  app.get("/categorias", controller.get);
  app.get("/categorias/:id", controller.get);
  app.post("/categorias", controller.persist);
  app.patch("/categorias/:id", controller.persist);
};
