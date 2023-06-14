import { sequelize } from "../config";
import { DataTypes } from "sequelize";

const Autor = sequelize.define(
  "autores",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Autor;
