//@ts-nocheck

// import dynamic from "next/dynamic"
// import {Entity, Scene} from 'aframe-react';
// // import Shader from '@/components/canvas/Shader/Shader'

// // Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// // WARNING ! errors might get obfuscated by using dynamic import.
// // If something goes wrong go back to a static import to show the error.
// // https://github.com/pmndrs/react-three-next/issues/49
// const Shader = dynamic(() => import("@/components/canvas/Shader/Shader"), {
//   ssr: false,
// })

// // dom components goes here
// const Page = (props) => {
//   return (
//     <div className="flex flex-col justify-center items-center w-full h-full">
//       <h1>Hola Matti</h1>
//     </div>
//   )
// }

// // canvas components goes here
// // It will receive same props as Page component (from getStaticProps, etc.)
// Page.dude = (props) => (
//   <>
//     <Shader />
//   </>
// )

// export default Page

// export async function getStaticProps() {
//   return {
//     props: {
//       title: "Index",
//     },
//   }
// }

// import React, { useEffect, useRef } from "react"
// import { Entity, Scene } from "aframe-react"
// import { AFrameRenderer } from "react-ar-next"

// const MindARViewer = () => {
//   const sceneRef = useRef(null)

//   useEffect(() => {
//     const sceneEl = sceneRef.current
//     const arSystem = sceneEl.systems["mindar-image-system"]
//     sceneEl.addEventListener("renderstart", () => {
//       //arSystem.start() // start AR
//       console.log(
//         "🚀 ~ file: index.tsx ~ line 52 ~ sceneEl.addEventListener ~ arSystem.start()"
//       )
//     })
//     return () => {
//       //arSystem.stop()
//       console.log("🚀 ~ file: index.tsx ~ line 59 ~ return ~ arSystem.stop()")
//     }
//   }, [])
//   return (
//     <a-scene
//       ref={sceneRef}
//       mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.mind; autoStart: false; uiLoading: no; uiError: no; uiScanning: no;"
//       color-space="sRGB"
//       embedded
//       renderer="colorManagement: true, physicallyCorrectLights"
//       vr-mode-ui="enabled: false"
//       device-orientation-permission-ui="enabled: false"
//     >
//       <a-assets>
//         <img
//           id="card"
//           src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.png"
//         />
//         <a-asset-item
//           id="avatarModel"
//           src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/softmind/scene.gltf"
//         ></a-asset-item>
//       </a-assets>

//       <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

//       <a-entity mindar-image-target="targetIndex: 0">
//         <a-plane
//           src="#card"
//           position="0 0 0"
//           height="0.552"
//           width="1"
//           rotation="0 0 0"
//         ></a-plane>
//         <a-gltf-model
//           rotation="0 0 0 "
//           position="0 0 0.1"
//           scale="0.005 0.005 0.005"
//           src="#avatarModel"
//           animation="property: position; to: 0 0.1 0.1; dur: 1000; easing: easeInOutQuad; loop: true; dir: alternate"
//         ></a-gltf-model>
//       </a-entity>
//     </a-scene>
//   )
// }

import React, { useEffect, useRef } from 'react'
import { Entity, Scene } from 'aframe-react'
import Script from 'next/script'

const MindAr = () => {
  const sceneRef = useRef(null)
  console.log(
    '🚀 ~ file: index.tsx ~ line 109 ~ MindAr ~ sceneRef',
    sceneRef.current
  )

  useEffect(() => {
    const sceneEl = sceneRef.current
    const arSystem = sceneEl.systems['mindar-image-system']
    console.log(
      '🚀 ~ file: index.tsx ~ line 111 ~ useEffect ~ sceneEl',
      sceneEl,
      sceneEl.systems['mindar-image-system']
    )
    sceneEl.addEventListener('renderstart', () => {
      arSystem?.start ? arSystem.start() : console.log('AR did not start') // start AR
    })
    return () => {
      arSystem?.stop ? arSystem.stop() : console.log('AR did not stop')
    }
  }, [])
  // @ts-ignore
  return (
    <a-scene
      embedded
      style='width: 500px; height: 500px'
      background='color: #000000'
    >
      <a-box
        position='0 0 -2'
        rotation='0 45 0'
        width='1'
        height='1'
        depth='1'
        color='#0000FF'
      ></a-box>
      <a-camera position='1 1 5' fov='50' near='0.1' />
    </a-scene>
  )
}
export default class InitPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      appRendered: false,
      color: 'red',
      start: false,
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      // require("aframe")
      // require("mind-ar/dist/mindar-image.prod.js")
      // require("mind-ar/dist/mindar-image-aframe.prod.js")
      this.setState({ appRendered: true })
    }
  }

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <h1>Hello Matti</h1>
        {!this.state.start && (
          <button
            onClick={() => {
              this.setState({ start: true })
            }}
          >
            Start
          </button>
        )}
        {this.state.start && (
          <button
            onClick={() => {
              this.setState({ start: false })
            }}
          >
            Stop
          </button>
        )}
        {this.state.appRendered && this.state.start && (
          <div className='container'>
            <MindAr />
            <video></video>
          </div>
        )}
      </div>
    )
  }
}

InitPage.displayName = 'InitPage'
/* 
          <Scene>
            <Entity
              primitive="a-plane"
              src="#groundTexture"
              rotation="-90 0 0"
              height="100"
              width="100"
            />
            <Entity primitive="a-light" type="ambient" color="#445451" />
            <Entity
              primitive="a-light"
              type="point"
              intensity="2"
              position="2 4 4"
            />
            <Entity
              primitive="a-sky"
              height="2048"
              radius="30"
              src="#skyTexture"
              theta-length="90"
              width="2048"
            />
            <Entity particle-system={{ preset: "snow", particleCount: 2000 }} />
            <Entity
              text={{ value: "Hello, A-Frame React!", align: "center" }}
              position={{ x: 0, y: 2, z: -1 }}
            />

            <Entity
              id="box"
              geometry={{ primitive: "box" }}
              material={{ color: this.state.color, opacity: 0.6 }}
              animation__rotate={{
                property: "rotation",
                dur: 2000,
                loop: true,
                to: "360 360 360",
              }}
              animation__scale={{
                property: "scale",
                dir: "alternate",
                dur: 100,
                loop: true,
                to: "1.1 1.1 1.1",
              }}
              position={{ x: 0, y: 1, z: -3 }}
              events={{ click: this.changeColor.bind(this) }}
            >
              <Entity
                animation__scale={{
                  property: "scale",
                  dir: "alternate",
                  dur: 100,
                  loop: true,
                  to: "2 2 2",
                }}
                geometry={{
                  primitive: "box",
                  depth: 0.2,
                  height: 0.2,
                  width: 0.2,
                }}
                material={{ color: "#24CAFF" }}
              />
            </Entity>

            <Entity primitive="a-camera">
              <Entity
                primitive="a-cursor"
                animation__click={{
                  property: "scale",
                  startEvents: "click",
                  from: "0.1 0.1 0.1",
                  to: "1 1 1",
                  dur: 150,
                }}
              />
            </Entity>
          </Scene>
*/
