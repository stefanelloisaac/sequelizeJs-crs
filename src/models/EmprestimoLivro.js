import { sequelize } from "../config";
import { DataTypes } from "sequelize";
import Livro from './Livro'
import Emprestimo from './Emprestimo'

const EmprestimoLivro = sequelize.define(
  "emprestimo_livros",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

EmprestimoLivro.belongsTo(Livro, {
  as: "livro",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idLivro",
    field: "id_livro",
    allowNull: false,
  },
});

EmprestimoLivro.belongsTo(Emprestimo, {
  as: "emprestimo",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idEmprestimo",
    field: "id_emprestimo",
    allowNull: false,
  },
});

export default EmprestimoLivro;
