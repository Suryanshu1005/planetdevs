import React, {useEffect, useRef} from "react";
import "./HeroSection.css";
import HoverMagneticButton from "../HoverMagneticButton/HoverMagneticButton";
import * as THREE from "three";

const HeroSection = () => {
  const globeContainerRef = useRef(null);

  useEffect(() => {
    if (!globeContainerRef.current) return;

    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const container = globeContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.z = 200;

    // Set up the renderer with alpha for transparency
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Clear container and append renderer
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Create the globe
    const radius = 100;
    const segments = 64;
    const globe = new THREE.Group();
    scene.add(globe);

    // Create base sphere with GitHub's dark blue color
    const sphereGeometry = new THREE.SphereGeometry(radius, segments, segments);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x0d1117, // GitHub dark theme color
      transparent: true,
      opacity: 0.8,
    });
    const baseSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    globe.add(baseSphere);

    // Create dot grid for the globe (like GitHub)
    const dotsGeometry = new THREE.BufferGeometry();
    const positions = [];
    const sizes = [];
    const colors = [];

    // Create a grid of dots on the sphere
    for (let lat = -90; lat <= 90; lat += 15) {
      const radius = Math.cos((Math.abs(lat) * Math.PI) / 180) * 50;
      const circumference = radius * Math.PI * 2;
      const dotsPerRow = Math.floor(circumference / 5);

      if (dotsPerRow > 0) {
        const angleStep = 360 / dotsPerRow;

        for (let long = 0; long < 360; long += angleStep) {
          const phi = ((90 - lat) * Math.PI) / 180;
          const theta = (long * Math.PI) / 180;

          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);

          positions.push(x, y, z);

          // Dot size - smaller near poles
          const dotSize = 0.5 + Math.cos(phi) * 0.5;
          sizes.push(dotSize);

          // Add colors - GitHub uses different shades of blue
          const intensity = 0.6 + Math.random() * 0.4;
          colors.push(0.1 * intensity, 0.5 * intensity, 0.8 * intensity);
        }
      }
    }

    dotsGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    dotsGeometry.setAttribute(
      "size",
      new THREE.Float32BufferAttribute(sizes, 1)
    );
    dotsGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );

    // Create dots material
    const dotsMaterial = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
    });

    const dots = new THREE.Points(dotsGeometry, dotsMaterial);
    globe.add(dots);

    // Add glow effect (similar to GitHub)
    const glowGeometry = new THREE.SphereGeometry(radius * 1.2, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        viewVector: {value: camera.position},
      },
      vertexShader: `
        uniform vec3 viewVector;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize(normalMatrix * normal);
          vec3 vNormel = normalize(normalMatrix * viewVector);
          intensity = pow(0.6 - dot(vNormal, vNormel), 2.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying float intensity;
        void main() {
          vec3 glow = vec3(0.1, 0.5, 0.8) * intensity;
          gl_FragColor = vec4(glow, 0.3 * intensity);
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Add some connections like GitHub (randomly for demo)
    const connectionLines = new THREE.Group();
    globe.add(connectionLines);

    const createConnection = (startLat, startLng, endLat, endLng, color) => {
      // Convert lat/lng to 3D positions
      const startPhi = ((90 - startLat) * Math.PI) / 180;
      const startTheta = (startLng * Math.PI) / 180;
      const endPhi = ((90 - endLat) * Math.PI) / 180;
      const endTheta = (endLng * Math.PI) / 180;

      const startX = radius * Math.sin(startPhi) * Math.cos(startTheta);
      const startY = radius * Math.cos(startPhi);
      const startZ = radius * Math.sin(startPhi) * Math.sin(startTheta);

      const endX = radius * Math.sin(endPhi) * Math.cos(endTheta);
      const endY = radius * Math.cos(endPhi);
      const endZ = radius * Math.sin(endPhi) * Math.sin(endTheta);

      // Create a bezier curve path for a nice arc
      const distanceFactor = 1.3;
      const midHeight =
        Math.sqrt(
          Math.pow(endX - startX, 2) +
            Math.pow(endY - startY, 2) +
            Math.pow(endZ - startZ, 2)
        ) *
        0.5 *
        distanceFactor;

      const midX = (startX + endX) * 0.5;
      const midY = (startY + endY) * 0.5 + midHeight;
      const midZ = (startZ + endZ) * 0.5;

      // Create curve
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(startX, startY, startZ),
        new THREE.Vector3(midX, midY, midZ),
        new THREE.Vector3(endX, endY, endZ)
      );

      // Create curve geometry
      const points = curve.getPoints(50);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

      // Create line material
      const lineMaterial = new THREE.LineBasicMaterial({
        color: color || 0x4dabf7,
        transparent: true,
        opacity: 0.5,
      });

      // Create line
      const line = new THREE.Line(lineGeometry, lineMaterial);
      return line;
    };

    // Add some random connections
    const connectionLocations = [
      {lat: 37.7749, lng: -122.4194}, // San Francisco
      {lat: 40.7128, lng: -74.006}, // New York
      {lat: 51.5074, lng: -0.1278}, // London
      {lat: 48.8566, lng: 2.3522}, // Paris
      {lat: 35.6762, lng: 139.6503}, // Tokyo
      {lat: -33.8688, lng: 151.2093}, // Sydney
      {lat: 55.7558, lng: 37.6173}, // Moscow
      {lat: -22.9068, lng: -43.1729}, // Rio
      {lat: 1.3521, lng: 103.8198}, // Singapore
    ];

    // Create 10 random connections
    for (let i = 0; i < 10; i++) {
      const start =
        connectionLocations[
          Math.floor(Math.random() * connectionLocations.length)
        ];
      const end =
        connectionLocations[
          Math.floor(Math.random() * connectionLocations.length)
        ];

      if (start !== end) {
        const connection = createConnection(
          start.lat,
          start.lng,
          end.lat,
          end.lng,
          0x4dabf7 // GitHub blue
        );
        connectionLines.add(connection);
      }
    }

    // Add activity "pulses" (GitHub-style hot spots)
    const addActivityPulse = (lat, lng) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = (lng * Math.PI) / 180;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      const pulseGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: 0x8be9fd,
        transparent: true,
        opacity: 1,
      });

      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.set(x, y, z);

      // Add animation data
      pulse.userData = {
        startTime: Date.now() + Math.random() * 2000,
        duration: 2000 + Math.random() * 1000,
      };

      globe.add(pulse);
      return pulse;
    };

    // Add some activity pulses
    const pulses = [];
    connectionLocations.forEach((location) => {
      pulses.push(addActivityPulse(location.lat, location.lng));
    });

    // Set up auto-rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    // Add interactive rotation
    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.0;
      mouseY = (event.clientY - windowHalfY) * 0.0;

      targetRotationY = (mouseX - globe.rotation.y) * 0.0;
      targetRotationX = (mouseY - globe.rotation.x) * 0.0;
    };

    document.addEventListener("mousemove", onDocumentMouseMove, false);

    // Handle window resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      windowHalfX = width;
      windowHalfY = height;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      // Auto-rotate when not interacting
      globe.rotation.y += 0.001;

      // Add some interactive rotation
      globe.rotation.y += targetRotationY;
      globe.rotation.x += targetRotationX;

      // Limit x rotation to avoid seeing "under" the globe
      globe.rotation.x = Math.max(
        -Math.PI / 4,
        Math.min(Math.PI / 4, globe.rotation.x)
      );

      // Reduce target rotation for smooth deceleration
      targetRotationY *= 1;
      targetRotationX *= 0.9;

      // Animate pulses
      const now = Date.now();
      pulses.forEach((pulse) => {
        const elapsed = now - pulse.userData.startTime;
        if (elapsed > 0 && elapsed < pulse.userData.duration) {
          const progress = elapsed / pulse.userData.duration;

          // Pulse grows and fades
          const scale = 1 + progress * 10;
          pulse.scale.set(scale, scale, scale);
          pulse.material.opacity = 1 - progress;
        } else if (elapsed >= pulse.userData.duration) {
          // Reset pulse
          pulse.scale.set(1, 1, 1);
          pulse.material.opacity = 1;
          pulse.userData.startTime = now + Math.random() * 2000;
        }
      });

      renderer.render(scene, camera);
      return animationId;
    };

    const animationId = animate();

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", onDocumentMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);

      // Dispose of all geometries and materials
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="container-global">
      <div className="row">
        <div className="col-md-6">
          {/* Globe Container */}
          <div
            ref={globeContainerRef}
            className="globe-container img-fluid d-sm-flex d-block banner-image-center"
          >
            {/* The globe will be rendered here */}
            <div className="globe-loading">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 ms-auto">
          <div className="banner-content">
            <h1 className="banner-title-1">Creative Solutions Real Results</h1>
          </div>
          <div className="attract-hover">
            <HoverMagneticButton text={"Get a Quote"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
