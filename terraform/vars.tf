# Provider
variable "aws_region" {
  type = string
  default = "eu-north-1"
  description = "AWS region"
}

variable "aws_profile" {
  type = string
  default = "flexio"
  description = "AWS profile"
}

# Networking
variable "availability_zones" {
  type = list(string)
  description = "List of availability zones"
  default = ["eu-north-1a", "eu-north-1b", "eu-north-1c"]
}
