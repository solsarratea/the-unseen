function SceneManager(canvas) {

    const clock = new THREE.Clock();

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);
    const sceneControls = {decode: false};
    const guiControls = addGuiControls();

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#000");

        return scene;
    }


    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true,  preserveDrawingBuffer: true  });
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        return renderer;
    }

    function buildCamera({ width, height }) {
      const camera = new THREE.Camera();
        return camera;
    }

    function createSceneSubjects(scene,buffer) {
        const sceneSubjects = [
            new Shader(scene)
        ];

        return sceneSubjects;
    }


    function addGuiControls(){
     const datGui  = new dat.GUI({ autoPlace: true });
       var toggleDecode = { decode:function(){
           sceneControls.decode = true; }};
       var toggleEncode = { encode:function(){
           sceneControls.decode = false; }};

     let folder = datGui.addFolder(`the unseen`)
          folder.add(toggleEncode,'encode');
        folder.add(toggleDecode,'decode');

    }

    this.update = function() {
        const elapsedTime = clock.getElapsedTime();
        for(let i=0; i<sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime,sceneControls);

        renderer.render(scene, camera);
    }

    this.onWindowResize = function() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;

        renderer.setSize(width, height);
    }

    /*** ADDING SCREEN SHOT ABILITY ***/
    window.addEventListener("keyup", function(e){
    var imgData;
    //Listen to 'P' key
    if(e.which !== 80) return;
    try {
        imgData = renderer.domElement.toDataURL();
        let link = document.createElement("a");
        link.href = imgData;
	link.download = "img";
	link.click();
    }
    catch(e) {
        console.log("Browser does not support taking screenshot of 3d context",e);
        return;
    }
});

}
