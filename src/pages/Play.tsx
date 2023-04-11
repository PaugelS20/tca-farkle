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
import { GameResult, SetupInfo } from '../front-end-model';

interface PlayProps {
  addGameResultFunc: (r: GameResult) => void;
  setupInfo: SetupInfo;
};

export const Play: React.FC<PlayProps> = ({
  addGameResultFunc
  , setupInfo
}) => {

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

  const h = useHistory();

  const [happened, setHappened] = useState(false);

  const endGame = (winner: string) => {
    addGameResultFunc({
      winner: winner,
      players: setupInfo.chosenPlayers.map(x => ({
        name: x
        , turns: []
      }))
      , start: setupInfo.start
      , end: new Date().toISOString()
      , reallyCoolThingHappened: happened

    });
    h.push("/")
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Farkle Companion App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <h2>Play</h2>
              <p>some data collection stuff goes here</p>

              <IonImg src="../assets/farkleScoring.png" alt="farkle-scoring-sheet" />
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
                          placeholder="0"
                          value={
                            playerScores.filter(y => y.name == x)[0].scoreInput
                          }
                          onIonChange={(e: any) => setPlayerScores([
                            ...playerScores.filter(y => y.name !== x)
                            , {
                              name: x
                              , scoreInput: Number(e.target.value)
                            }
                          ])}
                        // onIonChange={}
                        >
                        </IonInput>

                        <IonBadge slot="end">{
                          gameTurns
                            .filter(
                              y => y.name == x
                            )
                            .reduce(
                              (acc, x) => acc + x.points
                              , 0
                            )
                        }</IonBadge>
                      </IonItem>
                    </IonRow>

                    <IonRow>
                      <IonButton onClick={() => addPoints(x)}
                        color="success">
                        {x} Add
                      </IonButton>

                      <IonButton onClick={() => endGame(x)} //?
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
                <IonButton color="danger" onClick={() => endGame}>
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