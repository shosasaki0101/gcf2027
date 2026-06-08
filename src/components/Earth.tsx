import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface EarthProps {
  size?: number;
}

const Earth: React.FC<EarthProps> = ({ size = 80 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const isInitializedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!mountRef.current || isInitializedRef.current) return;

    // 初期化フラグを設定
    isInitializedRef.current = true;

    // 既存の全ての子要素を削除
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // シーンの設定
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // カメラの設定
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = size * 2;

    // レンダラーの設定
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(size * 2, size * 2);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // 地球のテクスチャを読み込んで作成
    const createEarth = async () => {
      try {
        // TextureLoaderを使用してテクスチャを読み込み
        const textureLoader = new THREE.TextureLoader();
        
        // 無料で利用できる地球テクスチャを使用
        // NASA Blue Marble テクスチャ（パブリックドメイン）
        const earthTexture = await new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_2048.jpg/1024px-Land_ocean_ice_2048.jpg',
            resolve,
            undefined,
            reject
          );
        });

        // ジオメトリを作成
        const geometry = new THREE.SphereGeometry(size * 0.8, 64, 32);
        
        // マテリアルを作成
        const material = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: earthTexture,
          transparent: true,
          opacity: 0.9
        });

        // メッシュを作成
        const earth = new THREE.Mesh(geometry, material);
        earthRef.current = earth;
        scene.add(earth);
        
      } catch (error) {
        console.warn('地球テクスチャの読み込みに失敗しました。フォールバック地球を使用します。', error);
        
        // フォールバック: Canvas APIで作成したテクスチャ
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 512;
        const context = canvas.getContext('2d')!;
        
        // 地球の背景色（海）
        context.fillStyle = '#1e40af';
        context.fillRect(0, 0, 1024, 512);
        
        // 大陸のような形状を描画
        context.fillStyle = '#22c55e';
        
        // アフリカ大陸
        context.beginPath();
        context.ellipse(550, 200, 60, 120, 0, 0, 2 * Math.PI);
        context.fill();
        
        // アジア
        context.beginPath();
        context.ellipse(700, 150, 120, 80, 0, 0, 2 * Math.PI);
        context.fill();
        
        // 北アメリカ
        context.beginPath();
        context.ellipse(200, 120, 80, 100, 0, 0, 2 * Math.PI);
        context.fill();
        
        // 南アメリカ
        context.beginPath();
        context.ellipse(250, 320, 50, 120, 0, 0, 2 * Math.PI);
        context.fill();
        
        const fallbackTexture = new THREE.CanvasTexture(canvas);
        const geometry = new THREE.SphereGeometry(size * 0.8, 64, 32);
        const material = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          map: fallbackTexture,
          transparent: true,
          opacity: 0.9
        });

        const earth = new THREE.Mesh(geometry, material);
        earthRef.current = earth;
        scene.add(earth);
      }
    };

    createEarth();

    // ライトの設定
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // アニメーションループ
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.005;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // クリーンアップ関数
    return () => {
      isInitializedRef.current = false;
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        try {
          mountRef.current.removeChild(renderer.domElement);
        } catch {
          // 既に削除されている場合のエラーを無視
        }
      }
      renderer.dispose();
      
      // シーン内のすべてのオブジェクトを削除
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
        sceneRef.current.clear();
      }
    };
  }, [size]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: size * 2, 
        height: size * 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} 
    />
  );
};

export default Earth;
