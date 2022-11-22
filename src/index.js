const mongoose = require('mongoose');
const { app, http } = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const AWS = require('aws-sdk');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server = http.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
  const credentials = {
    accessKeyId: config.s3.bucket.accessKey,
    secretAccessKey: config.s3.bucket.privateKey,
  };
  // const s3 = new AWS.S3({ credentials, region: config.s3.bucket.region });

  // s3.headBucket(
  //   {
  //     Bucket: config.s3.bucket.name,
  //   },
  //   function (err, data) {
  //     if (err) {
  //       logger.error('Unable to connect to S3 bucket => ' + err);
  //     } else {
  //       logger.info('Connected to S3');
  //     }
  //   }
  // );
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
