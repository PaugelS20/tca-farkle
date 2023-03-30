import { FormEventHandler, useState } from "react";

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
} from '@ionic/react';
import { GameResult, SetupInfo, GamePlayer } from '../front-end-model';

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
  }[]>(setupInfo.chosenPlayers.map(x => ({
    name: x
    , scoreInput: 0
  })));

  const [gameTurns, setGameTurns] = useState<{
    name: string;
    points: number;
  }[]>([]);



  
  // const currentPoints = (event: FormEventHandler) {
  //   // setState{(e: any) => setNewPlayerName(e.target.value)}
  // }
  
  // console.log(setupInfo);

  const h = useHistory();

  const endGame = (winner: string) => {
    addGameResultFunc({
      winner: winner
      , players: setupInfo.chosenPlayers.map(x => ({
        name: x
        , turns: []
      }))
      , start: setupInfo.start
      , end: new Date().toISOString()
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
  // const sum = value + newValue

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
              {
                setupInfo.chosenPlayers.map(x => (
                  <>
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
                        }</IonBadge>  {/**/}
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
                      <IonButton onClick={() => endGame(x)}
                        color="danger">
                        {x} won
                      </IonButton>
                    </IonRow>
                  </>
                ))
              }


            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};