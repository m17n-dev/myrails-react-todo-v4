resource "aws_kms_key" "rails_react_v4" {
  description             = "Rails_react_v4 Customer Master Key"
  enable_key_rotation     = true
  #is_enabled              = true
  #deletion_window_in_days = 30
}

#p91 11.2
resource "aws_kms_alias" "rails_react_v4" {
  name          = "alias/rails_react_v4"
  target_key_id = aws_kms_key.rails_react_v4.key_id
}
