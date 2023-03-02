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
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  IonText,
  IonNavLink,
  IonCard,
} from '@ionic/react';
import { add, personAddOutline } from 'ionicons/icons';
import "./Setup.css"

export const Setup: React.FC = () => {
  const addNewPlayer = () => {

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
              <IonTitle id='setupTitle'>Setup</IonTitle>
              <IonText id='setupText'>Select who's playing or add someone new</IonText>
              <IonFabButton size="small" onClick={addNewPlayer}>
                <IonIcon icon={personAddOutline}></IonIcon>
              </IonFabButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonList>
                <IonItem>
                  <IonCheckbox slot="start"></IonCheckbox>
                  <IonLabel>Sam</IonLabel>
                </IonItem>
              </IonList>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonNavLink routerDirection="forward">
                <IonButton routerLink='/play' color="success">Start Game</IonButton>
              </IonNavLink>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};