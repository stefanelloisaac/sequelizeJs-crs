import Categoria from "../models/Categoria";

const get = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id.toString().replace(/\D/g, "") : null; //caso tenha id

    //getAll
    if (!id) {
      let response = await Categoria.findAll({
        order: [["id", "asc"]],
      });
      return res.status(200).send({
        type: "success",
        message: "Registros carregados com sucesso",
        data: response,
      });
    }

    //achar um registro com o id
    let response = await Categoria.findOne({ where: { id } });

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
      error: error,
    });
  }
};

const create = async (dados, res) => {
  //conforme a solicitação de cada model
  let { nome } = dados;

  //cria um json, com os dados que devem ser alterados
  let response = await Categoria.create({
    nome,
  });

  return res.status(200).send({
    type: "success",
    message: `Cadastro realizado com sucesso`,
    data: response,
  });
};

const update = async (id, dados, res) => {
  //atualiza conforme o id passado
  let response = await Categoria.findOne({ where: { id } });

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

    let response = await Categoria.findOne({ where: { id } });

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

export default {
  get,
  persist,
  destroy,
};
