#p43 5.7 IAM role module definition
variable "name" {}
variable "policy" {}
variable "identifier" {}

#p42 IAM role definition
resource "aws_iam_role" "default_rails_react_v4" {
  name               = var.name
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

#p41 5.4 Trust policy definition
data "aws_iam_policy_document" "assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = [var.identifier]
    }
  }
}

#p41 5.3 IAM policy definition
resource "aws_iam_policy" "default_rails_react_v4" {
  name   = var.name
  policy = var.policy
}

#p42 5.6 IAM policy attachment
resource "aws_iam_role_policy_attachment" "default_rails_react_v4" {
  role       = aws_iam_role.default_rails_react_v4.name
  policy_arn = aws_iam_policy.default_rails_react_v4.arn
}

output "iam_role_arn" {
  value = aws_iam_role.default_rails_react_v4.arn
}

output "iam_role_name" {
  value = aws_iam_role.default_rails_react_v4.name
}
