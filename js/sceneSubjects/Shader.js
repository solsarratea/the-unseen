function Shader(scene) {
    var geometry = new THREE.PlaneBufferGeometry( 2,2);
    var texture  = new THREE.TextureLoader().load("textures/q2.jpg");

    var material = new THREE.ShaderMaterial( {
        uniforms: {
            resolution : { type : 'v2', value : new THREE.Vector2( window.innerWidth, window.innerHeight) },
            decode : { value: true},
            tex0: { type: "t", value: texture },
            time: { type: "f", value: 150.},
         },
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        vertexShader: document.getElementById( 'vertexShader' ).textContent
    });

    var shaderObject = new THREE.Mesh( geometry, material );
    scene.add( shaderObject );

    this.update = function(time, sceneControls) {
        material.uniforms.decode.value = sceneControls.decode;
        if (sceneControls.start){
        material.uniforms.time.value = 150.+time;
        }
    }
}
