resource "aws_cloudwatch_log_group" "for_ecs" {
  name              = "/ecs/rails_react_v4"
  retention_in_days = 180
}

resource "aws_cloudwatch_log_group" "for_ecs_scheduled_tasks" {
  name              = "/ecs-scheduled-tasks/rails_react_v4"
  retention_in_days = 180
}

resource "aws_cloudwatch_event_rule" "rails_react_v4_batch" {
  name                ="rails-react-v4-batch"
  description         = "とても重要なバッチ処理です"
  schedule_expression = "cron(*/2 * * * ? *)"
}

resource "aws_cloudwatch_event_target" "rails_react_v4_batch" {
  target_id ="rails-react-v4-batch"
  rule      = aws_cloudwatch_event_rule.rails_react_v4_batch.name
  role_arn  = module.ecs_events_role.iam_role_arn
  arn       = aws_ecs_cluster.rails_react_v4.arn

  ecs_target {
    launch_type         = "FARGATE"
    task_count          = 1
    platform_version    = "1.4.0"
    task_definition_arn = aws_ecs_task_definition.rails_react_v4_batch.arn

    network_configuration {
      assign_public_ip = "false"
      subnets          = [aws_subnet.private_2.id]
    }
  }
}

resource "aws_cloudwatch_log_group" "operation_rails_react_v4" {
  name              = "/operation/rails/react/v4"
  retention_in_days = 180
}

resource "aws_cloudwatch_log_subscription_filter" "rails_react_v4" {
  name            ="rails-react-v4"
  log_group_name  = aws_cloudwatch_log_group.for_ecs_scheduled_tasks.name
  destination_arn = aws_kinesis_firehose_delivery_stream.rails_react_v4.arn
  filter_pattern  = "[]"
  role_arn        = module.cloudwatch_logs_role.iam_role_arn
}
