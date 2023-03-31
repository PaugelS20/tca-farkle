import {
    IonHeader,
    IonTitle,
    IonToolbar,

} from '@ionic/react';

export const MainHeader: React.FC = () => {
    return (
        <IonHeader translucent={true}>
            <IonToolbar>
                <IonTitle>Farkle App</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

