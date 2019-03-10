const options = {};

if (process.env.NODE_ENV === 'development') {
    options.region = 'us-east-1';
    options.endpoint = 'http://localhost:8000';
}

export default options;
