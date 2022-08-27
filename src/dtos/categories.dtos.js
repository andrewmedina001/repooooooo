import _ from "lodash";
import validator from "validator";

export const categoryRequestDTO = (body) => {
  const errors = [];

  if (_.isNil(body.cat_name)) errors.push("Required category name is missing")
  if (_.isNil(body.cat_desc)) errors.push("Required category description is missing")
  if (_.isNil(body.cat_img))  errors.push("Required category image url is missing")
  
  if (!_.isNil(body.cat_img) && !validator.isURL(body.cat_img))
    errors.push("Required category image url is invalid")
  if (errors.length !== 0)  throw new Error(errors)
  else return body
}