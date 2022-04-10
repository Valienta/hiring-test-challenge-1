import { BaseContext } from 'koa';
import StatusCodes from 'http-status-codes';

async function ping(ctx: BaseContext): Promise<void> {
  ctx.status = StatusCodes.OK;
  ctx.body = { pong: 'pong' };
}

export default {
  ping
};
