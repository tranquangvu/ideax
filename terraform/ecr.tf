resource "aws_ecr_repository" "flexio_vrp_ecr_repo" {
  name = "flexio_vrp"
}

resource "aws_ecr_lifecycle_policy" "flexio_vrp_ecr_lifecycle_policy" {
  repository = aws_ecr_repository.flexio_vrp_ecr_repo.name
  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Keep last 5 images",
            "selection": {
                "tagStatus": "any",
                "countType": "imageCountMoreThan",
                "countNumber": 5
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
