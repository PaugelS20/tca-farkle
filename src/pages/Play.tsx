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

  console.log(setupInfo);

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
                  <IonButton onClick={() => endGame(x)}
                    color="danger">
                    {x} won
                  </IonButton>
                ))
              }


            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};