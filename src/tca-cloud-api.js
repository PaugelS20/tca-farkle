import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

export const saveGameToCloud = async (email, appName, timestamp, gameResult) => {

    const dynamoGame = {
      pk: email
      , sk: `${appName}#${timestamp}`
  
      , ts: timestamp
      , user: email
      , app: appName
  
      , gsi1pk: appName
      , gsi1sk: timestamp
  
      , game: gameResult
    };
  
    console.log("Unmarshalled Game", dynamoGame);

    const marshalledGame = marshall(
      dynamoGame
      , {
        removeUndefinedValues: true
        , convertClassInstanceToMap: true
      }
    );
  
    console.log("MarshalledGame", marshalledGame);
  
    const options = {
      method: 'POST',
      body: JSON.stringify({
        TableName: "tca-data",
        Item: marshalledGame
      })  
    };
  
    await fetch(
      "https://32wop75hhc.execute-api.us-east-1.amazonaws.com/prod/data"
      , options 
    );
  };
  
  export const loadGamesFromCloud = async (email, appName) => {
      
    const url = `https://32wop75hhc.execute-api.us-east-1.amazonaws.com/prod/data/?user=${email}&game=${appName}`;
    
    console.log("url", url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log("Marshalled Response", data);
    
    const unmarshalledData = data.Items.map(x => unmarshall(x, {convertEmptyValues: true}));
    
    console.log("Unarshalled Response", unmarshalledData);

    const gameResults = unmarshalledData.map(x => x.game);
    return gameResults;    
  };
  
  