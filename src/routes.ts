
import Router from 'koa-router';
import config from './config';
import controller = require('./application/index');

const routes = new Router();

routes.get(`/${config.apiPrefix}/health/ping`, controller.health.ping);
routes.post(`/${config.apiPrefix}/message`, controller.message.saveMessage);
routes.get(`/${config.apiPrefix}/message`, controller.message.getMessagesBetweenTwoDates);
routes.get(`/${config.apiPrefix}/message/alien_leader`, controller.message.getMessagesByAlienLeader);
routes.put(`/${config.apiPrefix}/message`, controller.message.updateMessage);

export default routes;
