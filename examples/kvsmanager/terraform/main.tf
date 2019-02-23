provider "aws" {
  profile = "express-aws-lambda"
}

provider "archive" {

}

data "archive_file" "lambda" {
  type = "zip"
  output_path = "./files/lambda.zip"
  
  source {
    content = "../package.json"
    filename = "package.json"
  }

  source {
    content = "../index.js"
    filename = "index.js"
  }

  source {
    content = "../server/hello_world.js"
    filename = "server/hello_world.js"
  }
}

