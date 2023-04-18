import { useState, useEffect } from 'react';
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
	IonItem,
	IonInput,
} from '@ionic/react';
// import { MainContent } from '../components/MainContent';
import { MainHeader } from '../components/index';
import { LeaderboardPlayer } from '../front-end-model';
import { durationFormatter } from "human-readable";
import './pageCSS/Home.css';
import localforage from "localforage";


interface HomeProps {
	leaderboardData: LeaderboardPlayer[];
	shortestGameDuration: number;
	longestGameDuration: number;
	avgGameDuration: number;
	reallyCoolThingHappenedPercent: number;
	countZeroTurns: number;
};

export const Home: React.FC<HomeProps> = ({
	leaderboardData
	, shortestGameDuration
	, longestGameDuration
	, avgGameDuration
	, reallyCoolThingHappenedPercent
	, countZeroTurns
}) => {

	// 
	// State hooks...
	// 
	const [emailKey, setEmailKey] = useState("");

	// 
	// useEffect hook
	// 
	useEffect(
		() => {
			const loadEmailKey = async () => {
				try {
					setEmailKey(
						await localforage.getItem("emailKey") ?? ""
					);
				} catch (err) {
					console.error(err);
				}
			};
			loadEmailKey();
		}, []
	);

	//
	// Helper functions...
	//
	const saveEmailKey = async () => {
		try {
			await localforage.setItem(
				"emailKey"
				, emailKey
			);
		} catch (err) {
			console.error(err);
		}
	};


	// console.log(leaderboardData);
	const format = durationFormatter();

	return (
		<IonPage>
			<MainHeader />
			<IonContent fullscreen={true}>

				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Farkle App</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonGrid>
					<IonRow>
						<IonCol>
							<IonCard>
								{/* <IonCardHeader>
									<IonCardTitle>Leaderboard</IonCardTitle>
									<IonCardSubtitle>Cool new stats!</IonCardSubtitle>
								</IonCardHeader> */}

								<IonCardContent>
									{
										leaderboardData.length === 0 &&
										<IonCardHeader>
											<IonCardTitle>Play a game to see the Leaderboard...</IonCardTitle>
										</IonCardHeader>
									}
									{
										leaderboardData.length > 0 &&
										<IonGrid>
											<IonRow>
												<IonCardHeader id='leaderboardResults'>
													<IonCardTitle>Leaderboard</IonCardTitle>
													<IonCardSubtitle>Results</IonCardSubtitle>
												</IonCardHeader>
											</IonRow>

											<IonRow class='leaderboardHeaders'>
												<IonCol>W</IonCol>
												<IonCol>L</IonCol>
												<IonCol>AVG</IonCol>
												<IonCol>Player</IonCol>
											</IonRow>
											{
												leaderboardData.map(x => (
													<IonRow>
														<IonCol>{x.wins}</IonCol>
														<IonCol>{x.losses}</IonCol>
														<IonCol>{x.avg}</IonCol>
														<IonCol>{x.name}</IonCol>
														{/* <IonCol>{x.name}</IonCol> */}
													</IonRow>
												))
											}
										</IonGrid>
									}
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>

					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader>
									<IonCardTitle>Players Account</IonCardTitle>
									<IonCardSubtitle>Add Your Email</IonCardSubtitle>
								</IonCardHeader>

								<IonCardContent>
									<IonRow>
										<IonItem>
											<IonInput
												type='text'
												placeholder="Enter new player Email"
												value={emailKey}
												onIonChange={(e: any) => setEmailKey(e.target.value)}
											>
											</IonInput>
										</IonItem>

										<IonButton size="small" onClick={saveEmailKey}>
											Add
											{/* <IonIcon icon={personAddOutline}></IonIcon> */}
										</IonButton>
									</IonRow>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>

					{/* Game lengths */}
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader>
									<IonCardTitle>Game Time Fun Facts</IonCardTitle>
									<IonCardSubtitle>Cool new facts!</IonCardSubtitle>
								</IonCardHeader>

								<IonCardContent>
									<IonRow>
										{`Shortest game ever ${format(shortestGameDuration)}`}
									</IonRow>
									<IonRow>
										{`Longest game ever ${format(longestGameDuration)}`}
									</IonRow>
									<IonRow>
										{`Average game time ${format(avgGameDuration)}`}
									</IonRow>

								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>

					{/* Really Cool THing Happened */}
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader>
									<IonCardTitle>Really Cool Thing Fun Fact</IonCardTitle>
									<IonCardSubtitle>Cool new facts!</IonCardSubtitle>
								</IonCardHeader>

								<IonCardContent>
									{`Happens ${(reallyCoolThingHappenedPercent * 100).toFixed(2)}% of games`}
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>

					{/* Farkles Per Game */}
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader>
									<IonCardTitle>Amount of Farkles Per Game Fun Fact </IonCardTitle>
									<IonCardSubtitle>Cool new facts!</IonCardSubtitle>
								</IonCardHeader>

								<IonCardContent>
									{`Average Farkles ${(countZeroTurns)}`}
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
	{/* more dummy cards to add more fun facts */}
					{/* <IonRow>
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
					</IonRow> */}

					<IonRow>
						<IonCol>
							<IonButton routerLink='/setup' id='startGameButton' color="success">Play Game</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
				{/* <MainContent /> */}
			</IonContent>
		</IonPage >
	);
};
