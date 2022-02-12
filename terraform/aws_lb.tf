resource "aws_lb" "front_react" {
  name                       = "front-react-v4"
  load_balancer_type         = "application"
  internal                   = false
  idle_timeout               = 60
  enable_deletion_protection = true

  subnets = [
    aws_subnet.public_0.id,
    aws_subnet.public_1.id,
  ]

  access_logs {
    bucket  = aws_s3_bucket.alb_front_react_log.id
    enabled = true
  }

  security_groups = [
    module.http_sg.security_group_id,
    module.https_sg.security_group_id,
    module.http_redirect_sg.security_group_id,
  ]
}

output "dns_name_front_react" {
  value = aws_lb.front_react.dns_name
}

resource "aws_lb" "rails_api" {
  name                       = "rails-api-v4"
  load_balancer_type         = "application"
  internal                   = false
  idle_timeout               = 60
  enable_deletion_protection = true

  subnets = [
    aws_subnet.public_2.id,
    aws_subnet.public_3.id,
  ]

  access_logs {
    bucket  = aws_s3_bucket.alb_rails_api_log.id
    enabled = true
  }

  security_groups = [
    module.http_sg.security_group_id,
    module.https_sg.security_group_id,
    module.http_redirect_sg.security_group_id,
  ]
}

output "dns_name_rails_api" {
  value = aws_lb.rails_api.dns_name
}

module "http_sg" {
  source      = "./modules/security_group"
  name        = "http-sg"
  vpc_id      = aws_vpc.rails_react_v4.id
  port        = 80
  cidr_blocks = ["0.0.0.0/0"]
}

module "https_sg" {
  source      = "./modules/security_group"
  name        = "https-sg"
  vpc_id      = aws_vpc.rails_react_v4.id
  port        = 443
  cidr_blocks = ["0.0.0.0/0"]
}

module "http_redirect_sg" {
  source      = "./modules/security_group"
  name        = "http-redirect-sg"
  vpc_id      = aws_vpc.rails_react_v4.id
  port        = 8080
  cidr_blocks = ["0.0.0.0/0"]
}

resource "aws_lb_listener" "http_front_react" {
  load_balancer_arn = aws_lb.front_react.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https_front_react" {
  load_balancer_arn = aws_lb.front_react.arn
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate.front_react.arn
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "This is HTTPS"
      status_code  = "200"
    }
  }
}

resource "aws_lb_listener" "redirect_http_to_https_front_react" {
  load_balancer_arn = aws_lb.front_react.arn
  port              = "8080"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "http_rails_api" {
  load_balancer_arn = aws_lb.rails_api.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https_rails_api" {
  load_balancer_arn = aws_lb.rails_api.arn
  port              = "443"
  protocol          = "HTTPS"
  certificate_arn   = aws_acm_certificate.rails_api.arn
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  default_action {
    type = "fixed-response"

    fixed_response {
      content_type = "text/plain"
      message_body = "This is HTTPS"
      status_code  = "200"
    }
  }
}

resource "aws_lb_listener" "redirect_http_to_https_rails_api" {
  load_balancer_arn = aws_lb.rails_api.arn
  port              = "8080"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_target_group" "front_react" {
  name                 ="front-react-v4"
  target_type          = "ip"
  vpc_id               = aws_vpc.rails_react_v4.id
  port                 = 80
  protocol             = "HTTP"
  deregistration_delay = 300

  health_check {
    enabled             = true
    path                = "/health"
    healthy_threshold   = 5
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 60
    matcher             = 200
    port                = "traffic-port"
    protocol            = "HTTP"
  }

  depends_on = [aws_lb.front_react]
}

resource "aws_lb_target_group" "rails_api" {
  name                 ="rails-api-v4"
  target_type          = "ip"
  vpc_id               = aws_vpc.rails_react_v4.id
  port                 = 80
  protocol             = "HTTP"
  deregistration_delay = 300

  health_check {
    enabled             = true
    path                = "/api/v4/health_check"
    healthy_threshold   = 5
    unhealthy_threshold = 2
    timeout             = 50
    interval            = 60
    matcher             = 200  
    port                = "3000"
    protocol            = "HTTP"
  }

  depends_on = [aws_lb.rails_api]
}

resource "aws_lb_listener_rule" "front_react" {
  listener_arn = aws_lb_listener.https_front_react.arn
  priority     = 90

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.front_react.arn
  }

  condition {
    field  = "path-pattern"
    values = ["/*"]
  }
}

resource "aws_lb_listener_rule" "rails_api" {
  listener_arn = aws_lb_listener.https_rails_api.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.rails_api.arn
  }

  condition {
    field  = "path-pattern"
    values = ["/*"]
  }
}