import 'source-map-support/register'

import {getUserId} from '../../lambda/utils';
import { createLogger } from '../../utils/logger';
import { getToDoForUser } from '../../businessLogic/todoList';

const logger = createLogger('auth');

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  logger.info('Get to do list for an user.');
  const userId = getUserId(event);
  logger.info(userId, 'userId');
  const todos = await getToDoForUser(userId);
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({items: todos})
  }
}

