var container, controls, camera, renderer, scene, light,
rotationSpeed = 0.4,
clock = new THREE.Clock(),
WIDTH = window.innerWidth,
HEIGHT = window.innerHeight;
            
//cam vars
var angle = 45,
aspect = WIDTH / HEIGHT,
near = 0.01,
far = 10000000;

//mesh vars
var earthMesh, Atmos, AtmosMat;
       
    // container = document.createElement('div');
    // document.body.appendChild(container);
    container = document.getElementById('div');
                
    //cam
    camera = new THREE.PerspectiveCamera(angle, aspect, near, far);
    camera.position.set(1380, -17, 394);
                
     //scene
    scene = new THREE.Scene();
    camera.lookAt(scene.position);
                 
            
    //light          
    light = new THREE.SpotLight(0xFFFFFF, 1, 0, Math.PI / 2, 1);
    light.position.set(4000, 4000, 1500);
    light.target.position.set (1000, 3800, 1000);
    light.castShadow = true;
    //light.shadowCameraNear = 1;
    //light.shadowCameraFar = 10000;
    //light.shadowCameraFov = 50;

    scene.add(light);

    //EARTH
    var earthGeo = new THREE.SphereGeometry (400, 800, 800),
        earthMat = new THREE.MeshPhongMaterial();
    earthMesh = new THREE.Mesh(earthGeo, earthMat);
                
    earthMesh.position.set(-50, 0, 0);
    earthMesh.rotation.y=5;
    scene.add(earthMesh);
                
    //diffuse
    earthMat.map = THREE.ImageUtils.loadTexture('https://raw.githubusercontent.com/BHouwens/SolarSim/master/images/earthmap1k.jpg');
    //bump
    earthMat.bumpMap = THREE.ImageUtils.loadTexture('https://raw.githubusercontent.com/BHouwens/SolarSim/master/images/elev_bump_16ka.jpg');
    earthMat.bumpScale = 8;
    //specular
    earthMat.specularMap = THREE.ImageUtils.loadTexture('./img/earthspec1k.jpg');
    earthMat.specular = new THREE.Color('#2e2e2e');
               
    earthMesh.castShadow = true;
    earthMesh.receiveShadow = true;
       
    //Atmosphere
    AtmosMat = new THREE.ShaderMaterial({
      uniforms:{
        "c": { type: "f", value: 0.3 },
        "p": { type: "f", value: 5.2},
        glowColor: { type: "c", value: new THREE.Color(0x00dbdb)},
        viewVector: { type: "v3", value: camera.position}
      },
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    Atmos = new THREE.Mesh(earthGeo, AtmosMat);
    Atmos.position = earthMesh.position;
    Atmos.scale.multiplyScalar(1.2);
    scene.add(Atmos);

    //STARS
    var starGeo = new THREE.SphereGeometry (3000, 10, 100),
        starMat = new THREE.MeshBasicMaterial();
    starMat.map = THREE.ImageUtils.loadTexture('./img/star-field.png');
    starMat.side = THREE.BackSide;
                
    var starMesh = new THREE.Mesh(starGeo, starMat);
                
    scene.add(starMesh);
                
                
    //renderer
    renderer = new THREE.WebGLRenderer({antialiasing : true});
    renderer.setSize(WIDTH, HEIGHT);
                
    container.appendChild(renderer.domElement);


    //controls
    controls = new THREE.OrbitControls( camera, renderer.domElement);
    controls.addEventListener( 'change', render );

            
      function animate(){
                
        requestAnimationFrame(animate);
        controls.update();
        render();       
      }
            
      function render(){
        var delta = clock.getDelta();

				earthMesh.rotation.y += rotationSpeed * delta;
        renderer.clear();
        renderer.render(scene, camera); 
      }

animate();