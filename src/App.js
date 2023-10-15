import React, { useState } from 'react';
import AWS from 'aws-sdk'; 
import { LambdaClient } from './aws/lambda.js'

const OutputStatus = {
  Loading: 'loading',
  Answered: 'answered',
  Empty: ''
}


function App() {
  const [url, setUrl] = useState('');
  const [answer, setAnswer] = useState('')
  const [status, setStatus] = useState(OutputStatus.Empty)

  const handleButtonClick = () => {
    setStatus(OutputStatus.Empty);
    setUrl('');
    invokeTranscriptionLambda();
  };

  const invokeTranscriptionLambda = () => {
    setStatus(OutputStatus.Loading)

    new LambdaClient().invoke(
      JSON.stringify({ url: url }),
      function(err, data) {
        if (err) console.log(err, err.stack);
        else {
          setAnswer(
            JSON.parse(data.Payload).body, 
          )
          setStatus(OutputStatus.Answered);
        };          
      }
    )
  };

  return (
    <div className="App">
        <h1> Ai Tools </h1>
        <h2> YouTube transcriber </h2>
        <div>
          <p> https://www.youtube.com/watch?v=cPJKOwj4_x8 </p>
          <input 
            type="text" 
            value={url} 
            onChange={e => setUrl(e.target.value)} 
          />
          <button onClick={handleButtonClick}>
            Transcribe
          </button>
          {status == OutputStatus.Loading ? <p> generating transcript ... </p> : <></>}
          {status == OutputStatus.Answered ? <p>{answer}</p> : <></>}
        </div>
    </div>
  );
}

export default App;
