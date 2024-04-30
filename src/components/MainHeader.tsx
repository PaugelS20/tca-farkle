import { DarkMode } from "./DarkMode";
import {
	IonHeader,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonButton,
} from "@ionic/react";

export const MainHeader: React.FC = () => {
	return (
		<IonHeader translucent={true}>
			<IonToolbar>
				<IonTitle>Farkle App</IonTitle>
				<IonButtons slot="end">
					<DarkMode />
				</IonButtons>
			</IonToolbar>
		</IonHeader>
	);
};
