import { useState } from "react";
import { useHistory } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonInput,
  IonLabel,
  IonItem,
  IonBadge,
  IonImg,
} from '@ionic/react';
import { 
  GameResult, 
  SetupInfo, 
  getScoresByPlayer, 
  sumScores, 
  getUniquePlayersFromTurns 
} from '../front-end-model';
import { MainHeader } from '../components/index';
import FarkleScoringSheet from '../farkleScoring.png';
import "../Master.css";
// import { NumericFormat } from 'react-number-format';

interface PlayProps {
  addGameResultFunc: (r: GameResult) => void;
  setupInfo: SetupInfo;
};

export const Play: React.FC<PlayProps> = ({
  addGameResultFunc
  , setupInfo
}) => {

  // Setting up State
  const [playerScores, setPlayerScores] = useState<{
    name: string;
    scoreInput: number;
  }[]>
    (setupInfo.chosenPlayers.map(x => ({
      name: x
      , scoreInput: 0
    })));

  const [gameTurns, setGameTurns] = useState<{
    name: string;
    points: number;
  }[]>([]);

  const [happened, setHappened] = useState(false);

  const h = useHistory();

  const endGame = () => {
    addGameResultFunc({
      winner: getWinner(),
      players: setupInfo.chosenPlayers.map(x => ({
        name: x

      }))
      , start: setupInfo.start
      , end: new Date().toISOString()
      , reallyCoolThingHappened: happened
      , turns: gameTurns
    });
    h.push("/")
    console.log(getScoresByPlayer);
    console.log(sumScores);
    console.log(getUniquePlayersFromTurns);
  };

  const addFarkle = (player: string) => {
    setGameTurns([
      ...gameTurns
      , {
        name: player
        , points: 0
      }
    ]);

  };

  const addPoints = (player: string) => {
    setGameTurns([
      ...gameTurns
      , {
        name: player
        , points: playerScores.filter(x => x.name == player)[0].scoreInput
      }
    ]);

    setPlayerScores([
      ...playerScores.filter(y => y.name !== player)
      , {
        name: player
        , scoreInput: 0
      }
    ])
  };

  // const scoreGreaterThanTenThousand = false;
  const scoreGreaterThanTenThousand = () => {
    const grouped =
      gameTurns.reduce(
        (acc, x) => acc.set(
          x.name
          , (acc.get(x.name) ?? 0) + x.points
        )
        , new Map<string, number>()
      );
    console.log(grouped);
    return [...grouped].some(x => x[1] >= 10_000);
  }

  const getWinner = () => {
    const grouped =
      gameTurns.reduce(
        (acc, x) => acc.set(
          x.name
          , (acc.get(x.name) ?? 0) + x.points
        )
        , new Map<string, number>()
      );
    console.log(grouped);
    if (
      [...grouped].some(x => x[1] >= 10_000)
    ) {

      const possibleWinners = [...grouped].filter(x => x[1] >= 10_000)
      return possibleWinners[0][0];
    }
    return "";
  }

  return (
    <IonPage>
      <MainHeader/>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <h2>Play</h2>
              <p>some data collection stuff goes here</p>
              <IonImg id="farkleScoringSheet" src={FarkleScoringSheet} alt="farkle-scoring-sheet" />
              {
                setupInfo.chosenPlayers.map(x => (
                  <>
                    <IonRow>
                      <IonItem lines="none">{x}</IonItem>
                    </IonRow>

                    <IonRow id='playContainer'>
                      <IonItem>
                        <IonLabel position="floating">Points</IonLabel>
                        <IonInput
                          type="number"
                          value={
                            playerScores.filter(y => y.name == x)[0].scoreInput
                          }
                          onIonChange={(e) => setPlayerScores([
                            ...playerScores.filter(y => y.name !== x)
                            , {
                              name: x
                              , scoreInput: Number(e.detail?.value)
                            }
                          ])}
                        >
                        </IonInput>

                        {/* <NumericFormat
                          value={
                            playerScores.filter(y => y.name == x)[0].scoreInput
                          }
                          customInput={IonInput} /> */}

                        <IonBadge slot="end">
                          {
                            gameTurns
                              .filter(
                                y => y.name == x
                              )
                              .reduce(
                                (acc, x) => acc + x.points
                                , 0
                              )
                          }
                        </IonBadge>

                      </IonItem>
                    </IonRow>

                    <IonRow id="playerButtonRow">
                      <IonButton onClick={() => addPoints(x)}
                        color="success">
                        {x} Add
                      </IonButton>

                      <IonButton onClick={() => addFarkle(x)} //endGame(x)
                        color="warning">
                        {x} Farkle
                      </IonButton>
                    </IonRow>
                  </>
                ))
              }
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              {
                scoreGreaterThanTenThousand() &&
                <IonButton color="danger" onClick={endGame}>
                  End Game
                </IonButton>
              }
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};

// add function to say that when the points reach ten thousand show the 
// end game button if that player is beat end the game and then show the points on the leaderboard