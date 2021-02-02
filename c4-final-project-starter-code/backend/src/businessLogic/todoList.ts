import { TodoItem } from '../models/TodoItem';
import {ToDoAccess} from '../dataAccessLayer/todoAccess';
import {CreateTodoRequest} from '../requests/CreateTodoRequest';
import {UpdateTodoRequest} from '../requests/UpdateTodoRequest';
import * as uuid from 'uuid';
const todoAccess = new ToDoAccess();
import { createLogger } from '../utils/logger';
const logger = createLogger('logic');

export async function getToDoList(): Promise<TodoItem[]> {
    return todoAccess.getAllToDos();
}

export async function getToDoForUser(userId: string): Promise<TodoItem[]> {
    logger.info('to do access');
    return todoAccess.getToDoForUser(userId);
}

export async function userExists(userId: string): Promise<Boolean> {
    return todoAccess.userExists(userId);
}

export async function createToDoItem(CreateTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
   const todoId = uuid.v4();
   logger.info(todoId);
   logger.info(CreateTodoRequest);
   logger.info(userId);
   logger.info( new Date().toISOString());
   return await todoAccess.createTodo({
    userId: userId,
    todoId: todoId,
    createdAt: new Date().toISOString(),
    done: false,   
    name: CreateTodoRequest.name,
    dueDate: CreateTodoRequest.dueDate
  });
}

export async function updateToDoItem(UpdateTodoRequest: UpdateTodoRequest, todoId: string, userId: string): Promise<TodoItem> {
    const todoItem = await todoAccess.getTodoItem(todoId, userId);
    todoItem.name = UpdateTodoRequest.name ? UpdateTodoRequest.name : todoItem.name;
    todoItem.done = UpdateTodoRequest.done != todoItem.done ? UpdateTodoRequest.done : todoItem.done;
    todoItem.dueDate = UpdateTodoRequest.dueDate != todoItem.dueDate ? UpdateTodoRequest.dueDate : todoItem.dueDate;
    return await todoAccess.updateTodo({
        ...todoItem
   });
 }

export async function itemExists(todoId: string, userId: string): Promise<Boolean> {
    return todoAccess.itemExists(todoId, userId);
}

export async function deleteTodoItem(userId: string, todoId: string): Promise<TodoItem> {
    return todoAccess.deleteTodoItem(userId, todoId);
}

export async function generateUrl(todoId: string, userId: string): Promise<string> {
    return todoAccess.generateUrl(todoId, userId);
}

export async function addImage(todoId: string, userId: string): Promise<string> {
    return await todoAccess.generateUrl(todoId, userId);
}