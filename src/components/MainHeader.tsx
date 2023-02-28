import {
    IonHeader,
    IonTitle,
    IonToolbar,

} from '@ionic/react';

export const MainHeader: React.FC = () => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>Farkle Companion App</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

