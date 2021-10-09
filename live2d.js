/*
TN
*/
const cubism4Model =
  "jing/seguburger.model3.json"; // 모델 설정

const live2d = PIXI.live2d; 

(async function main() {
  const app = new PIXI.Application({
    view: document.getElementById("canvas"),
    autoStart: true,
    resizeTo: window,
    backgroundColor: 0xE6B58A // 배경색
  });

  const models = await Promise.all([
    live2d.Live2DModel.from(cubism4Model)
  ]);

    models.forEach((model) => {
    app.stage.addChild(model);
  
    const scaleX = (innerWidth * 0.3) / model.width; // 크기 조정
    const scaleY = (innerHeight * 0.7) / model.height; // 0.7이 최대값. 줄이면 작아짐

    // fit the window 위치 조정
    model.scale.set(Math.min(scaleX, scaleY));
    model.y = innerWidth * 0.1;
    model.x = innerWidth * 0.5;
    draggable(model);
  });
  const model4 = models[0];

  // handle tapping
  model4.on("hit", (hitAreas) => {
    if (hitAreas.includes("Body")) {
      model4.motion("TapBody"); // hit areas body 클릭 시 seguburger.model3.json에서 TapBody으로 지정된 모션 재생
    }

  if (hitAreas.includes("Face")) {
    model4.motion("TapFace"); //  Face 클릭 시 seguburger.model3.json에서 TapFace으로 지정된 모션 재생
    //model4.expression();
  }
  });
})();
// 드래그
function draggable(model) {
    model.buttonMode = true;
    model.on("pointerdown", (e) => {
      model.dragging = true;
      model._pointerX = e.data.global.x - model.x;
      model._pointerY = e.data.global.y - model.y;
    });
    model.on("pointermove", (e) => {
      if (model.dragging) {
        model.position.x = e.data.global.x - model._pointerX;
        model.position.y = e.data.global.y - model._pointerY;
      }
    });
    model.on("pointerupoutside", () => (model.dragging = false));
    model.on("pointerup", () => (model.dragging = false));
  }