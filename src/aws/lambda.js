import AWS from 'aws-sdk'; 

const TRANSCRIBE_LAMBDA_NAME = "arn:aws:lambda:us-east-1:236272758067:function:YoutubeTranscript"


export class LambdaClient {
    constructor(props) {
        this.lambda = this.createClient()
    }
    createClient() {
        return new AWS.Lambda({
            credentials: {  
              accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
            },
            region: "us-east-1"
          }
        )
    }

    invoke(url, fun) {
        this.lambda.invoke( 
            {
              FunctionName: TRANSCRIBE_LAMBDA_NAME,
              Payload: JSON.stringify({ url: url })
            },
            fun 
        );
    }
}