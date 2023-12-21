resource "aws_mq_broker" "flexio_rabbitmq_broker" {
  broker_name        = "flexio_rabbitmq_broker"
  engine_type        = "RabbitMQ"
  engine_version     = "3.11.20"
  deployment_mode    = "SINGLE_INSTANCE"
  host_instance_type = "mq.m5.large"
  subnet_ids         = [aws_default_subnet.default_subnet_a.id, aws_default_subnet.default_subnet_b.id, aws_default_subnet.default_subnet_c.id]
  security_groups    = [aws_security_group.flexio_rabbitmq_sg.id]

  user {
    username = "flexio"
    password = "c4a7qB3Xn3Gu"
  }
}
