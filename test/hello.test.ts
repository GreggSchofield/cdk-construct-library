import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PlatformQueue } from '../src/test';

test('An single AWS SQS Queue is created', () => {

  const app = new cdk.App();

  const stack = new cdk.Stack(app, 'TestStack');

  new PlatformQueue(stack, 'TestPlatformQueue');

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::SQS::Queue', 1);

});
