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
import { GameResult } from '../front-end-model';

interface PlayProps {
  addGameResultFunc: (r: GameResult) => void;
};

export const Play: React.FC<PlayProps> = ({addGameResultFunc}) => {

  const h = useHistory();
  
  const endGame = () => {
    addGameResultFunc({
      winner: "Larry"
      , players: ["Larry", "Curly", "Moe"]
    });
    h.goBack();
    h.goBack();
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
              <IonButton onClick={endGame} color="danger">End Game</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};