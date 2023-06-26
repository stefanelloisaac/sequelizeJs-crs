import Emprestimo from "../models/Emprestimo";
import Livro from "../models/Livro";
import EmprestimoLivro from "../models/EmprestimoLivro";
import Usuario from "../models/Usuario";
import { sequelize } from "../config";

const get = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, "") : null; //caso tenha id

    //getAll
    if (!id) {
      let response = await Emprestimo.findAll({
        order: [["id", "asc"]],
        include: {
          model: Usuario,
          as: "usuario",
        },
      });
      return res.status(200).send({
        type: "success",
        message: "Registros carregados com sucesso",
        data: response,
      });
    }

    //achar um registro com o id
    let response = await Emprestimo.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: "error",
        message: `Nenhum registro com id ${id}`,
        data: [],
      });
    }

    return res.status(200).send({
      type: "success",
      message: "Registro carregado com sucesso",
      data: response,
    });
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: `Ops! Ocorreu um erro`,
      error: error.message,
    });
  }
};

// create update, define entre post (sem id) e patch (com id)
const persist = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, "") : null;

    if (!id) {
      return await create(req.body, res);
    }

    return await update(id, req.body, res);
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: `Ops! Ocorreu um erro`,
      error: error.message,
    });
  }
};

const create = async (dados, res) => {
  //conforme a solicitação de cada model
  let { devolucao, prazo, idUsuario, livros } = dados;
  //cria um json, com os dados que devem ser alterados
  let emprestimo = await Emprestimo.create({
    devolucao,
    prazo,
    idUsuario,
  });
  for (let livro of livros) {
    let livroExistente = await Livro.findOne({
      where: {
        id: livro,
      },
    });

    if (!livroExistente) {
      await emprestimo.destroy();
      return res.status(400).send({
        message: `O livro id ${livro} não existe. O empréstimo não foi salvo!!`,
      });
    }

    let livroEmprestado = await sequelize.query(
      `select
      id_emprestimo as id
      from emprestimo_livros as el
      inner join emprestimos as e on (e.id = el.id_emprestimo)
      where e.devolucao is null and el.id_livro = ${livro}`
    );

    if (livroEmprestado[1].rowCount) {
      await emprestimo.destroy();
      livroEmprestado = livroEmprestado[0][0] ? livroEmprestado[0][0].id : "";
      return res.status(200).send({
        type: "error",
        message: `O livro id ${livro} já está emprestado no empréstimo ${livroEmprestado}. O empréstimo não foi salvo.`,
      });
    }

    await EmprestimoLivro.create({
      idEmprestimo: emprestimo.id,
      idLivro: livro,
    });
  }
  return res.status(201).send({
    type: "success",
    dados: emprestimo,
  });
};

const update = async (id, dados, res) => {
  //atualiza conforme o id passado
  let response = await Emprestimo.findOne({ where: { id } });

  //caso nao exista resposta
  if (!response) {
    return res.status(200).send({
      type: "error",
      message: `Nenhum registro com id ${id} para atualizar`,
      data: [],
    });
  }

  //passa linha por linha para atualizar os dados necessários
  Object.keys(dados).forEach((field) => (response[field] = dados[field]));

  //salva as alterações, função do sequelize
  await response.save();
  return res.status(200).send({
    type: "success",
    message: `Registro id ${id} atualizado com sucesso`,
    data: response,
  });
};

const destroy = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, "") : null;
    if (!id) {
      return res.status(200).send({
        type: "error",
        message: `Informe um id para deletar o registro`,
        data: [],
      });
    }

    let response = await Emprestimo.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: "error",
        message: `Nenhum registro com id ${id} para deletar`,
        data: [],
      });
    }

    // função do sequelize
    await response.destroy();
    return res.status(200).send({
      type: "success",
      message: `Registro id ${id} deletado com sucesso.`,
      data: [],
    });
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: `Ops! Ocorreu um erro.`,
      error: error.message,
    });
  }
};

const getDadosEmprestimo = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, "") : null;
    if (!id) {
      let response = await sequelize.query(
        `select
          e.*,
          array_agg(jsonb_build_object(
          'nomeCategoria', c.nome,
          'nomeLivro', l.titulo,
          'nomeAutor', a.nome
          )) as dados
        from emprestimos e
          join emprestimo_livros el on (el.id_emprestimo = e.id)
          join livros l on (l.id = el.id_livro)
          join categorias c on (c.id = l.id_categoria)
          join autores a on (a.id = l.id_autor)
        group by e.id`
      );
      return res.status(200).send({
        type: "success",
        message: "Registros carregados com sucesso",
        data: response,
      });
    }
  } catch (error) {
    return res.status(200).send({
      type: "error",
      message: `Ops! Ocorreu um erro.`,
      error: error.message,
    });
  }
};

export default {
  get,
  persist,
  destroy,
  getDadosEmprestimo,
};
