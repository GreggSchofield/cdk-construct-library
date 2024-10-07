import { aws_sqs } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {DeadLetterQueue} from "aws-cdk-lib/aws-sqs";

/**
 * Properties for the  PlatformQueue Construct.
 */
export interface PlatformQueueProps {

  /**
   * Create a first-in first-out (fifo) queue.
   */
  readonly fifo?: boolean,

  /**
   * Create a dead letter queue for failed messages.
   */
  readonly dlq?: boolean,
}

/**
 * @jsii ignore
 */
function createDeadLetterQueue(ctx: PlatformQueue): DeadLetterQueue {
  const dlq = new aws_sqs.Queue(ctx, 'DeadLetterQueue',);

  return { maxReceiveCount: 1, queue: dlq };
}

/**
 * Construct for an opinionated AWS SQS Queue.
 */
export class PlatformQueue extends Construct {
  constructor(scope: Construct, id: string, props: PlatformQueueProps) {
    super(scope, id);

    new aws_sqs.Queue(this, 'PlatformQueue', {
      fifo: props.fifo,
      deadLetterQueue: props.dlq ? createDeadLetterQueue(this) : undefined,
    });
  }
}
