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
  IonItemGroup,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/react';
// import { MainContent } from '../components/MainContent';
import { MainHeader } from '../components/index';
import { LeaderboardPlayer } from '../front-end-model';
import './Home.css';

interface HomeProps {
  leaderboardData: LeaderboardPlayer[];
};

export const Home: React.FC<HomeProps> = ({ leaderboardData }) => {

  console.log(leaderboardData);


  return (
    <IonPage>

      <MainHeader />

      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="small">Farkle Companion App</IonTitle>
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
                  {
                    leaderboardData.length == 0 &&
                    <p>Play a game to see your leaderboarder...</p>
                  }
                  {
                    leaderboardData.length > 0 &&


                    <IonList>
                      <IonItemGroup>
                        <IonItemDivider>
                          <IonLabel>
                            Section A
                          </IonLabel>
                        </IonItemDivider>

                        <IonItem>
                          <IonLabel>A1</IonLabel>
                        </IonItem>
                        <IonItem>
                          <IonLabel>A2</IonLabel>
                        </IonItem>
                        <IonItem lines="none">
                          <IonLabel>A3</IonLabel>
                        </IonItem>
                      </IonItemGroup>

                      <IonItemGroup>
                        <IonItemDivider>
                          <IonLabel>
                            Section B
                          </IonLabel>
                        </IonItemDivider>

                        <IonItem>
                          <IonLabel>B1</IonLabel>
                        </IonItem>
                        <IonItem>
                          <IonLabel>B2</IonLabel>
                        </IonItem>
                        <IonItem lines="none">
                          <IonLabel>B3</IonLabel>
                        </IonItem>
                      </IonItemGroup>
                    </IonList>

                  }
                  {
                    leaderboardData.map(x => (
                      <tr>
                        <td>{x.wins}</td>
                        <td>{x.losses}</td>
                        <td>{x.avg}</td>
                        <td>{x.name}</td>
                      </tr>
                    ))
                  }
                  <tbody/>
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

