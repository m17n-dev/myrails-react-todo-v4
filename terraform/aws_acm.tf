resource "aws_acm_certificate" "front_react" {
  domain_name               = aws_route53_record.front_react.name
  subject_alternative_names = []
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "front_react" {
  certificate_arn         = aws_acm_certificate.front_react.arn
  validation_record_fqdns = [aws_route53_record.front_react_certificate.fqdn]
}

resource "aws_acm_certificate" "rails_api" {
  domain_name               = aws_route53_record.rails_api.name
  subject_alternative_names = []
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "rails_api" {
  certificate_arn         = aws_acm_certificate.rails_api.arn
  validation_record_fqdns = [aws_route53_record.rails_api_certificate.fqdn]
}