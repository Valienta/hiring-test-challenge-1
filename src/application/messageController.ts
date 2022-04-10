import { Context } from 'koa';
import StatusCodes from 'http-status-codes';
import { Message } from '../domain/Message';
import {  getConnection } from 'typeorm';
import messageService from '../serivces/messageService';
import messageRepository from '../repositories/messageRepository';

async function saveMessage(ctx: Context): Promise<void> {
  
  const data = ctx.request.body.message;

  const msg = messageService.createMessage(data);

  getConnection().manager.save(msg);
  ctx.status = StatusCodes.OK;
}

async function getMessagesBetweenTwoDates(ctx: Context): Promise<void> {
  const start = ctx.request.query.start;
  const end = ctx.request.query.end;

  const msgs = messageRepository.getMessagesBetweenTwoDates(start, end);
  
  ctx.body = await msgs;
  ctx.status = StatusCodes.OK;
}

async function getMessagesByAlienLeader(ctx: Context): Promise<void> {
  const alien = ctx.request.query.alien;

  const msgs = messageRepository.getMessagesByAlienLeader(alien);
  
  ctx.body = await msgs;
  ctx.status = StatusCodes.OK;
}

async function getMessageByType(ctx: Context): Promise<void> {
  const type = ctx.request.query.type;

  const msgs = messageRepository.getMessageByType(type);
  
  ctx.body = await msgs;
  ctx.status = StatusCodes.OK;
}

async function getMessageByIsValid(ctx: Context): Promise<void> {
  const isvalid = ctx.request.query.isvalid;

  const msgs = messageRepository.getMessageByIsValid(isvalid);
  
  ctx.body = await msgs;
  ctx.status = StatusCodes.OK;
}

async function updateMessage(ctx: Context): Promise<void> {
  const date = ctx.request.body.date;
  const oldMessage = ctx.request.body.old_message;
  const newMessage = messageService.createMessage(ctx.request.body.new_message);
  const dateObject : Date = new Date(date);
  dateObject.setMinutes(dateObject.getMinutes() - 5);

  const msgs = messageRepository.updateMessage(dateObject, oldMessage, newMessage);
  
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
