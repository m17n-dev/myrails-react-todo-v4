resource "aws_vpc" "rails_react_v4" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name ="rails-react-v4"
  }
}

resource "aws_internet_gateway" "rails_react_v4" {
  vpc_id = aws_vpc.rails_react_v4.id

  tags = {
    Name = "rails_react_v4"
  }
}

resource "aws_route_table" "public_frontend" {
  vpc_id = aws_vpc.rails_react_v4.id

  tags = {
    Name = "public_frontend"
  }
}

resource "aws_route_table" "public_backend" {
  vpc_id = aws_vpc.rails_react_v4.id

  tags = {
    Name = "public_backend"
  }
}

resource "aws_route" "rails_react_v4_frontend" {
  route_table_id         = aws_route_table.public_frontend.id
  gateway_id             = aws_internet_gateway.rails_react_v4.id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_route" "rails_react_v4_backtend" {
  route_table_id         = aws_route_table.public_backend.id
  gateway_id             = aws_internet_gateway.rails_react_v4.id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_subnet" "public_0" {
  vpc_id                  = aws_vpc.rails_react_v4.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.rails_react_v4.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.rails_react_v4.id
  cidr_block              = "10.0.3.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public_3" {
  vpc_id                  = aws_vpc.rails_react_v4.id
  cidr_block              = "10.0.4.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = true
}

resource "aws_route_table_association" "public_0" {
  subnet_id      = aws_subnet.public_0.id
  route_table_id = aws_route_table.public_frontend.id
}

resource "aws_route_table_association" "public_1" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = aws_route_table.public_frontend.id
}

resource "aws_route_table_association" "public_2" {
  subnet_id      = aws_subnet.public_2.id
  route_table_id = aws_route_table.public_backend.id
}

resource "aws_route_table_association" "public_3" {
  subnet_id      = aws_subnet.public_3.id
  route_table_id = aws_route_table.public_backend.id
}

resource "aws_subnet" "private_0" {
  vpc_id                  = aws_vpc.rails_react_v4.id
  cidr_block              = "10.0.65.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = false
}

resource "aws_subnet" "private_1" {
  vpc_id                  = aws_vpc.rails_react_v4.id
  cidr_block              = "10.0.66.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = false
}

resource "aws_subnet" "private_2" {
  vpc_id                  = aws_vpc.rails_react_v4.id
  cidr_block              = "10.0.67.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = false
}

resource "aws_subnet" "private_3" {
  vpc_id                  = aws_vpc.rails_react_v4.id
  cidr_block              = "10.0.68.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = false
}

resource "aws_eip" "nat_gateway_a" {
  vpc        = true
  depends_on = [aws_internet_gateway.rails_react_v4]
}

resource "aws_eip" "nat_gateway_b" {
  vpc        = true
  depends_on = [aws_internet_gateway.rails_react_v4]
}

resource "aws_eip" "nat_gateway_c" {
  vpc        = true
  depends_on = [aws_internet_gateway.rails_react_v4]
}

resource "aws_eip" "nat_gateway_d" {
  vpc        = true
  depends_on = [aws_internet_gateway.rails_react_v4]
}

resource "aws_nat_gateway" "nat_gateway_a" {
  allocation_id = aws_eip.nat_gateway_a.id
  subnet_id     = aws_subnet.public_0.id
  depends_on    = [aws_internet_gateway.rails_react_v4]
}

resource "aws_nat_gateway" "nat_gateway_b" {
  allocation_id = aws_eip.nat_gateway_b.id
  subnet_id     = aws_subnet.public_1.id
  depends_on    = [aws_internet_gateway.rails_react_v4]
}
resource "aws_nat_gateway" "nat_gateway_c" {
  allocation_id = aws_eip.nat_gateway_c.id
  subnet_id     = aws_subnet.public_2.id
  depends_on    = [aws_internet_gateway.rails_react_v4]
}

resource "aws_nat_gateway" "nat_gateway_d" {
  allocation_id = aws_eip.nat_gateway_d.id
  subnet_id     = aws_subnet.public_3.id
  depends_on    = [aws_internet_gateway.rails_react_v4]
}

resource "aws_route_table" "private_0" {
  vpc_id = aws_vpc.rails_react_v4.id
}

resource "aws_route_table" "private_1" {
  vpc_id = aws_vpc.rails_react_v4.id
}

resource "aws_route_table" "private_2" {
  vpc_id = aws_vpc.rails_react_v4.id
}

resource "aws_route_table" "private_3" {
  vpc_id = aws_vpc.rails_react_v4.id
}

resource "aws_route" "private_0" {
  route_table_id         = aws_route_table.private_0.id
  nat_gateway_id         = aws_nat_gateway.nat_gateway_a.id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_route" "private_1" {
  route_table_id         = aws_route_table.private_1.id
  nat_gateway_id         = aws_nat_gateway.nat_gateway_b.id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_route" "private_2" {
  route_table_id         = aws_route_table.private_2.id
  nat_gateway_id         = aws_nat_gateway.nat_gateway_c.id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_route" "private_3" {
  route_table_id         = aws_route_table.private_3.id
  nat_gateway_id         = aws_nat_gateway.nat_gateway_d.id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_route_table_association" "private_0" {
  subnet_id      = aws_subnet.private_0.id
  route_table_id = aws_route_table.private_0.id
}

resource "aws_route_table_association" "private_1" {
  subnet_id      = aws_subnet.private_1.id
  route_table_id = aws_route_table.private_1.id
}

resource "aws_route_table_association" "private_2" {
  subnet_id      = aws_subnet.private_2.id
  route_table_id = aws_route_table.private_2.id
}

resource "aws_route_table_association" "private_3" {
  subnet_id      = aws_subnet.private_3.id
  route_table_id = aws_route_table.private_3.id
}