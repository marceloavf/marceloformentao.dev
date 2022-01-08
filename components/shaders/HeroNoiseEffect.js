export const vertexShader = /* glsl */ `
    precision mediump float;
    uniform float uTime;
    uniform vec2 uResolution;
    void main() {
      gl_Position = vec4( position, 1.0 );
    }
  `

export const fragmentShader = /* glsl */ `
    precision mediump float;
    uniform vec2 iResolution;
    uniform float iDpr;
    uniform float iTime;
    uniform float xOffset;
    uniform float yOffset;
    uniform float brightness;
    uniform vec3 baseColor;
    uniform vec3 backgroundColor;
    uniform float size;
    uniform float shape;
    uniform float amplitudeFactor;
    uniform sampler2D iBuffer;
    const float PI = 3.14159265359;
    vec4 j2hue(float c) {
      return .5+.5*cos(6.28*c+vec4(0,-2.1,2.1,0));
    }
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    vec2 sincos( float x ){return vec2(sin(x), cos(x));}
    vec2 rotate2d(vec2 uv, float phi){vec2 t = sincos(phi); return vec2(uv.x*t.y-uv.y*t.x, uv.x*t.x+uv.y*t.y);}
    vec3 rotate3d(vec3 p, vec3 v, float phi){ v = normalize(v); vec2 t = sincos(-phi); float s = t.x, c = t.y, x =-v.x, y =-v.y, z =-v.z; mat4 M = mat4(x*x*(1.-c)+c,x*y*(1.-c)-z*s,x*z*(1.-c)+y*s,0.,y*x*(1.-c)+z*s,y*y*(1.-c)+c,y*z*(1.-c)-x*s,0.,z*x*(1.-c)-y*s,z*y*(1.-c)+x*s,z*z*(1.-c)+c,0.,0.,0.,0.,1.);return (vec4(p,1.)*M).xyz;}
    // Classic Perlin 3D Noise
    // by Stefan Gustavson
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
    float p3d(vec3 P){
      vec3 Pi0 = floor(P);
      vec3 Pi1 = Pi0 + vec3(1.0);
      Pi0 = mod(Pi0, 289.0);
      Pi1 = mod(Pi1, 289.0);
      vec3 Pf0 = fract(P);
      vec3 Pf1 = Pf0 - vec3(1.0);
      vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
      vec4 iy = vec4(Pi0.yy, Pi1.yy);
      vec4 iz0 = Pi0.zzzz;
      vec4 iz1 = Pi1.zzzz;
      vec4 ixy = permute(permute(ix) + iy);
      vec4 ixy0 = permute(ixy + iz0);
      vec4 ixy1 = permute(ixy + iz1);
      vec4 gx0 = ixy0 / 7.0;
      vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
      gx0 = fract(gx0);
      vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
      vec4 sz0 = step(gz0, vec4(0.0));
      gx0 -= sz0 * (step(0.0, gx0) - 0.5);
      gy0 -= sz0 * (step(0.0, gy0) - 0.5);
      vec4 gx1 = ixy1 / 7.0;
      vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
      gx1 = fract(gx1);
      vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
      vec4 sz1 = step(gz1, vec4(0.0));
      gx1 -= sz1 * (step(0.0, gx1) - 0.5);
      gy1 -= sz1 * (step(0.0, gy1) - 0.5);
      vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
      vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
      vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
      vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
      vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
      vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
      vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
      vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
      vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
      g000 *= norm0.x;
      g010 *= norm0.y;
      g100 *= norm0.z;
      g110 *= norm0.w;
      vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
      g001 *= norm1.x;
      g011 *= norm1.y;
      g101 *= norm1.z;
      g111 *= norm1.w;
      float n000 = dot(g000, Pf0);
      float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
      float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
      float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
      float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
      float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
      float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
      float n111 = dot(g111, Pf1);
      vec3 fade_xyz = fade(Pf0);
      vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
      vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
      float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
      return 2.2 * n_xyz;
    }
    void main() {
      vec2 res2 = iResolution.xy * iDpr;
      vec2 pixel = vec2(gl_FragCoord.xy - 0.5 * res2) / res2.y;
      pixel.x -= xOffset * res2.x / res2.y;
      pixel.y -= yOffset;
      vec2 uv = gl_FragCoord.xy / res2;

      // PERLIN DISTORTION
      float noiseScale = 2.;
      float timeScale = 0.00003; // increase/reduce flame frequency
      uv += vec2( p3d(vec3(uv * noiseScale, iTime * timeScale)), p3d(vec3(1000. + uv * noiseScale , iTime * timeScale)) ) * 0.001;

      vec2 uvBig = (uv - 0.5) * 0.996 + 0.5;
      vec4 oldImage = texture2D(iBuffer, uv);
      vec3 mixedColor = oldImage.rgb - backgroundColor;
      float cropDist = 0.01;
      float cropXOffset = 0.2;
      float cropYOffset = 0.2;
      vec2 offset = uv + vec2((mixedColor.g - cropXOffset) * cropDist, (mixedColor.r - cropYOffset) * cropDist);
      float spinDist = 0.001;
      float spinSpeed = 0.2 + 0.15 * cos(iTime * 0.00003);
      float timeFrac = mod(iTime, 6.5);
      vec2 offset2 = uvBig + vec2(cos(timeFrac * spinSpeed) * spinDist, sin(timeFrac * spinSpeed) * spinDist);
      mixedColor = texture2D(iBuffer, offset).rgb * 0.4
        + texture2D(iBuffer, offset2).rgb * 0.6
        - backgroundColor;
      float fadeAmt = 0.010;
      mixedColor = (mixedColor - fadeAmt) * .995;
      float angle = atan(pixel.x, pixel.y);
      float dist = length(pixel) * 8. + sin(iTime) * .01;
      float flowerPeaks = .05 * amplitudeFactor * size;
      float flowerPetals = 7.;
      float edge = abs((dist + sin(angle * flowerPetals + iTime * 0.5) * sin(iTime * 1.5) * flowerPeaks) * 0.65 / size);
      float colorChangeSpeed = 0.75 + 0.05 * sin(iTime) * 1.5;
      float rainbowInput = timeFrac * colorChangeSpeed;
      vec4 rainbow = sqrt(j2hue(cos(rainbowInput))) + vec4(baseColor,0) - 1.0 + brightness;
      vec3 color = rainbow.rgb * smoothstep(1., .9, edge) * pow(edge, 20.);
      vec4 ring = vec4(
        backgroundColor + clamp( mixedColor + color, 0., 1.)
        , 1.0);
      gl_FragColor = ring;
    }
    `
