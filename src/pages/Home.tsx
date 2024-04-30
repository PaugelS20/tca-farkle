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
	IonIcon,
} from '@ionic/react';
import { DarkMode } from '../components/DarkMode';
import { MainHeader } from '../components/index';
import { LeaderboardPlayer } from '../front-end-model';
import { durationFormatter } from "human-readable";
import { personCircle } from "ionicons/icons";
// import './pageCSS/Home.css';
// import "../components/darkMode.css";
import "../Master.css";


interface HomeProps {
	leaderboardData: LeaderboardPlayer[];
	shortestGameDuration: number;
	longestGameDuration: number;
	avgGameDuration: number;
	reallyCoolThingHappenedPercent: number;
	saveEmailKeyFunc: any;
	emailKeyInput: string;
	setEmailKeyInput: any;
	avgFarklesPerGame: number;
};

export const Home: React.FC<HomeProps> = ({
	leaderboardData
	, shortestGameDuration
	, longestGameDuration
	, avgGameDuration
	, reallyCoolThingHappenedPercent
	, saveEmailKeyFunc
	, emailKeyInput
	, setEmailKeyInput
	, avgFarklesPerGame
}) => {

	// const [theme, setTheme] = useState('light');

	// useEffect(() => {
	// 	document.body.className = theme;
	// }, [theme]);


	// const toggleTheme = () => {
	// 	if (theme === 'light') {
	// 		setTheme('dark');
	// 	} else {
	// 		setTheme('light');
	// 	}
	// };

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

						{/* Leaderboard */}
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

						{/* Dark Mode switch */}
						{/* <IonRow>
							<IonCol>
								<IonCard>
									<IonCardHeader>
										<IonCardTitle>Switch to Dark Mode</IonCardTitle>
										<IonCardSubtitle id='newFeature'>New Feature*</IonCardSubtitle>
									</IonCardHeader>

									<IonCardContent>
										<IonRow class='darkModeRow'>
											<DarkMode />
										</IonRow>
									</IonCardContent>
								</IonCard>
							</IonCol>
						</IonRow> */}

						{/* players email */}
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
												<IonIcon className='accountPerson' icon={personCircle}></IonIcon>
												<IonInput
													type='text'
													placeholder="Enter new player Email"
													value={emailKeyInput}
													onIonChange={(e: any) => setEmailKeyInput(e.target.value)}
												>
												</IonInput>
											</IonItem>
											<IonButton size="small" color="success" onClick={() => saveEmailKeyFunc(emailKeyInput)}>
												Save
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
											{`Shortest game ever: ${Number.isInteger(shortestGameDuration)
												? format(shortestGameDuration)
												: "n/a"}`
											}
										</IonRow>
										<IonRow>
											{`Longest game ever: ${Number.isInteger(longestGameDuration)
												? format(longestGameDuration)
												: "n/a"}`
											}
										</IonRow>
										<IonRow>
											{`Average game time: ${format(avgGameDuration)}`}
										</IonRow>
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
										{`Average Farkles ${(avgFarklesPerGame)}`}
									</IonCardContent>
								</IonCard>
							</IonCol>
						</IonRow>

						{/* Really Cool THing Happened */}
						{/* <IonRow>
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
						</IonRow> */}

						<IonRow>
							<IonCol>
								<IonButton expand="block" routerLink='/setup' id='startGameButton' color="success">Play Game</IonButton>
							</IonCol>
						</IonRow>
					</IonGrid>
			
				{/* <MainContent /> */}
			</IonContent>
		</IonPage >
	);
};
