import 'source-map-support/register'
import { updateToDoItem } from '../../businessLogic/todoList';
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import {getUserId} from '../../lambda/utils';
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest';
import { createLogger } from '../../utils/logger';
const logger = createLogger('todos');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  logger.info(updatedTodo);
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  const updatedItem = await updateToDoItem(updatedTodo, todoId, userId);
  logger.info(updatedItem);
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({item: updatedItem})
  
    }
 }
