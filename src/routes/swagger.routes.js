import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import YAML from "yamljs";
// import swaggerFile from '../utils/swagger.yaml'

const swaggerYAML = YAML.load(require('./src/utils/swagger.yaml'))

export const swaggerRouter = Router ()

swaggerRouter.use("/api-docs", swaggerUi.serve);
swaggerRouter.get("/api-docs", swaggerUi.setup(swaggerYAML));