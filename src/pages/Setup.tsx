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

export const Setup: React.FC = () => {
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
              <h2>Setup</h2>
              <p>some setup stuff goes here</p>
              <IonButton routerLink='/play' color="success">Start Game</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>


      </IonContent>
    </IonPage>
  );
};