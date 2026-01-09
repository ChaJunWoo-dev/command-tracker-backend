const config = {
  port: process.env.PORT || 8000,
  node_env: process.env.NODE_ENV || "development",
  API_PREFIX: process.env.API_PREFIX || "/api",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  rabbitmqUrl: process.env.RABBITMQ_URL,
  email_user: process.env.EMAIL_USER,
  email_pass: process.env.EMAIL_PASS,
};

export default config;
