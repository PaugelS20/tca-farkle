import './MainContent.css';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonRow,
} from '@ionic/react';

interface ContainerProps { }

export const MainContent: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
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


      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Fun Fact 4</IonCardTitle>
          <IonCardSubtitle>Cool new facts!</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          Here's a small text description for the card content. Nothing more, nothing less.
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Fun Fact 5</IonCardTitle>
          <IonCardSubtitle>Cool new facts!</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          Here's a small text description for the card content. Nothing more, nothing less.
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Fun Fact 6</IonCardTitle>
          <IonCardSubtitle>Cool new facts!</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          Here's a small text description for the card content. Nothing more, nothing less.
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Fun Fact 7</IonCardTitle>
          <IonCardSubtitle>Cool new facts!</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          Here's a small text description for the card content. Nothing more, nothing less.
        </IonCardContent>
      </IonCard>

      </IonGrid>

      <IonButton id='startGameButton' color="success">Start Game</IonButton>
    </div>
  );
};
