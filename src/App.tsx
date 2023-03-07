import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Home, Setup, Play } from './pages';
import { 
  GameResult, 
  calculateLeaderboard 
} from './front-end-model';


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


const hardcodedGameResults: GameResult[] = [
  // {
  //     winner: "Tom"
  //     , players: ["Tom", "Taylor"]
  // }
  // , {
  //     winner: "Taylor"
  //     , players: ["Jack", "Taylor"]
  // }
  // , {
  //     winner: "Taylor"
  //     , players: ["Tom", "Taylor", "Jack"]
  // }
  // , {
  //     winner: "X"
  //     , players: ["X", "Joe"]
  // }
  // , {
  //     winner: "X"
  //     , players: ["X", "Joe"]
  // }
  // , {
  //     winner: "Joe"
  //     , players: ["X", "Joe"]
  // }
  // , {
  //     winner: "Jack"
  //     , players: ["X", "Joe", "Jack"]
  // }
];

const App = () => {
  const [results, setGameResults] = useState(hardcodedGameResults);
  
  const addGameResult = (r: GameResult) => {
    setGameResults ([
      ...results
      , r
    ]);
  };
    
  return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/">
              <Home leaderboardData={calculateLeaderboard(results)}/>
            </Route>

            <Route exact path="/setup">
              <Setup />
            </Route>

            <Route exact path="/play">
              <Play addGameResultFunc={addGameResult}/>
            </Route>

            {/* <Route exact path="/">
              <Redirect to="/home" />
            </Route> */}
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
  );
};
export default App;
