import { sequelize } from "../config";
import { DataTypes } from "sequelize";
import Categoria from './Categoria'
import Autor from './Autor'

const Livro = sequelize.define(
  "livros",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    sinopse: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Livro.belongsTo(Categoria, {
  as: "categoria",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idCategoria",
    field: "id_categoria",
    allowNull: false,
  },
});

Livro.belongsTo(Autor, {
  as: "autor",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idAutor",
    field: "id_autor",
    allowNull: false,
  },
});

export default Livro;
