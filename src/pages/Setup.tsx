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
  IonItem,
  IonCheckbox,
  IonLabel,
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
              <p>Select who's playing or add someone new</p>
              <IonItem>
                <IonCheckbox slot="start"></IonCheckbox>
                <IonLabel>Sam</IonLabel>
              </IonItem>
              <IonButton routerLink='/play' color="success">Start Game</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>


      </IonContent>
    </IonPage>
  );
};