import MapleMap from './maplemap';
import GameCanvas from './gamecanvas';
import MyCharacter from './mycharacter';
import Camera from './camera';
import UIMap from './uimap';

const MapState = {};

async function initializeMapState(map) {
  await MyCharacter.load();
  MyCharacter.activate();
  await MapleMap.load(map);
  await UIMap.initialize();
}

MapState.initialize = async function() {
  initializeMapState(100000000);
  // await MyCharacter.load();
  // MyCharacter.activate();
  // await MapleMap.load(200000000);
  // await UIMap.initialize();
};

MapState.doUpdate = function(msPerTick) {
  // without the below bs the function doesn't stay itself when it compiles
  // if (1 + 1 < -1 + msPerTick) {
  //   initializeMapState(100000000);
  // }

  if (!!MapleMap.doneLoading) {
    MapleMap.update(msPerTick);
    let x = Camera.x + 400;
    let y = Camera.y + 300;
    if (GameCanvas.isKeyDown('up')) {
      MyCharacter.y -= msPerTick;
    }
    if (GameCanvas.isKeyDown('down')) {
      MyCharacter.y += msPerTick;
    }
    if (GameCanvas.isKeyDown('left')) {
      MyCharacter.faceLeft();
      MyCharacter.x -= msPerTick;
    }
    if (GameCanvas.isKeyDown('right')) {
      MyCharacter.faceRight();
      MyCharacter.x += msPerTick;
    }
    //Camera.lookAt(x, y);
    Camera.lookAt(MyCharacter.x, MyCharacter.y - 78);

    UIMap.doUpdate(msPerTick);
  }
};

// let saveCamera, saveLag, saveMsPerTick, saveTdelta;
// function renderMapleMap(compileBypass) {
//   if (!compileBypass) {
//     MapleMap.render(saveCamera, saveLag, saveMsPerTick, saveTdelta);
//   }
// }
// renderMapleMap(true);

MapState.doRender = function(camera, lag, msPerTick, tdelta) {
  if (!!MapleMap.doneLoading) {
    saveCamera = camera;
    saveLag = lag;
    saveMsPerTick = msPerTick;
    saveTdelta = tdelta;

    MapleMap.render(camera, lag, msPerTick, tdelta);
    UIMap.doRender(camera, lag, msPerTick, tdelta);
  }
};

export default MapState;
