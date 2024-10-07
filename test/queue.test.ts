import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PlatformQueue, SecurityStandard } from '../src';

test('An single AWS SQS Queue is created with DLQ', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, 'TestStack');
  new PlatformQueue(stack, 'TestPlatformQueue', {
    dlq: true,
    securityStandard: SecurityStandard.SOC_2,
  });

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::SQS::Queue', 2);
});
