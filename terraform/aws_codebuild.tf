resource "aws_codebuild_project" "rails_react_v4" {
  name         ="rails-react-v4"
  service_role = module.codebuild_role.iam_role_arn

  source {
    type      = "CODEPIPELINE"
    location  = "myrails-react-todo-v4"
    buildspec = "buildspec.yml"
  }

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    type            = "LINUX_CONTAINER"
    compute_type    = "BUILD_GENERAL1_SMALL"
    image           = "aws/codebuild/amazonlinux2-x86_64-standard:3.0"
    privileged_mode = true
  }

  vpc_config {
    vpc_id = aws_vpc.rails_react_v4.id

    subnets = [
      aws_subnet.private_0.id,
      aws_subnet.private_1.id,
    ]

    security_group_ids = [module.mysql_sg.security_group_id]
  }
}
