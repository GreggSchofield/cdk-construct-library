import { aws_sqs, Duration } from 'aws-cdk-lib';
import { DeadLetterQueue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { SecurityStandard } from './types';

/**
 * @description Properties for the PlatformQueue Construct
 */
export interface PlatformQueueProps {

  /**
     * @description Whether the queue is first-in first-out (fifo)
     */
  readonly fifo?: boolean;

  /**
     * @description Whether the queue has a dead letter queue (dlq)
     */
  readonly dlq?: boolean;

  readonly securityStandard?: SecurityStandard;
}

/**
 * @jsii ignore
 */
function createDeadLetterQueue(ctx: PlatformQueue): DeadLetterQueue {
  const dlq = new aws_sqs.Queue(ctx, 'DeadLetterQueue');

  return { maxReceiveCount: 1, queue: dlq };
}

/**
 * @description Construct that creates an AWS SQS queue with best practices
 */
export class PlatformQueue extends Construct {
  constructor(scope: Construct, id: string, props: PlatformQueueProps) {
    super(scope, id);

    new aws_sqs.Queue(this, 'PlatformQueue', {
      fifo: props.fifo,
      deadLetterQueue: props.dlq ? createDeadLetterQueue(this) : undefined,
      retentionPeriod: props.securityStandard === SecurityStandard.SOC_2 ? Duration.days(365) : undefined,
    });
  }
}
