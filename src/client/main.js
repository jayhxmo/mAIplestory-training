import GameLoop from './gameloop';
import DRAW_RECT from './drawrect';
import Timer from './timer';
import GameCanvas from './gamecanvas';
import WZManager from './wzmanager';
import Camera from './camera';
import MySocket from './mysocket';
import StateManager from './statemanager';
import LoginState from './loginstate';
import MapState from './mapstate';

async function startGame() {
	DRAW_RECT({ x: 0, y: 0, width: 800, height: 600, color: '#000000' });
	StateManager.initialize();
	GameCanvas.initialize();
	WZManager.initialize();
	Camera.initialize();
	Timer.initialize();
	await MySocket.initialize();
	//await StateManager.setState(LoginState);
	await StateManager.setState(MapState);

	GameLoop.gameLoop();
}

startGame();
