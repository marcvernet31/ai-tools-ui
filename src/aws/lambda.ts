import AWS from 'aws-sdk'; 

interface Credentials {
  accessKeyId: string,
  secretAccessKey: string,
  region?: string
}

interface LambdaProps {
  readonly functionName: string,
  readonly credentials: Credentials
}

class Lambda {
  constructor(props: LambdaProps) {
    this.functionName = props.functionName
    this.lambda = this.createClient(props.credentials)
  }

  private lambda: AWS.Lambda
  private functionName: string

  private createClient(credentials: Credentials): AWS.Lambda  {
    return new AWS.Lambda({
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      region: credentials.region || 'us-west-2'
    });
  }

  async invoke(payload: string) {
    // Payload format: JSON.stringify({ url: 'value1' })
    const params = {
      FunctionName: this.functionName, 
      Payload: payload
    };

    const response = await this.lambda.invoke(
      { FunctionName: this.functionName, Payload: payload }, 
      function(err, data) {
        if (err) console.log(err, err.stack); 
        else     console.log(data);           
      }
    ).promise()

    if (response.Payload) {
      return JSON.parse(response.Payload.toString());
    } else {
      return null;
    }
  }
}
