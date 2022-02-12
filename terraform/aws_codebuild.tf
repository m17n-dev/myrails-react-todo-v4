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
}
