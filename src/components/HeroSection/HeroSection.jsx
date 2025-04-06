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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

    const continents = [
      {
        name: "North America",
        color: 0x4dabf7,
        points: [
          {lat: 83, lng: -75},
          {lat: 70, lng: -165},
          {lat: 60, lng: -165},
          {lat: 50, lng: -125},
          {lat: 30, lng: -120},
          {lat: 15, lng: -90},
          {lat: 15, lng: -60},
          {lat: 50, lng: -50},
          {lat: 70, lng: -60},
          {lat: 83, lng: -75},
        ],
      },
      {
        name: "South America",
        color: 0x38b2ac,
        points: [
          {lat: 15, lng: -80},
          {lat: 5, lng: -80},
          {lat: -10, lng: -75},
          {lat: -20, lng: -70},
          {lat: -50, lng: -75},
          {lat: -55, lng: -65},
          {lat: -35, lng: -40},
          {lat: -20, lng: -40},
          {lat: 0, lng: -50},
          {lat: 10, lng: -60},
          {lat: 15, lng: -80},
        ],
      },
      {
        name: "Europe",
        color: 0x6366f1,
        points: [
          {lat: 60, lng: -10},
          {lat: 60, lng: 20},
          {lat: 45, lng: 40},
          {lat: 40, lng: 40},
          {lat: 35, lng: 25},
          {lat: 35, lng: -10},
          {lat: 43, lng: -10},
          {lat: 60, lng: -10},
        ],
      },
      {
        name: "Africa",
        color: 0xf59e0b,
        points: [
          {lat: 35, lng: -10},
          {lat: 35, lng: 25},
          {lat: 30, lng: 35},
          {lat: 10, lng: 50},
          {lat: -30, lng: 30},
          {lat: -35, lng: 20},
          {lat: -30, lng: 15},
          {lat: -20, lng: 17},
          {lat: 0, lng: 10},
          {lat: 15, lng: -15},
          {lat: 35, lng: -10},
        ],
      },
      {
        name: "Asia",
        color: 0xec4899,
        points: [
          {lat: 65, lng: 30},
          {lat: 70, lng: 60},
          {lat: 70, lng: 140},
          {lat: 50, lng: 140},
          {lat: 20, lng: 110},
          {lat: 10, lng: 100},
          {lat: 0, lng: 95},
          {lat: 5, lng: 80},
          {lat: 25, lng: 60},
          {lat: 40, lng: 40},
          {lat: 65, lng: 30},
        ],
      },
      {
        name: "Australia",
        color: 0x8b5cf6,
        points: [
          {lat: -10, lng: 110},
          {lat: -20, lng: 120},
          {lat: -30, lng: 115},
          {lat: -35, lng: 120},
          {lat: -35, lng: 150},
          {lat: -25, lng: 155},
          {lat: -15, lng: 145},
          {lat: -10, lng: 135},
          {lat: -10, lng: 110},
        ],
      },
    ];

    // Create continent outlines and interactive elements
    const continentGroups = [];
    continents.forEach((continent) => {
      const continentGroup = new THREE.Group();
      continentGroup.name = continent.name;

      // Convert lat/lng points to 3D coordinates
      const positions = [];
      continent.points.forEach((point) => {
        const phi = ((90 - point.lat) * Math.PI) / 180;
        const theta = (point.lng * Math.PI) / 180;

        const x = (radius + 0.5) * Math.sin(phi) * Math.cos(theta);
        const y = (radius + 0.5) * Math.cos(phi);
        const z = (radius + 0.5) * Math.sin(phi) * Math.sin(theta);

        positions.push(new THREE.Vector3(x, y, z));
      });

      // Create outlines
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(positions);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: continent.color,
        linewidth: 2,
      });
      const line = new THREE.Line(lineGeometry, lineMaterial);
      continentGroup.add(line);

      // Create continent surface (for hover/interaction)
      const triangles = [];
      for (let i = 1; i < positions.length - 1; i++) {
        triangles.push(positions[0], positions[i], positions[i + 1]);
      }

      const surfaceGeometry = new THREE.BufferGeometry().setFromPoints(
        [].concat(...triangles)
      );
      const surfaceMaterial = new THREE.MeshBasicMaterial({
        color: continent.color,
        transparent: true,
        opacity: 0.1,
        side: THREE.DoubleSide,
      });
      const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
      surface.userData = {continent: continent.name};
      continentGroup.add(surface);

      // Add hover indicator for this continent (starts invisible)
      const hoverIndicator = new THREE.Mesh(
        new THREE.SphereGeometry(radius * 1.01, 16, 16),
        new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          side: THREE.FrontSide,
        })
      );
      hoverIndicator.scale.set(0, 0, 0);
      continentGroup.add(hoverIndicator);

      globe.add(continentGroup);
    });

    // Add connection lines like GitHub (connect major cities in each continent)
    const connectionLines = new THREE.Group();
    globe.add(connectionLines);

    // Major tech hubs around the world
    const techHubs = [
      {
        name: "San Francisco",
        lat: 37.7749,
        lng: -122.4194,
        continent: "North America",
      },
      {
        name: "New York",
        lat: 40.7128,
        lng: -74.006,
        continent: "North America",
      },
      {
        name: "Toronto",
        lat: 43.6532,
        lng: -79.3832,
        continent: "North America",
      },
      {name: "London", lat: 51.5074, lng: -0.1278, continent: "Europe"},
      {name: "Berlin", lat: 52.52, lng: 13.405, continent: "Europe"},
      {name: "Paris", lat: 48.8566, lng: 2.3522, continent: "Europe"},
      {name: "Beijing", lat: 39.9042, lng: 116.4074, continent: "Asia"},
      {name: "Tokyo", lat: 35.6762, lng: 139.6503, continent: "Asia"},
      {name: "Singapore", lat: 1.3521, lng: 103.8198, continent: "Asia"},
      {name: "Sydney", lat: -33.8688, lng: 151.2093, continent: "Australia"},
      {
        name: "São Paulo",
        lat: -23.5505,
        lng: -46.6333,
        continent: "South America",
      },
      {name: "Cairo", lat: 30.0444, lng: 31.2357, continent: "Africa"},
      {name: "Nairobi", lat: -1.2921, lng: 36.8219, continent: "Africa"},
    ];

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

      // Create curve geometry with more points for smoother curves
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

    // Create connections between cities in the same continent
    continents.forEach((continent) => {
      const continentHubs = techHubs.filter(
        (hub) => hub.continent === continent.name
      );
      if (continentHubs.length >= 2) {
        // Connect each hub to at least one other hub in the same continent
        for (let i = 0; i < continentHubs.length; i++) {
          const nextIndex = (i + 1) % continentHubs.length;
          const connection = createConnection(
            continentHubs[i].lat,
            continentHubs[i].lng,
            continentHubs[nextIndex].lat,
            continentHubs[nextIndex].lng,
            continent.color
          );
          connectionLines.add(connection);
        }
      }
    });

    // Add activity "pulses" (GitHub-style hot spots)
    const addActivityPulse = (lat, lng, color) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = (lng * Math.PI) / 180;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      const pulseGeometry = new THREE.SphereGeometry(0.8, 16, 16);
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: color || 0x8be9fd,
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

    // Add pulses at tech hub locations with continent colors
    const pulses = [];
    techHubs.forEach((hub) => {
      const continentData = continents.find((c) => c.name === hub.continent);
      pulses.push(
        addActivityPulse(
          hub.lat,
          hub.lng,
          continentData ? continentData.color : 0x8be9fd
        )
      );
    });

    // Set up raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredContinent = null;
    let infoTooltip = null;

    // Create info tooltip
    const createInfoTooltip = () => {
      const tooltip = document.createElement("div");
      tooltip.className = "globe-tooltip";
      tooltip.style.position = "absolute";
      tooltip.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
      tooltip.style.color = "white";
      tooltip.style.padding = "10px";
      tooltip.style.borderRadius = "4px";
      tooltip.style.fontSize = "14px";
      tooltip.style.pointerEvents = "none";
      tooltip.style.opacity = "0";
      tooltip.style.transition = "opacity 0.3s";
      tooltip.style.zIndex = "1000";
      tooltip.style.maxWidth = "200px";
      document.body.appendChild(tooltip);
      return tooltip;
    };

    infoTooltip = createInfoTooltip();

    // Handle mouse move for interactive hover
    const onDocumentMouseMove = (event) => {
      // Get normalized mouse position
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update the picking ray with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Find intersected objects
      const intersects = raycaster.intersectObjects(
        continentGroups.map((item) => item.group.children).flat(),
        true
      );

      // Reset all indicators
      continentGroups.forEach((item) => {
        item.indicator.material.opacity = 0;
        item.indicator.scale.set(0, 0, 0);
      });

      infoTooltip.style.opacity = "0";

      if (intersects.length > 0) {
        // Find the closest continent
        const intersect = intersects[0];
        const clickedObj = intersect.object;

        if (clickedObj.userData && clickedObj.userData.continent) {
          const continentName = clickedObj.userData.continent;
          const continentData = continentGroups.find(
            (item) => item.name === continentName
          );

          if (continentData) {
            // Show highlight
            continentData.indicator.material.opacity = 0.2;
            continentData.indicator.scale.set(1, 1, 1);
            hoveredContinent = continentData;

            // Show tooltip
            infoTooltip.textContent = continentName;
            infoTooltip.style.opacity = "1";
            infoTooltip.style.left = `${event.clientX + 10}px`;
            infoTooltip.style.top = `${event.clientY + 10}px`;
          }
        }
      } else {
        hoveredContinent = null;
      }
    };

    // Handle touch events for mobile
    const onTouchStart = (event) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        onDocumentMouseMove(touch);
      }
    };

    // Click handling for continents
    const onDocumentClick = () => {
      if (hoveredContinent) {
        // Execute action when continent is clicked
        console.log(`${hoveredContinent.name} was clicked`);

        // Create a pulse flash effect on the clicked continent
        const continentCenter = findContinentCenter(hoveredContinent.name);
        if (continentCenter) {
          const flashPulse = addActivityPulse(
            continentCenter.lat,
            continentCenter.lng,
            0xffffff
          );
          flashPulse.userData.duration = 1000; // Shorter duration for click feedback
        }
      }
    };

    // Helper function to find approximate continent center
    const findContinentCenter = (continentName) => {
      const continent = continents.find((c) => c.name === continentName);
      if (!continent) return null;

      // Calculate average of all points as an approximation
      let sumLat = 0,
        sumLng = 0;
      continent.points.forEach((point) => {
        sumLat += point.lat;
        sumLng += point.lng;
      });

      return {
        lat: sumLat / continent.points.length,
        lng: sumLng / continent.points.length,
      };
    };

    // Set up auto-rotation
    let autoRotationSpeed = 0.001;
    // let targetRotationX = 0;
    // let targetRotationY = 0;
    let isDragging = false;
    let previousMousePosition = {x: 0, y: 0};

    // Check if device is mobile
    const isMobile = () => {
      return (
        window.innerWidth < 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };

    // Adjust camera position for smaller screens
    const adjustForMobile = () => {
      if (isMobile()) {
        // Zoom out camera on mobile for better visibility
        camera.position.z = 250;
        autoRotationSpeed = 0.0005; // Slower rotation on mobile
      } else {
        camera.position.z = 200;
        autoRotationSpeed = 0.001;
      }
      camera.updateProjectionMatrix();
    };

    adjustForMobile();

    // Mouse down event for rotation control
    const onMouseDown = (event) => {
      isDragging = true;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
      document.addEventListener("mousemove", onMouseDrag, false);
      document.addEventListener("mouseup", onMouseUp, false);
      container.style.cursor = "grabbing";
    };

    // Mouse drag event
    const onMouseDrag = (event) => {
      if (isDragging) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y,
        };

        // Adjust rotation speed
        const rotationSpeed = 0.003;

        // Update globe rotation
        globe.rotation.y += deltaMove.x * rotationSpeed;
        globe.rotation.x += deltaMove.y * rotationSpeed;

        // Limit x rotation to avoid seeing "under" the globe
        globe.rotation.x = Math.max(
          -Math.PI / 3,
          Math.min(Math.PI / 3, globe.rotation.x)
        );

        previousMousePosition = {
          x: event.clientX,
          y: event.clientY,
        };
      }
    };

    // Mouse up event
    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", onMouseDrag, false);
      document.removeEventListener("mouseup", onMouseUp, false);
      container.style.cursor = "grab";
    };

    // Touch controls for mobile
    const onTouchMove = (event) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        onMouseDrag({
          clientX: touch.clientX,
          clientY: touch.clientY,
        });
      }
    };

    // Register event listeners
    document.addEventListener("mousemove", onDocumentMouseMove, false);
    document.addEventListener("click", onDocumentClick, false);
    container.addEventListener("mousedown", onMouseDown, false);

    // Touch events for mobile
    container.addEventListener("touchstart", onTouchStart, false);
    container.addEventListener("touchmove", onTouchMove, false);

    // Set cursor style
    container.style.cursor = "grab";

    // Handle window resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      // Adjust for mobile
      adjustForMobile();
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      const animationId = requestAnimationFrame(animate);

      // Only auto-rotate when not dragging
      if (!isDragging) {
        globe.rotation.y += autoRotationSpeed;
      }

      // Animate pulses
      const now = Date.now();
      pulses.forEach((pulse) => {
        const elapsed = now - pulse.userData.startTime;
        if (elapsed > 0 && elapsed < pulse.userData.duration) {
          const progress = elapsed / pulse.userData.duration;

          // Pulse grows and fades
          const scale = 1 + progress * 10;
          pulse.scale.set(scale, scale, scale);
          // pulse.material.opacity = 1 - progress;
        } else if (elapsed >= pulse.userData.duration) {
          // Reset pulse
          pulse.scale.set(1, 1, 1);
          pulse.material.opacity = 1;
          // pulse.userData.startTime = now + Math.random() * 2000;
        }
      });

      renderer.render(scene, camera);
      return animationId;
    };

    const animationId = animate();

    // Cleanup
    return () => {
      // Remove event listeners
      document.removeEventListener("mousemove", onDocumentMouseMove);
      document.removeEventListener("click", onDocumentClick);
      container.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mousemove", onMouseDrag);
      document.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);

      // Remove tooltip
      if (infoTooltip && document.body.contains(infoTooltip)) {
        document.body.removeChild(infoTooltip);
      }

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
            style={{
              minHeight: "350px",
              position: "relative",
              width: "100%",
              touchAction: "pan-y",
            }}
          >
            {/* The globe will be rendered here */}
            <div
              className="globe-loading"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
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
