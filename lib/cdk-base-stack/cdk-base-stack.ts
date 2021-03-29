import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export interface CdkBaseStackProps extends cdk.StackProps {
  stage: string;
}

export class CdkBaseStack extends cdk.Stack {
  private readonly vpc:ec2.Vpc;
  constructor(scope: cdk.Construct, id: string, props?: CdkBaseStackProps) {
    super(scope, id, props);

    // create a VPC with no private subnets. 
    // this is for our demo purpose as this will be cheaper since you do not need a nat gateway
    const vpc = new ec2.Vpc(this, `VPC-${props?.stage}`, {
      natGateways:0,
      maxAzs: 2,
    });    

    this.vpc = vpc;
  }
  get stackVpc() : ec2.Vpc{
    return this.vpc;
  }  
}
