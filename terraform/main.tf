terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

# ---------------------------------------------------------
# 1. NETWORKING (VPC & Security Group)
# ---------------------------------------------------------

resource "aws_default_vpc" "default" {
  tags = {
    Name = "Default VPC"
  }
}

resource "aws_security_group" "k8s_sg" {
  name        = "k8s_security_group"
  description = "Allow SSH, HTTP, and Kubernetes API"
  vpc_id      = aws_default_vpc.default.id

  # SSH Access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP Access (Frontend)
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Backend API Access
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Kubernetes NodePort Range (Optional)
  ingress {
    from_port   = 30000
    to_port     = 32767
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ---------------------------------------------------------
# 2. COMPUTING (EC2 Instance for connection)
# ---------------------------------------------------------
# Note: For a real K8s cluster, we would use 'aws_eks_cluster'
# But for a student project/demo, a single EC2 running Minikube 
# is cheaper and easier to manage.

resource "aws_instance" "devops_server" {
  ami           = "ami-0c7217cdde317cfec" # Ubuntu 22.04 LTS (us-east-1)
  instance_type = "t2.medium"             # Minimum for K8s (2 vCPU, 4GB RAM)
  key_name      = "my-key-pair"           # CHANGE THIS to your AWS Key Pair name

  security_groups = [aws_security_group.k8s_sg.name]

  tags = {
    Name = "MERN-DevOps-Server"
  }

  user_data = <<-EOF
              #!/bin/bash
              sudo apt update -y
              sudo apt install docker.io -y
              sudo usermod -aG docker ubuntu
              EOF
}

output "server_public_ip" {
  value = aws_instance.devops_server.public_ip
}
