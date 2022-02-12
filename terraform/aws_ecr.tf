resource "aws_ecr_repository" "rails_api" {
  name = "rails-api-v4"
}

resource "aws_ecr_lifecycle_policy" "rails_api" {
  repository = aws_ecr_repository.rails_api.name

  policy = <<EOF
  {
    "rules": [
      {
        "rulePriority": 1,
        "description": "Keep last 30 release tagged images",
        "selection": {
          "tagStatus": "tagged",
          "tagPrefixList": ["release"],
          "countType": "imageCountMoreThan",
          "countNumber": 30
        },
        "action": {
          "type": "expire"
        }
      }
    ]
  }
EOF
}

resource "aws_ecr_repository" "front_react" {
  name = "front-react-v4"
}

resource "aws_ecr_lifecycle_policy" "front_react" {
  repository = aws_ecr_repository.front_react.name

  policy = <<EOF
  {
    "rules": [
      {
        "rulePriority": 1,
        "description": "Keep last 30 release tagged images",
        "selection": {
          "tagStatus": "tagged",
          "tagPrefixList": ["release"],
          "countType": "imageCountMoreThan",
          "countNumber": 30
        },
        "action": {
          "type": "expire"
        }
      }
    ]
  }
EOF
}