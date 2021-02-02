import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { CreateTodoRequest } from '../../requests/CreateTodoRequest'

import {getUserId} from '../../lambda/utils';
import { createLogger } from '../../utils/logger';
import { createToDoItem } from '../../businessLogic/todoList';
const logger = createLogger('todos');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  const userId = getUserId(event);
  logger.info(userId);
  // TODO: Implement creating a new TODO item
  logger.info('Create a new to do item: ', event);
  logger.info(newTodo);
  const newItem = await createToDoItem(newTodo, userId);
  logger.info(newItem);
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true

    },
    body: JSON.stringify({item: newItem})

  }
}
