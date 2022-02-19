"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => res.status(404).send('Requested resource does not exist');
exports.default = notFound;
