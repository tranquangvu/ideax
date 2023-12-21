resource "aws_ecs_cluster" "flexio_cluster" {
  name = "flexio_cluster"
}

resource "aws_ecs_task_definition" "flexio_vrp_task" {
  family                   = "flexio_vrp_ecs_task_definition"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 512
  memory                   = 1024
  task_role_arn            = aws_iam_role.ecs_task_iam_role.arn
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  container_definitions    = <<DEFINITION
  [
    {
      "name": "flexio_vrp_ecs_task",
      "image": "${aws_ecr_repository.flexio_vrp_ecr_repo.repository_url}:latest",
      "cpu": 512,
      "memory": 1024,
      "essential": true,
      "environment": [
        {
          "name": "PORT",
          "value": 8088
        },
        {
          "name": "RABBITMQ_HOST",
          "value": "${split(":", replace(aws_mq_broker.flexio_rabbitmq_broker.instances.0.endpoints.0, "amqps://", ""))[1]}"
        },
        {
          "name": "RABBITMQ_PORT",
          "value": "5672"
        },
        {
          "name": "RABBITMQ_USERNAME",
          "value": "flexio"
        },
        {
          "name": "RABBITMQ_PASSWORD",
          "value": "c4a7qB3Xn3Gu"
        },
      ],
      "portMappings": [
        {
          "containerPort": 8088,
          "hostPort": 8088
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "${aws_cloudwatch_log_group.flexio_vrp_log_group.name}",
          "awslogs-region": "${var.aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
      },
    }
  ]
  DEFINITION
}

resource "aws_ecs_service" "flexio_vrp_service" {
  name            = "flexio_vrp_service"
  cluster         = aws_ecs_cluster.flexio_cluster.id
  task_definition = aws_ecs_task_definition.flexio_vrp_task.arn
  launch_type     = "FARGATE"
  desired_count   = 2

  load_balancer {
    target_group_arn = aws_lb_target_group.flexio_vrp_tg.arn
    container_name   = aws_ecs_task_definition.flexio_vrp_task.family
    container_port   = 8088
  }

  network_configuration {
    subnets          = [aws_default_subnet.default_subnet_a.id, aws_default_subnet.default_subnet_b.id, aws_default_subnet.default_subnet_c.id]
    security_groups  = [aws_security_group.flexio_vrp_ecs_sg.id]
    assign_public_ip = true
  }

  ordered_placement_strategy {
    type  = "spread"
    field = "attribute:ecs.availability-zone"
  }

  lifecycle {
    ignore_changes = [desired_count]
  }
}
