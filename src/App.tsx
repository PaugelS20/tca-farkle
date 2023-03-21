import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter, IonReactHashRouter } from '@ionic/react-router';
import { Home, Setup, Play } from './pages';
import {
  GameResult,
  calculateLeaderboard,
  SetupInfo,
  getPreviousPlayers
} from './front-end-model';
import { } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
setupIonicReact();

// const hardcodedGameResults: GameResult[] = [
//   {
//     winner: "Sam"
//     , players: [
//       {
//         name: "Sam"
//         , turns: [0, 0, 500, 2500, 0, 0, 0, 250, 100, 350, 0 , 0, 350]
//       }
//       , {
//         name: "Tom"
//         , turns: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//       }
//     ]
//   }
// ];


const hardcodedGameResults: GameResult[] = [
  {
    winner: "Tom"
    , players: ["Tom", "Taylor"]
  }
  , {
    winner: "Taylor"
    , players: ["Jack", "Taylor"]
  }
  , {
    winner: "Taylor"
    , players: ["Tom", "Taylor", "Jack"]
  }
  , {
    winner: "X"
    , players: ["X", "Joe"]
  }
  , {
    winner: "X"
    , players: ["X", "Joe"]
  }
  , {
    winner: "Joe"
    , players: ["X", "Joe"]
  }
  , {
    winner: "Jack"
    , players: ["X", "Joe", "Jack"]
  }
];

const App = () => {
  const [results, setGameResults] = useState(hardcodedGameResults);

  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    start: ""
    , chosenPlayers: []
  });


  const addGameResult = (r: GameResult) => {
    setGameResults([
      ...results
      , r
    ]);
  };

  return (
    <IonApp>
      <IonReactHashRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Home leaderboardData={calculateLeaderboard(results)} />
          </Route>

          <Route exact path="/setup">
            <Setup
              previousPlayers={getPreviousPlayers(results)}
              setSetupInfo={setSetupInfo}
            />
          </Route>

          <Route exact path="/play">
            <Play addGameResultFunc={addGameResult}
              setupInfo={setupInfo}
            />
          </Route>


          {/* <Route exact path="/">
              <Redirect to="/home" />
            </Route> */}
        </IonRouterOutlet>
      </IonReactHashRouter>
    </IonApp >
  );
};
export default App;
// remeber onIonChange not onChange send tom a $1 everytime read