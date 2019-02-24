provider "aws" {
  profile = "express-aws-lambda"
  region = "ap-northeast-1"
}

provider "archive" {

}

data "archive_file" "lambda_kvsmanager" {
  type = "zip"
  output_path = "./files/lambda.zip"
  source_dir = "../kvsmanager"
  excludes = [
    "package-lock.json",
    "package.json"
  ]
}

data "aws_iam_role" "lambda" {
  name = "lambda-role"
}

resource "aws_lambda_function" "lambda_kvsmanager" {
  function_name = "kvsmanager"
  role = "${data.aws_iam_role.lambda.arn}"
  filename = "${data.archive_file.lambda_kvsmanager.output_path}"
  source_code_hash = "${data.archive_file.lambda_kvsmanager.output_base64sha256}"
  handler = "index.handler"
  runtime = "nodejs8.10"
}
