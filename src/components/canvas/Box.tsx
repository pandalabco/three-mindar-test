import useStore from '@/helpers/store'
import { Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, OrbitControls, useGLTF } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'

const Level = () => {
  const { nodes }: any = useGLTF('https://kheke.csb.app/level-react-draco.glb')
  const { camera } = useThree()
  useSpring(
    () => ({
      from: { y: camera.position.y + 5 },
      to: { y: camera.position.y },
      config: { friction: 100 },
      onChange: ({ value }) => (
        (camera.position.y = value.y), camera.lookAt(0, 0, 0)
      ),
    }),
    []
  )
  return (
    <mesh
      geometry={nodes.Level.geometry}
      material={nodes.Level.material}
      position={[-0.38, 0.69, 0.62]}
      rotation={[Math.PI / 2, -Math.PI / 9, 0]}
    />
  )
}

const Cactus = () => {
  const { nodes, materials }: any = useGLTF(
    'https://kheke.csb.app/level-react-draco.glb'
  )
  return (
    <mesh
      geometry={nodes.Cactus.geometry}
      position={[-0.42, 0.51, -0.62]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <MeshWobbleMaterial factor={0.4} map={materials.Cactus.map} />
    </mesh>
  )
}

const Sudo = () => {
  const { nodes, materials }: any = useGLTF(
    'https://kheke.csb.app/level-react-draco.glb'
  )
  const [spring, api] = useSpring(
    () => ({ config: { friction: 40 }, rotation: [Math.PI / 2, 0, 0.29] }),
    []
  )
  useEffect(() => {
    let timeout
    const wander = () => {
      api.start({
        rotation: [
          Math.PI / 2 + THREE.MathUtils.randFloatSpread(2) * 0.3,
          0,
          0.29 + THREE.MathUtils.randFloatSpread(2) * 0.2,
        ],
      })
      timeout = setTimeout(wander, (1 + Math.random() * 3) * 1000)
    }
    wander()
    return () => clearTimeout(timeout)
  }, [])
  return (
    <>
      <mesh
        geometry={nodes.Sudo.geometry}
        material={nodes.Sudo.material}
        position={[0.68, 0.33, -0.67]}
        rotation={[Math.PI / 2, 0, 0.29]}
      />
      <mesh
        geometry={nodes?.SudoHead.geometry as any}
        material={nodes?.SudoHead.material as any}
        position={[0.68, 0.33, -0.67]}
        {...spring}
      />
    </>
  )
}

const BoxComponent = ({ route }) => {
  const router = useStore((s) => s.router)
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) =>
  //   mesh.current
  //     ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.01)
  //     : null
  // )
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <mesh
        ref={mesh}
        onClick={() => router.push(route)}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <group position-y={-0.75} dispose={null}>
          <Level />
          <Cactus />
          <Sudo />
        </group>
        {/* <boxBufferGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial color={route === '/' ? 'orange' : 'hotpink'} /> */}
      </mesh>
      <directionalLight position={[5, 5, 5]} />
      <ambientLight />
    </>
  )
}
export default BoxComponent
