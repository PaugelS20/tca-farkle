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
  
  const [state, setState] = useState("")
  
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

  const addPoints = (points: string) => {
    addGameResultFunc({
      winner: points
      , players: setupInfo.chosenPlayers.map(x => ({
        name: x
        , turns: []
      }))
      , start: setupInfo.start
      , end: new Date().toISOString()
    });
  };

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
                        <IonInput type="number" placeholder="0"  onIonChange={(e: any) => setState(e.target.value)}></IonInput>
                        <IonBadge slot="end">{state}hello</IonBadge>  {/**/}
                      </IonItem>
                    </IonRow>
                    <IonRow>
                      <IonButton onClick={() => addPoints(state)}
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