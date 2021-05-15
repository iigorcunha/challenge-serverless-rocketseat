import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";
import { v4 as uuidv4 } from "uuid";

interface ICreateTask {
  title: string;
  deadline: Date;
}

export const handle: APIGatewayProxyHandler = async(event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as ICreateTask;

  await document.put({
    TableName: "tasks",
    Item: {
      id: uuidv4(),
      user_id,
      title,
      deadline: new Date(deadline),
      done: false
    }
  }).promise();


  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Task created!"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }



}