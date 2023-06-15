import autorRoute from "./autorRoute";
import categoriaRoute from "./categoriaRoute";
import usuarioRoute from "./usuarioRoute";
import emprestimoRoute from "./emprestimoRoute";
import livroRoute from "./livroRoute";
import emprestimoLivroRoute from "./emprestimoLivroRoute";

export function Routes(app) {
  autorRoute(app);
  categoriaRoute(app);
  usuarioRoute(app);
  emprestimoRoute(app);
  livroRoute(app);
  emprestimoLivroRoute(app);
}
