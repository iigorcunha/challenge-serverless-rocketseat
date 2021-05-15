import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { task_id } = JSON.parse(event.body);

  const done = await document.update({
    TableName: "tasks",
    Key: {
      "user_id": user_id,
      "id": task_id 
    },
    UpdateExpression: "set done = :done",
    ExpressionAttributeValues: {
      ":done": true
    }
  }).promise();

  console.log(done);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Task done!"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }


}