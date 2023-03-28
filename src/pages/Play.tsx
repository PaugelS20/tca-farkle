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
  IonItemGroup,
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
  
  const currentPoints = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  }
  
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

  const addPoints = (winner: string) => {
    addGameResultFunc({
      winner: winner
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
                        <IonInput type="number" placeholder="0"  value={state} ></IonInput> {/*onChange={currentPoints}*/}
                        <IonBadge slot="end">{state}</IonBadge>
                      </IonItem>
                    </IonRow>
                    <IonRow>
                      <IonButton onClick={() => addPoints(state)}
                        color="success">
                        {x} Add
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