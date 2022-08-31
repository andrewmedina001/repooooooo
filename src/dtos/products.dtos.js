import _ from "lodash";
import validator from "validator";

export const productRequestDTO = (body) => {
  const errors = [];

  if(_.isNil(body.prod_name)){
    errors.push("Required product name is missing")
  }
  if(_.isNil(body.prod_type)){
    errors.push("Required product type is missing")
  }
  if(_.isNil(body.prod_size)){
    errors.push("Required product size is missing")
  }
  if(_.isNil(body.prod_color)){
    errors.push("Required product color is missing")
  }
  if(_.isNil(body.prod_price)){
    errors.push("Required product price is missing")
  }
  if(_.isNil(body.prod_topic)){
    errors.push("Required product topic is missing")
  }
  if(_.isNil(body.prod_designer)){
    errors.push("Required product designer is missing")
  }
  if(_.isNil(body.prod_img)){
    errors.push("Required product image url is missing")
  }
  if(!_.isNil(body.prod_img) && !validator.isURL(body.prod_img)){
    errors.push("Required product image url is invalid")
  }
  // if(_.isNil(body.categoryId)){
  //   errors.push("Required product category id is missing")
  // }
  if(errors.length !== 0){
    throw new Error(errors)
  } else {
    return body
  }
}