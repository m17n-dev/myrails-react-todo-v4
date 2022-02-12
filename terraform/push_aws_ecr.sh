#!/bin/sh

REPOSITORY_API=rails-api-v4
API_TAG=1.0
REPOSITORY_REACT=front-react-v4
REACT_TAG=1.0

aws --version
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo $AWS_ACCOUNT_ID
aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com

aws ecr create-repository \
    --repository-name $REPOSITORY_API \
    --image-scanning-configuration scanOnPush=false \
    --region $AWS_DEFAULT_REGION

aws ecr create-repository \
    --repository-name $REPOSITORY_REACT \
    --image-scanning-configuration scanOnPush=false \
    --region $AWS_DEFAULT_REGION

docker tag $REPOSITORY_API:$API_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$REPOSITORY_API:$API_TAG
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$REPOSITORY_API:$API_TAG

docker tag $REPOSITORY_REACT:$REACT_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$REPOSITORY_REACT:$REACT_TAG
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$REPOSITORY_REACT:$REACT_TAG