import {
  IonContent,
  IonPage,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonItem,
  IonCheckbox,
  IonList,
  IonFabButton,
  IonIcon,
  IonText,
  IonNavLink,
  IonInput,
} from '@ionic/react';
import { MainHeader } from '../components/index';
import { personAddOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { SetupInfo } from '../front-end-model';
import "../Master.css";

export interface SetupProps {
  previousPlayers: string[];
  setSetupInfo: (info: SetupInfo) => void;
}

export const Setup: React.FC<SetupProps> = ({
  previousPlayers
  , setSetupInfo
}) => {

  // 
  // State hooks...
  // 
  const h = useHistory();
  const [newPlayerName, setNewPlayerName] = useState("");
  const [chosenPlayers, setChosenPlayers] = useState(
    previousPlayers.map(x => ({
      name: x
      , checked: false
    }))
  );

  const togglePlayer = (name: string) => setChosenPlayers(
    chosenPlayers.map(x => ({
      ...x
      , checked: x.name == name ? !x.checked : x.checked
    }))
  );

  const startGame = () => {
    console.log(chosenPlayers);

    setSetupInfo({
      start: new Date().toISOString()
      , chosenPlayers: chosenPlayers
        .filter(x => x.checked)
        .map(x => x.name)
    });
    h.push("/play");
  }

  const validateAndAddNewPlayer = () => {
    console.log("validatedplayer", newPlayerName);
    // Validate first
    if (
      newPlayerName.length == 0
      || chosenPlayers.some(x => x.name.localeCompare(newPlayerName) == 0)
    ) {
      return;
    }
    setChosenPlayers(
      [
        ...chosenPlayers
        , {
          name: newPlayerName
          , checked: true
        }
      ]
    );
    setNewPlayerName("");
  };

  return (
    <IonPage>
      <MainHeader/>
      <IonContent fullscreen={true}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <h2>Setup</h2>
              <IonText className="ion-padding-bottom">
                Select who's playing or add someone new
              </IonText>

              <IonList className='ion-padding-vertical' id='NewPlayerIonList'>
                <IonItem id='newPlayerNameInput'>
                  <IonInput
                    placeholder="Enter Name"
                    labelPlacement="floating"
                    label='Add Player'
                    value={newPlayerName}
                    onIonInput={(e) => { 
                      setNewPlayerName(e.target?.value?.toString() ?? "")
                    } }
                  >
                  </IonInput>
                </IonItem>

                <IonFabButton size="small" onClick={validateAndAddNewPlayer}>
                  <IonIcon icon={personAddOutline}></IonIcon>
                </IonFabButton>
              </IonList>
            </IonCol>
          </IonRow>
          {
            chosenPlayers.map(x => (
              <IonRow
                key={x.name}
              >
                <IonCol>
                  <IonList>
                    <IonItem>
                      <IonCheckbox 
                        labelPlacement="end"
                        justify="start"
                        checked={x.checked}
                        onIonChange={() => togglePlayer(x.name)}
                        >
                          {x.name}
                      </IonCheckbox>
                    </IonItem>
                  </IonList>
                </IonCol>
              </IonRow>
            ))
          }
          <IonRow>
            <IonCol>
              <IonNavLink routerDirection="forward">
                <IonButton onClick={startGame} color="success">Start Game</IonButton>
              </IonNavLink>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
