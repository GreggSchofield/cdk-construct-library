import { aws_sqs } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {DeadLetterQueue} from "aws-cdk-lib/aws-sqs";

export interface PlatformQueueProps {
  readonly fifo?: boolean,
  readonly dlq?: boolean,
}

/**
 * @jsii ignore
 */
function createDeadLetterQueue(ctx: PlatformQueue): DeadLetterQueue {
  const dlq = new aws_sqs.Queue(ctx, 'DeadLetterQueue',);

  return { maxReceiveCount: 1, queue: dlq };
}

export class PlatformQueue extends Construct {
  constructor(scope: Construct, id: string, props: PlatformQueueProps) {
    super(scope, id);

    new aws_sqs.Queue(this, 'PlatformQueue', {
      fifo: props.fifo,
      deadLetterQueue: props.dlq ? createDeadLetterQueue(this) : undefined,
    });
  }
}
