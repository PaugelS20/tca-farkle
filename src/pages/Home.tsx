import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,

  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonGrid,
  IonCol,
  IonRow,
} from '@ionic/react';
import { MainContent } from '../components/MainContent';
import { MainHeader } from '../components/index';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <IonPage>

      <MainHeader />
      
      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Farkle Companion App</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Fun Fact 1</IonCardTitle>
                  <IonCardSubtitle>Cool new facts!</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Fun Fact 2</IonCardTitle>
                  <IonCardSubtitle>Cool new facts!</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Fun Fact 3</IonCardTitle>
                  <IonCardSubtitle>Cool new facts!</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Fun Fact 4</IonCardTitle>
                  <IonCardSubtitle>Cool new facts!</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Fun Fact 5</IonCardTitle>
                  <IonCardSubtitle>Cool new facts!</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Fun Fact 6</IonCardTitle>
                  <IonCardSubtitle>Cool new facts!</IonCardSubtitle>
                </IonCardHeader>

                <IonCardContent>
                  Here's a small text description for the card content. Nothing more, nothing less.
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton routerLink='/setup' id='startGameButton' color="success">Play Game</IonButton>
            </IonCol>
          </IonRow>

        </IonGrid>


        {/* <MainContent /> */}
      </IonContent>
    </IonPage>
  );
};