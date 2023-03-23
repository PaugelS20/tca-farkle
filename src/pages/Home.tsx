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
// import { MainContent } from '../components/MainContent';
import { MainHeader } from '../components/index';
import { LeaderboardPlayer } from '../front-end-model';
import { durationFormatter } from "human-readable";
import './Home.css';

interface HomeProps {
	leaderboardData: LeaderboardPlayer[];
	shortestGameDuration: number;
	longestGameDuration: number;
};

export const Home: React.FC<HomeProps> = ({ 
	leaderboardData 
	, shortestGameDuration
	, longestGameDuration
}) => {

	console.log(leaderboardData);

	const format = durationFormatter();
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
													<IonCardSubtitle>Results from you game!</IonCardSubtitle>
												</IonCardHeader>
											</IonRow>

											<IonRow>
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
									<IonCardTitle>Game Time Fun Facts</IonCardTitle>
									<IonCardSubtitle>Cool new facts!</IonCardSubtitle>
								</IonCardHeader>

								<IonCardContent>
									{`${format(shortestGameDuration)} Shortest game ever `}
									{`${format(longestGameDuration)} Longest game ever`}
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
