// CORE MODULE EXPORTS FOR LUMA.GL

// WEBGL CONTEXT
export {
  isWebGL,
  isWebGL2,
  lumaStats,
  createGLContext,
  destroyGLContext,
  resizeGLContext,
  setGLContextDefaults,
  getContextInfo,
  getGLContextInfo,
  getContextLimits,
  FEATURES,
  hasFeature,
  hasFeatures,
  getFeatures,
  canCompileGLGSExtension,
  cloneTextureFrom,
  getKeyValue,
  getKey,
  cssToDeviceRatio,
  cssToDevicePixels,
  // DEPRECATED
  setGLContextDefaults as setContextDefaults,
  getContextDebugInfo as glGetDebugInfo
} from '@luma.gl/webgl';

export {
  trackContextState,
  resetParameters,
  getParameter,
  getParameters,
  setParameter,
  setParameters,
  withParameters,
  getModifiedParameters
} from '@luma.gl/webgl-state-tracker';

// WEBGL1 OBJECTS/FUNCTIONS
export {
  Buffer,
  Shader,
  VertexShader,
  FragmentShader,
  Program,
  Framebuffer,
  Renderbuffer,
  Texture2D,
  TextureCube,
  clear,
  clearBuffer,
  // Copy and Blit
  readPixelsToArray,
  readPixelsToBuffer,
  copyToDataUrl,
  copyToImage,
  copyToTexture,
  blit
} from '@luma.gl/webgl';

export {
  // WebGL2 classes & Extensions
  Query,
  Texture3D,
  TransformFeedback,
  VertexArrayObject,
  VertexArray,
  UniformBufferLayout,
  setPathPrefix,
  loadFile,
  loadImage,
  // experimental WebGL exports
  Accessor as _Accessor,
  clearBuffer as _clearBuffer
} from '@luma.gl/webgl';

// CORE - WEBGL INDEPENDENT
export {default as Geometry} from './geometry/geometry';

// LIB
export {default as AnimationLoop} from './lib/animation-loop';
export {encodePickingColor, decodePickingColor, getNullPickingColor} from './lib/picking-colors';
export {default as Model} from './lib/model';
export {default as Transform} from './lib/transform/transform';
export {default as ClipSpace} from './lib/clip-space';

// Resource Management
export {default as ProgramManager} from './resource-management/program-manager';

// Experimental core exports
export {default as _AnimationLoopProxy} from './lib/animation-loop-proxy';

// Geometries
export {default as ConeGeometry} from './geometries/cone-geometry';
export {default as CubeGeometry} from './geometries/cube-geometry';
export {default as CylinderGeometry} from './geometries/cylinder-geometry';
export {default as IcoSphereGeometry} from './geometries/ico-sphere-geometry';
export {default as PlaneGeometry} from './geometries/plane-geometry';
export {default as SphereGeometry} from './geometries/sphere-geometry';
export {default as TruncatedConeGeometry} from './geometries/truncated-cone-geometry';

// SCENEGRAPH

// Core nodes
export {default as ScenegraphNode} from './scenegraph/nodes/scenegraph-node';
export {default as GroupNode} from './scenegraph/nodes/group-node';
export {default as ModelNode} from './scenegraph/nodes/model-node';

// TODO/CLEAN UP FOR V7
//  We should have a minimal set of forwarding exports from shadertools (ideally none)
//  Analyze risk of breaking apps
export {
  registerShaderModules,
  setDefaultShaderModules,
  getDefaultShaderModules,
  assembleShaders,
  createShaderHook,
  createModuleInjection,
  // HELPERS
  combineInjects,
  normalizeShaderModule,
  // SHADER MODULES
  fp32,
  fp64,
  project,
  lights,
  dirlight,
  picking,
  diffuse,
  gouraudlighting,
  phonglighting,
  pbr,
  // experimental
  _transform,
  MODULAR_SHADERS,
  getQualifierDetails,
  getPassthroughFS,
  typeToChannelSuffix,
  typeToChannelCount,
  convertToVec4
} from '@luma.gl/shadertools';

// UTILS: undocumented API for other luma.gl modules
export {log, assert, uid, self, window, global, document} from '@luma.gl/webgl';
