import type { Serverless } from 'serverless/aws';
import { PropertyReader } from './src/util/PropertyReader';

let propertyReader: PropertyReader = new PropertyReader("../props.json");

const serverlessConfiguration: Serverless = {
  service: {
    name: 'task-service',
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    profile: propertyReader.readParameter("profile"),
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      AWS_ACCOUNT_ID: propertyReader.readParameter("AWS_ACCOUNT_ID"),
      IotEndpoint: 'a3o5r22icumisa-ats.iot.eu-west-1.amazonaws.com',
      NotificationQueueName: 'send-notification-${opt:stage, self:provider.stage}',
      TaskTopicName: 'viot/{vehicleId}/task/newTask',
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "sqs:SendMessage"
        ],
        Resource: [
          "arn:aws:sqs:${opt:region, self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:${self:provider.environment.NotificationQueueName}"
        ]
      },
      {
        Effect: "Allow",
        Action: [
          "iot:Publish"
        ],
        Resource: [
          "arn:aws:iot:${opt:region, self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:topic/*"
        ]
      },
    ]
  },
  functions: {
    storeTask: {
      handler: 'src/handler.storeTask',
      events: [
        {
          http: {
            method: 'post',
            path: 'task',
          }
        }
      ]
    },
    getTasks: {
      handler: 'src/handler.getTasks',
      events: [
        {
          http: {
            method: 'get',
            path: 'task',
          }
        }
      ]
    }
  },
  resources: {
    Resources: {
      NotificationQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "${self:provider.environment.NotificationQueueName}",
          Tags: [
            {
              Key: "solution",
              Value: "ServerlessDemo"
            }
          ]
        }
      },
    }
  }
}

module.exports = serverlessConfiguration;
