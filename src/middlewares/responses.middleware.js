/**
 *
 * @param {Response} res
 * @param {String} resourceName
 * @param {Object} data
 * @returns
 * 200 OK: La solicitud fue exitosa. (Ejemplo: al obtener un recurso con GET).
 */
const res200 = (res, resourceName, data = {}) => {
  return res.status(200).json({
    success: true,
    msg: `${resourceName} successfully obteined`,
    data,
  });
};

/**
 *
 * @param {Response} res
 * @param {Error} error
 * @returns
 *
 */
const res500 = (res, error) => {
  console.log(error);
  return res.status(500).json({
    success: false,
    msg: error.message,
  });
};

/**
 *
 * @param {*} res
 * @param {*} createdName
 * @param {*} data
 * @returns
 * 201 Created: Se ha creado un nuevo recurso como resultado de la solicitud. (Ejemplo: al hacer POST).
 */
const res201 = (res, createdName, data = {}) => {
  return res.status(201).json({
    success: true,
    msg: `${createdName} successfully created`,
    data,
  });
};

const res404 = (res, name) => {
  return res.status(404).json({
    success: false,
    msg: `${name} not found or eliminated before`,
  });
};

const res206 = (res, name, type = "eliminated") => {
  return res.status(206).json({
    success: true,
    msg: `${name} successfully ${type}`,
  });
};

const res505 = (res) => {
  return res.status(505).json({
    success: false,
    msg: "Function not implemented",
  });
};

const res400 = (res, missingData) => {
  console.log("falta: ", missingData);
  return res.status(400).json({
    success: false,
    msg: `Missing ${missingData}`,
  });
};

export const responses = {
  res200,
  res500,
  res201,
  res404,
  res206,
  res505,
  res400,
};
