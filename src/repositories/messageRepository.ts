import {  getConnection } from 'typeorm';
import { Message } from '../domain/Message';

function getMessagesBetweenTwoDates(start, end) {
    const msgs = getConnection()
                .getRepository(Message)
                .createQueryBuilder('message')
                .where("message.created_at > :start and message.created_at < :end", { start, end })
                .getMany();

    return msgs;
}

function getMessagesByAlienLeader(alien) {
    const msgs = getConnection()
                .getRepository(Message)
                .createQueryBuilder('message')
                .where('message.alien = :alien', { alien })
                .getMany();
    return msgs;
}

function getMessageByType(type) {
    const msgs = getConnection()
                .getRepository(Message)
                .createQueryBuilder('message')
                .where('message.type = :type', { type })
                .getMany();
    return msgs;
}

function getMessageByIsValid(isvalid) {
    const msgs = getConnection()
                .getRepository(Message)
                .createQueryBuilder('message')
                .where('message.isvalid = :isvalid', { isvalid })
                .getMany();
    return msgs;
}

function updateMessage(dateObject, oldMessage, newMessage) {
    const msgs = getConnection()
                .createQueryBuilder()
                .update(Message)
                .set(newMessage)
                .where("message.created_at > :date and message.text = :old_message", { date: dateObject, old_message: oldMessage })
                .execute();
    return msgs;
}

export default {
    getMessagesBetweenTwoDates,
    getMessagesByAlienLeader,
    getMessageByType,
    getMessageByIsValid,
    updateMessage
};