import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import { Home, Setup, Play } from './pages';
import {
  GameResult,
  calculateLeaderboard,
  SetupInfo,
  getPreviousPlayers,
  getShortestGameDuration,
  getLongestGameDuration,
  getAvgGameDuration,
  getPercentGamesReallyCoolThingHappened,
  calcAvgFarklesPerGame,
} from './front-end-model';

import localforage from "localforage";
import { loadGamesFromCloud, saveGameToCloud } from "./tca-cloud-api";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/palettes/dark.system.css';
import '@ionic/react/css/palettes/dark.class.css';

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
// import "./components/darkMode.css";
setupIonicReact();

const App = () => {
  const [results, setGameResults] = useState<GameResult[]>([]);
  // const [results, setGameResults] = useState([]);

  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    start: ""
    , chosenPlayers: []
  });

  // 
  // State hooks...
  // 
  const [emailKeyInput, setEmailKeyInput] = useState("");
  const [emailKeySaved, setEmailKeySaved] = useState("");

  // 
  // useEffect hook
  // 
  useEffect(
    () => {
      const loadEmailKeyAndGameResults = async () => {

        try {
          const ek = String(await localforage.getItem("emailKey")) ?? "";

          if (ek.length > 0) {
            const resultsFromCloud = await loadGamesFromCloud(
              ek
              , "tca-farkle"
            );

            if (!ignore) {
              setGameResults(resultsFromCloud);
            }
          }

          if (!ignore) {
            setEmailKeyInput(ek);
            setEmailKeySaved(ek);
          }
        } catch (err) {
          console.error(err);
        }
      };
      let ignore = false;
      loadEmailKeyAndGameResults();
      return () => {
        ignore = true;
      };
    }, [emailKeySaved]
  );

  //
  // Helper functions...
  //
  const saveEmailKey = async (email: string) => {
    try {
      await localforage.setItem(
        "emailKey"
        , email
      );

      setEmailKeySaved(email);
    }
    catch (err) {
      console.error(err);
    }
  };

  const addGameResult = (r: GameResult) => {
    // Save the game result to the cloud
    saveGameToCloud(
      emailKeySaved
      , "tca-farkle"
      , r.end
      , r
    );

    setGameResults([
      ...results
      , r
    ]);
  };



  //
  // JSX
  //

  return (
    <IonApp>
      <IonReactHashRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Home
              leaderboardData={calculateLeaderboard(results)}
              shortestGameDuration={getShortestGameDuration(results)}
              longestGameDuration={getLongestGameDuration(results)}
              avgGameDuration={getAvgGameDuration(results)}
              reallyCoolThingHappenedPercent={getPercentGamesReallyCoolThingHappened(results)}
              avgFarklesPerGame={calcAvgFarklesPerGame(results)}
              saveEmailKeyFunc={saveEmailKey}
              emailKeyInput={emailKeyInput}
              setEmailKeyInput={setEmailKeyInput}
            />
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
        </IonRouterOutlet>
      </IonReactHashRouter>
    </IonApp >
  );
};
export default App;
// remeber onIonChange onInputChangew not onChange send tom a $1 everytime read

