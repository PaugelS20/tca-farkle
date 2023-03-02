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

// export const addGameResult: AddGameResultFunc = (results, result) => [
//   ...results 
//   , result
// ];

export const Play: React.FC = () => {
  const h = useHistory();

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
              <IonButton onClick={(e) => {
                        h.goBack();
                        h.goBack();
                    }} color="danger">End Game</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
};