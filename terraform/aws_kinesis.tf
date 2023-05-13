resource "aws_kinesis_firehose_delivery_stream" "rails_react_v4" {
  name        ="rails-react-v4-1"
  destination = "s3"

  s3_configuration {
    role_arn   = module.kinesis_data_firehose_role.iam_role_arn
    bucket_arn = aws_s3_bucket.cloudwatch_logs.arn
    prefix     = "ecs-scheduled-tasks/rails_react_v4/"
  }
}
