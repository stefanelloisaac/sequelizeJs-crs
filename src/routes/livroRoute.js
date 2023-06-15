import controller from "../controllers/livroController";

export default (app) => {
  app.delete("/livros/deletar", controller.destroy);
  app.get("/livros", controller.get);
  app.get("/livros/disponiveis", controller.getLivrosDisponiveis);
  app.get("/livros/status", controller.getStatusLivro);
  app.get("/livros/status/:id", controller.getStatusLivro);
  app.get("/livros/:id", controller.get);
  app.post("/livros", controller.persist);
  app.patch("/livros/:id", controller.persist);
};
