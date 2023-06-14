import { sequelize } from "../config";
import { DataTypes } from "sequelize";
import Usuario from './Usuario'

const Emprestimo = sequelize.define(
  "emprestimos",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    devolucao: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    prazo: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Emprestimo.belongsTo(Usuario, {
  as: "usuario",
  onDelete: "NO ACTION",
  onUpdate: "NO ACTION",
  foreignKey: {
    name: "idUsuario",
    field: "id_usuario",
    allowNull: false,
  },
});

export default Emprestimo;
