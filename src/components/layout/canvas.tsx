import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload } from "@react-three/drei"
import useStore from "@/helpers/store"
import { useEffect, useRef } from "react"
import WebCamera from "./webCamera"
import MindArViewer from "./minarViewer"

const LControl = () => {
  const dom = useStore((state) => state.dom)
  const control = useRef(null)

  useEffect(() => {
    if (control.current) {
      const domElement = dom.current
      const originalTouchAction = domElement.style["touch-action"]
      domElement.style["touch-action"] = "none"

      return () => {
        domElement.style["touch-action"] = originalTouchAction
      }
    }
  }, [dom, control])
  // @ts-ignore
  return <OrbitControls ref={control} domElement={dom.current} />
}
const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <div>
      <WebCamera />
      <Canvas
        style={{
          position: "absolute",
          top: 0,
        }}
        onCreated={(state) => state.events.connect(dom.current)}
      >
        <LControl />
        <Preload all />
        {children}
      </Canvas>
    </div>
  )
}

export default LCanvas
