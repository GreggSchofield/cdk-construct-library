import { aws_sqs } from 'aws-cdk-lib';
import { Construct } from 'constructs';

/**
 * An AWS SQS Queue that is secure by default.
 */
export class PlatformQueue extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new aws_sqs.Queue(this, 'PlatformQueue', {
      fifo: true,
    });
  }
}
