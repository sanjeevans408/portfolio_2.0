import type { ThreeElements } from "@react-three/fiber";

// React Three Fiber v8 augments the legacy global JSX namespace. React 19
// reads intrinsic elements from React.JSX, so bridge the two namespaces while
// this app remains on React 18 + R3F v8.
declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
