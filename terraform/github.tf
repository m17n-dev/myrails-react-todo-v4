provider "github" {
  owner = "m17n-dev"
}

resource "github_repository_webhook" "rails_api" {
  repository = "myrails-react-todo-v4"

  configuration {
    url          = aws_codepipeline_webhook.rails_api.url
    secret       = "VeryRandomStringMoreThan20Byte!"
    content_type = "json"
    insecure_ssl = false
  }

  events = ["push"]
}

resource "github_repository_webhook" "front_react" {
  repository = "myrails-react-todo-v4"

  configuration {
    url          = aws_codepipeline_webhook.front_react.url
    secret       = "VeryRandomStringMoreThan20Byte!"
    content_type = "json"
    insecure_ssl = false
  }

  events = ["push"]
}
