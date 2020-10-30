function Shader(scene) {
    var geometry = new THREE.PlaneBufferGeometry( 2,2);

    var material = new THREE.ShaderMaterial( {
        uniforms: {
            resolution : { type : 'v2', value : new THREE.Vector2( window.innerWidth, window.innerHeight) },
            decode : { value: true},
         },
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        vertexShader: document.getElementById( 'vertexShader' ).textContent
    });

    var shaderObject = new THREE.Mesh( geometry, material );
    scene.add( shaderObject );

    this.update = function(time, sceneControls) {
       material.uniforms.decode.value = sceneControls.decode;
    }
}
