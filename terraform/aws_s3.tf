resource "aws_s3_bucket" "private" {
  bucket = "private-pragmatic-terraform-2023051301"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

resource "aws_s3_bucket_public_access_block" "private" {
  bucket                  = aws_s3_bucket.private.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# resource "aws_s3_bucket" "public" {
#   bucket = "public-pragmatic-terraform-2023051301"
#   acl    = "public-read"

#   cors_rule {
#     allowed_origins = ["https://m17n.dev"]
#     allowed_methods = ["GET"]
#     allowed_headers = ["*"]
#     max_age_seconds = 3000
#   }
# }

resource "aws_s3_bucket" "alb_front_react_log" {
  bucket = "alb-front-react-v4-log-pragmatic-terraform-2023051301"

  lifecycle_rule {
    enabled = true

    expiration {
      days = "180"
    }
  }
}

resource "aws_s3_bucket_policy" "alb_front_react_log" {
  bucket = aws_s3_bucket.alb_front_react_log.id
  policy = data.aws_iam_policy_document.alb_front_react_log.json
}

data "aws_iam_policy_document" "alb_front_react_log" {
  statement {
    effect    = "Allow"
    actions   = ["s3:PutObject"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.alb_front_react_log.id}/*"]

    principals {
      type        = "AWS"
      identifiers = ["582318560864"]
    }
  }
}

resource "aws_s3_bucket" "alb_rails_api_log" {
  bucket = "alb-rails-api-v4-log-pragmatic-terraform-2023051301"

  lifecycle_rule {
    enabled = true

    expiration {
      days = "180"
    }
  }
}

resource "aws_s3_bucket_policy" "alb_rails_api_log" {
  bucket = aws_s3_bucket.alb_rails_api_log.id
  policy = data.aws_iam_policy_document.alb_rails_api_log.json
}

data "aws_iam_policy_document" "alb_rails_api_log" {
  statement {
    effect    = "Allow"
    actions   = ["s3:PutObject"]
    resources = ["arn:aws:s3:::${aws_s3_bucket.alb_rails_api_log.id}/*"]

    principals {
      type        = "AWS"
      identifiers = ["582318560864"]
    }
  }
}

resource "aws_s3_bucket" "artifact" {
  bucket = "artifact-pragmatic-terraform-2023051301"

  lifecycle_rule {
    enabled = true

    expiration {
      days = "180"
    }
  }
}

resource "aws_s3_bucket" "operation" {
  bucket = "operation-pragmatic-terraform-2023051301"

  lifecycle_rule {
    enabled = true

    expiration {
      days = "180"
    }
  }
}

resource "aws_s3_bucket" "cloudwatch_logs" {
  bucket = "cloudwatch-logs-pragmatic-terraform-2023051301"

  lifecycle_rule {
    enabled = true

    expiration {
      days = "180"
    }
  }
}
