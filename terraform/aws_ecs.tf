resource "aws_ecs_cluster" "rails_react_v4" {
  name ="rails-react-v4"
}

resource "aws_ecs_service" "front_react" {
  name                              = "front-react-v4"
  cluster                           = aws_ecs_cluster.rails_react_v4.arn
  task_definition                   = aws_ecs_task_definition.front_react.arn
  desired_count                     = 2
  launch_type                       = "FARGATE"
  platform_version                  = "1.4.0"
  health_check_grace_period_seconds = 60

  network_configuration {
    assign_public_ip = false
    security_groups  = [module.ecs_front_react_sg.security_group_id]

    subnets = [
      aws_subnet.private_2.id,
      aws_subnet.private_3.id,
    ]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.front_react.arn
    container_name   ="front-react-v4"
    container_port   = 80
  }

  lifecycle {
    ignore_changes = [task_definition]
  }
}


resource "aws_ecs_service" "rails_api" {
  name                              = "rails-api-v4"
  cluster                           = aws_ecs_cluster.rails_react_v4.arn
  task_definition                   = aws_ecs_task_definition.rails_api.arn
  desired_count                     = 2
  launch_type                       = "FARGATE"
  platform_version                  = "1.4.0"
  health_check_grace_period_seconds = 60

  network_configuration {
    assign_public_ip = false
    security_groups  = [module.ecs_rails_api_sg.security_group_id]

    subnets = [
      aws_subnet.private_0.id,
      aws_subnet.private_1.id,
    ]
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.rails_api.arn
    container_name   ="rails-api-v4"
    container_port   = 3000
  }

  lifecycle {
    ignore_changes = [task_definition]
  }
}

module "ecs_front_react_sg" {
  source      = "./modules/security_group"
  name        = "ecs-front-react-sg"
  vpc_id      = aws_vpc.rails_react_v4.id
  port        = 80
  cidr_blocks = [aws_vpc.rails_react_v4.cidr_block]
}

module "ecs_rails_api_sg" {
  source      = "./modules/security_group"
  name        = "ecs-rails-api-sg"
  vpc_id      = aws_vpc.rails_react_v4.id
  port        = 3000
  cidr_blocks = [aws_vpc.rails_react_v4.cidr_block]
}

resource "aws_ecs_task_definition" "front_react" {
  family                   = "front-react-v4"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  container_definitions    = file("./front_react_container_definitions.json")
  execution_role_arn       = module.ecs_task_execution_role.iam_role_arn
}

resource "aws_ecs_task_definition" "rails_api" {
  family                   = "rails-api-v4"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  container_definitions    = file("./rails_api_container_definitions.json")
  execution_role_arn       = module.ecs_task_execution_role.iam_role_arn
}

resource "aws_ecs_task_definition" "rails_react_v4_batch" {
  family                   ="rails-react-v4-batch"
  cpu                      = "256"
  memory                   = "512"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  container_definitions    = file("./batch_container_definitions.json")
  execution_role_arn       = module.ecs_task_execution_role.iam_role_arn
}

