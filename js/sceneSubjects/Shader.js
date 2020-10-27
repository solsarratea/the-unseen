function Shader(scene) {

    var geometry = new THREE.PlaneBufferGeometry( 2,2);

    var material = new THREE.ShaderMaterial( {
        uniforms: {
            "time": { value: 0.0 }
         },
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        vertexShader: document.getElementById( 'vertexShader' ).textContent
    });

    var shaderObject = new THREE.Mesh( geometry, material );
    scene.add( shaderObject );




	this.update = function(time) {
            material.uniforms.time = time;

        }

}
