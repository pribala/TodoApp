import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { generateUrl } from '../../businessLogic/todoList';
import {getUserId} from '../../lambda/utils';
import { createLogger } from '../../utils/logger';

const logger = createLogger('url');
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  console.log(event, todoId);
  const userId = getUserId(event);
  logger.info(todoId);
  logger.info(userId);
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
  
  // const newItem = await addImage(todoId, userId);
  // logger.info(newItem);
  const url = await generateUrl(todoId, userId);
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true

    },
    body: JSON.stringify({
      //item: newItem,
      uploadUrl: url
    })

  }
}
