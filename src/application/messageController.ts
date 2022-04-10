import { Context } from 'koa';
import StatusCodes from 'http-status-codes';
import { Message } from '../domain/Message';
import {  getConnection } from 'typeorm';
import MessageService from '../serivces/MessageService';

async function saveMessage(ctx: Context): Promise<void> {
  
  const data = ctx.request.body.message;

  const msg = MessageService.createMessage(data);

  getConnection().manager.save(msg);
  ctx.status = StatusCodes.OK;
}

async function getMessagesBetweenTwoDates(ctx: Context): Promise<void> {
  const start = ctx.request.query.start;
  const end = ctx.request.query.end;

  const msgs = getConnection()
              .getRepository(Message)
              .createQueryBuilder('message')
              .where("message.created_at > :start and message.created_at < :end", { start, end })
              .getMany();
  
  ctx.body = await msgs;
  ctx.status = StatusCodes.OK;
}

async function getMessagesByAlienLeader(ctx: Context): Promise<void> {
  const alien = ctx.request.query.alien;

  const msgs = getConnection()
              .getRepository(Message)
              .createQueryBuilder('message')
              .where('message.alien = :alien', { alien })
              .getMany();
  
  ctx.body = await msgs;
  ctx.status = StatusCodes.OK;
}

async function getMessageByType(ctx: Context): Promise<void> {
  const type = ctx.request.query.type;

  const msgs = getConnection()
              .getRepository(Message)
              .createQueryBuilder('message')
              .where('message.type = :type', { type })
              .getMany();
  
  ctx.body = await msgs;
  ctx.status = StatusCodes.OK;
}

async function getMessageByIsValid(ctx: Context): Promise<void> {
  const isvalid = ctx.request.query.isvalid;

  const msgs = getConnection()
              .getRepository(Message)
              .createQueryBuilder('message')
              .where('message.isvalid = :isvalid', { isvalid })
              .getMany();
  
  ctx.body = await msgs;
  ctx.status = StatusCodes.OK;
}

async function updateMessage(ctx: Context): Promise<void> {
  const date = ctx.request.query.date;
  const old = ctx.request.query.msg;
  const data = ctx.request.body.message;
  const msg = MessageService.createMessage(data);

  const msgs = getConnection()
              .createQueryBuilder()
              .update(Message)
              .set(msg)
              .where("message.created_at > :date and message.text = :old", { date: Date.parse(date) - 5, old })
              .execute();
  
  ctx.body = await msgs;
  ctx.status = StatusCodes.OK;
}


export default {
  saveMessage,
  getMessagesBetweenTwoDates,
  getMessagesByAlienLeader,
  getMessageByType,
  getMessageByIsValid,
  updateMessage
};
