import type { Serverless } from 'serverless/aws';
import { PropertyReader } from './src/util/PropertyReader';

let propertyReader: PropertyReader = new PropertyReader("../props.json");

const serverlessConfiguration: Serverless = {
  service: {
    name: 'notification-service',
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
      NotificationQueueName: 'send-notification-${opt:stage, self:provider.stage}',
      NotificationQueueURL: 'https://sqs.${opt:region, self:provider.region}.amazonaws.com/${self:provider.environment.AWS_ACCOUNT_ID}/${self:provider.environment.NotificationQueueName}',
      NotificationBucketName: 'il-sent-notifications-${opt:stage, self:provider.stage}',
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "SNS:Publish"
        ],
        Resource: [
          "*"
        ]
      },
      {
        Effect: "Allow",
        Action: [
          "s3:PutObject",
          "s3:PutObjectAcl"
        ],
        Resource: [
          "arn:aws:s3:::${self:provider.environment.NotificationBucketName}/*"
        ]
      },
    ]
  },
  functions: {
    sendNotificationHandler: {
      handler: 'src/handler.handleSendNotification',
      events: [
        {
          sqs: {
            arn: 'arn:aws:sqs:${opt:region, self:provider.region}:${self:provider.environment.AWS_ACCOUNT_ID}:${self:provider.environment.NotificationQueueName}',
            batchSize: 1,
          }
        }
      ],
      tags: {
        solution: "ServerlessDemo"
      }
    },
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
      NotificationBucket: {
        Type: "AWS::S3::Bucket",
        Properties: {
          BucketName: "${self:provider.environment.NotificationBucketName}",
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
