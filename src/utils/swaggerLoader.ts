

import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
const swaggerPath = path.resolve(__dirname, '../../', 'swagger.yaml');
const swaggerDoc = yaml.parse(fs.readFileSync(swaggerPath, 'utf-8'));

export default swaggerDoc;