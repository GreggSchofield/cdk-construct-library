import {Construct} from "constructs";
import {aws_sqs} from "aws-cdk-lib";

export class PlatformQueue extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new aws_sqs.Queue(this, 'PlatformQueue', {
        fifo: true,
    });
  }
}
