resource "aws_route53_zone" "front_react" {
  name = "m17n.dev"
}

resource "aws_route53_record" "front_react" {
  zone_id = aws_route53_zone.front_react.zone_id
  name    = aws_route53_zone.front_react.name
  type    = "A"

  alias {
    name                   = aws_lb.front_react.dns_name
    zone_id                = aws_lb.front_react.zone_id
    evaluate_target_health = true
  }
}

output "domain_name_front_react" {
  value = aws_route53_record.front_react.name
}

resource "aws_route53_record" "front_react_certificate" {
  name    = aws_acm_certificate.front_react.domain_validation_options[0].resource_record_name
  type    = aws_acm_certificate.front_react.domain_validation_options[0].resource_record_type
  records = [aws_acm_certificate.front_react.domain_validation_options[0].resource_record_value]
  zone_id = aws_route53_zone.front_react.id
  ttl     = 60
}

resource "aws_route53_zone" "rails_api" {
  name = "schoolmail.jp"
}

resource "aws_route53_record" "rails_api" {
  zone_id = aws_route53_zone.rails_api.zone_id
  name    = aws_route53_zone.rails_api.name
  type    = "A"

  alias {
    name                   = aws_lb.rails_api.dns_name
    zone_id                = aws_lb.rails_api.zone_id
    evaluate_target_health = true
  }
}

output "domain_name_rails_api" {
  value = aws_route53_record.rails_api.name
}

resource "aws_route53_record" "rails_api_certificate" {
  name    = aws_acm_certificate.rails_api.domain_validation_options[0].resource_record_name
  type    = aws_acm_certificate.rails_api.domain_validation_options[0].resource_record_type
  records = [aws_acm_certificate.rails_api.domain_validation_options[0].resource_record_value]
  zone_id = aws_route53_zone.rails_api.id
  ttl     = 60
}
