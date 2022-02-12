resource "aws_ssm_parameter" "rails_react_v4_production_database_name" {
  name        = "/rails/react/v4/production/database/name"
  value       = "appdb"
  type        = "String"
  description = "Database name created in RDS"

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "rails_react_v4_production_database_username" {
  name        = "/rails/react/v4/production/database/username"
  value       = "app"
  type        = "String"
  description = "Username defined in aws_db_instance"
}

resource "aws_ssm_parameter" "rails_react_v4_production_database_password" {
  name        = "/rails/react/v4/production/database/password"
  value       = "uninitialized"
  type        = "SecureString"
  description = "Password defined in aws_db_instance"

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "rails_react_v4_production_database_hostname" {
  name        = "/rails/react/v4/production/database/hostname"
  value       = "127.0.0.1"
  type        = "String"
  description = "AWS RDS Endpoint"

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "rails_react_v4_production_database_port" {
  name        = "/rails/react/v4/production/database/port"
  value       = "3306"
  type        = "String"
  description = "Port defined in aws_db_instance"
}

# Rails Environment Name
resource "aws_ssm_parameter" "rails_react_v4_rails_environment_name" {
  name        = "/rails/react/v4/rails/environment/name"
  value       = "production"
  type        = "String"
  description = "Environment name used in Rails"

  lifecycle {
    ignore_changes = [value]
  }
}

# Set Rails Log To Stdout
resource "aws_ssm_parameter" "rails_react_v4_rails_log_stdout" {
  name        = "/rails/react/v4/rails/log/stdout"
  value       = "1"
  type        = "String"
  description = "Set rails log to stdout"

  lifecycle {
    ignore_changes = [value]
  }
}

# DockerHub Username
resource "aws_ssm_parameter" "rails_react_v4_codebuild_docker_login_user" {
  name        = "/rails/react/v4/CodeBuild/dockerLoginUser"
  value       = "m17ndev"
  type        = "String"
  description = "DockerHub login user used in CodeBuild"
}

# DockerHub Access Token
resource "aws_ssm_parameter" "rails_react_v4_codebuild_docker_access_token" {
  name        = "/rails/react/v4/CodeBuild/dockerAccessToken"
  value       = "uninitialized"
  type        = "SecureString"
  description = "DockerHub access token used in CodeBuild"

  lifecycle {
    ignore_changes = [value]
  }
}

resource "aws_ssm_parameter" "rails_react_v4_production_action_mailer_smtp_settings_address" {
  name        = "/rails/react/v4/production/actionMailer/smtpSettings/address"
  value       = "smtp.gmail.com"
  type        = "String"
  description = "rails action_mailer smtp_settings address"
}

resource "aws_ssm_parameter" "rails_react_v4_production_action_mailer_smtp_settings_port" {
  name        = "/rails/react/v4/production/actionMailer/smtpSettings/port"
  value       = "587"
  type        = "String"
  description = "rails action_mailer smtp_settings port"
}

resource "aws_ssm_parameter" "rails_react_v4_production_action_mailer_smtp_settings_user_name" {
  name        = "/rails/react/v4/production/actionMailer/smtpSettings/userName"
  value       = "m17n.dev@gmail.com"
  type        = "String"
  description = "rails action_mailer smtp_settings user_name"
}

resource "aws_ssm_parameter" "rails_react_v4_production_action_mailer_smtp_settings_password" {
  name        = "/rails/react/v4/production/actionMailer/smtpSettings/password"
  value       = "uninitialized"
  type        = "SecureString"
  description = "rails action_mailer smtp_settings password"
}

resource "aws_ssm_parameter" "rails_react_v4_development_front_domain" {
  name        = "/rails/react/v4/development/front/domain"
  value       = "localhost:3001"
  type        = "String"
  description = "development mode front domain"
}

resource "aws_ssm_parameter" "rails_react_v4_development_api_domain" {
  name        = "/rails/react/v4/development/api/domain"
  value       = "localhost:3000"
  type        = "String"
  description = "development mode api domain"
}

resource "aws_ssm_parameter" "rails_react_v4_production_front_domain" {
  name        = "/rails/react/v4/production/front/domain"
  value       = "m17n.dev"
  type        = "String"
  description = "production mode front domain"
}

resource "aws_ssm_parameter" "rails_react_v4_production_api_domain" {
  name        = "/rails/react/v4/production/api/domain"
  value       = "schoolmail.jp"
  type        = "String"
  description = "production mode api domain"
}

