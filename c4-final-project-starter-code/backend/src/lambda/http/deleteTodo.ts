import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteTodoItem } from '../../businessLogic/todoList';
import { createLogger } from '../../utils/logger';
import {getUserId} from '../../lambda/utils';
const logger = createLogger('todos');
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);
  logger.info(todoId);
  logger.info(userId);
  // TODO: Remove a TODO item by id
    const result = await deleteTodoItem(userId, todoId);
    logger.info(result);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({item:result})
    }
}
