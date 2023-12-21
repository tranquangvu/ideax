resource "aws_cloudwatch_log_group" "flexio_vrp_log_group" {
  name              = "/ecs/flexio/vrp"
  retention_in_days = 3
}
