resource "aws_lb" "flexio_vrp_alb" {
  name               = "flexio_vrp_alb"
  internal           = false
  load_balancer_type = "application"
  subnets            = [aws_default_subnet.default_subnet_a.id, aws_default_subnet.default_subnet_b.id, aws_default_subnet.default_subnet_c.id]
  security_groups    = [aws_security_group.flexio_vrp_alb_sg.id]
}

resource "aws_lb_target_group" "flexio_vrp_tg" {
  name                 = "flexio_vrp_tg"
  port                 = "80"
  protocol             = "HTTP"
  vpc_id               = aws_default_vpc.default.id
  deregistration_delay = 120

  health_check {
    healthy_threshold   = 5
    unhealthy_threshold = 5
    interval            = 60
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 30
  }

  depends_on = [aws_alb.flexio_vrp_alb]
}

resource "aws_lb_listener" "flexio_vrp_alb_listener" {
  load_balancer_arn = aws_lb.flexio_vrp_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.flexio_vrp_tg.arn
  }
}
