uniform float objectScale;

void main() {
    float thickness = 0.015 / objectScale;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vec4 worldNormal = modelMatrix * vec4(normal, 0.0);

    worldPos += worldNormal * thickness;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
}
